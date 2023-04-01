import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import "./styles.css";

const SingleProductView = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const handleAddToCart = () => onAddToCart(product.id, 1);
  const imageUrl1 = product.assets[0];
  const imageUrl2 = product.assets[1];
  const imageUrl3 = product.assets[2];
  const imageUrl4 = product.assets[3];
  const [previewPic, setPreviewpic] = useState(imageUrl1);

  function removeTags(str) {
    if (str === null || str === undefined) return "";
    else str = str.toString();
    str = str.replace(/(<([^>]+)>)/gi, "");
    return str;
  }
  return (
    <div className="app">
      <div className="details" key={product.id}>
        <div className="row">
          <div className="col-md-2 mini-preview">
            {imageUrl1 ? (
              <img
                class="img-fluid"
                src={imageUrl1.url}
                alt={product.name}
                onClick={() => setPreviewpic(imageUrl1)}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="col-md-2 mini-preview">
            {imageUrl2 ? (
              <img
                class="img-fluid"
                src={imageUrl2.url}
                alt={product.name}
                onClick={() => setPreviewpic(imageUrl2)}
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className="col-md-2 mini-preview">
            {imageUrl3 ? (
              <img
                class="img-fluid"
                src={imageUrl3.url}
                alt={product.name}
                onClick={() => setPreviewpic(imageUrl3)}
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className="col-md-2 mini-preview">
            {imageUrl3 ? (
              <img
                class="img-fluid"
                src={imageUrl4.url}
                alt={product.name}
                onClick={() => setPreviewpic(imageUrl4)}
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="big-img">
            {imageUrl1 ? (
              <img class="img-fluid" src={previewPic.url} alt={product.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="box">
          <div className="row">
            <Typography varient="h2">
              <h2>{product.name}</h2>
            </Typography>
          </div>
          <div className="row">
            <Typography varient="h6">
              <h3>
                <p>
                  Price:
                  <span> {product.price.formatted_with_symbol}</span>
                </p>
              </h3>
              <button className="cart" onClick={handleAddToCart}>
                Add to cart
              </button>
            </Typography>
          </div>
          <div className="description">
            <p>{removeTags(product.description)}</p>
            <p>{product.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
