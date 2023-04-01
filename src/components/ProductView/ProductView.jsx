import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../.././lib/commerce";
import SingleProductView from "./SingleProductView";
import { CircularProgress } from "@material-ui/core";

const Productview = ({onAddToCart}) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await commerce.products.retrieve(id);
      setProduct(response);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      <div className="app">
        {isLoading ? (
          <div className="loading" align="center">
            <CircularProgress/>
          </div>
        ) : (
          <SingleProductView product={product} onAddToCart={onAddToCart}/>
        )}
      </div>
    </>
  );
};

export default Productview;
