import { createContext, useState ,useEffect} from "react";
import { commerce } from "../.././lib/commerce";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(()=>{
    if (query === "") {
      commerce.products
        .list()
        .then((result) => {
          setResults(result.data);
        }).catch((error) => {
          console.log("There was an error fetching the products", error);
        });
      }else{
    commerce.products
      .list({ query: query })
      .then((result) => {
        if (result.data.length > 0) {
          setResults(result.data);
        }else {
          setResults([]);
        }
      })
      .catch((error) => {   
        console.log("There was an error fetching the products", error);
      });
    }
    },[query]);
  

  return (
    <SearchContext.Provider value={{ query, setQuery, results }}>
      {children}
    </SearchContext.Provider>
  );
}
