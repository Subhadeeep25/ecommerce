import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Container,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import "./styles.css";

const SingleProductView = ({ product ,onAddToCart}) => {
  const classes = useStyles();
  const handleAddToCart = () => onAddToCart(product.id, 1);
  const imageUrl = product.image;
  function removeTags(str) {
    if (str === null || str === undefined) return "";
    else str = str.toString();
    str = str.replace(/(<([^>]+)>)/gi, "");
    return str;
  }
  return (
    <div className="app">
      <div className="details" key={product.id}>
        <div className="big-img">
          {imageUrl ? (
            <img src={imageUrl.url} alt={product.name} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="box">
          <div className="row">
              <h2>{product.name}</h2>
            </div>
            <div className="row">
             <Typography varient='h6'> <span>{product.price.formatted_with_symbol}</span></Typography>
            </div>
          <Typography variant="body2">
            <p>{removeTags(product.description)}</p>
          </Typography>
          <p>{product.details}</p>
          <button className="cart" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
