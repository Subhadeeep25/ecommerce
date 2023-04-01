import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { SearchContext } from "../Navbar/SearchContext";
import './Products.css'
const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const { results } = useContext(SearchContext);
  return (
    <div className="content">
       <Grid container spacing={2}>
        {results.map((product) => (
          <Grid item key={product.id} xs={12} sm={4} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
       </Grid>
       </div>
  );
};
export default Products;
