import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import "./product.css";
const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const handleAddToCart = () => onAddToCart(product.id, 1);

  function trim(str) {
    if (str.length > 20) str = str.substr(0, 20) + "...";
    return str;
  }

  return (
    <Card className="{classes.root} root">
      <Link to={`product-view/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={Product.name}
        />
      </Link>
      <CardContent>
        <Link to={`product-view/${product.id}`}>
          <Typography gutterBottom>
            <div className={classes.cardContent}>
              <h4 className="h4 link">{trim(product.name)}</h4>
              <h5 className="h5 link" align="right">
                {product.price.formatted_with_symbol}
              </h5>
            </div>
          </Typography>
        </Link>

        <CardActions disableSpacing className="{classes.CardActions} buttons">
          <IconButton
            className="{classes.fixedIconButton} btn"
            onClick={handleAddToCart}
          >
            <AddShoppingCart />
          </IconButton>
          <IconButton
            className="{classes.fixedIconButton} btn"
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Product;
