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
import { makeStyles } from "@material-ui/core/styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const handleAddToCart = () => onAddToCart(product.id, 1);

  function trim(str) {
    if (str.length > 23) str = str.substr(0, 23) + "...";

    return str;
  }
  const cardStyle = {
    height: "22vw",
  };
  return (
    <Card className={classes.root} style={cardStyle}>
      <Link to={`product-view/${product.id}`}>
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={Product.name}
        />
      </Link>
      <CardContent>
        <Link to={`product-view/${product.id}`}>
          <div className={classes.cardContent}>
            <Typography varient="h5" gutterBottom>
              {trim(product.name)}
            </Typography>
            <Typography varient="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
        </Link>
        <div>
          <CardActions disableSpacing className={classes.CardActions}>
            <IconButton className={classes.fixedIconButton} onClick={handleAddToCart}>
              <AddShoppingCart/>
            </IconButton>
            <IconButton
              className={classes.fixedIconButton}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
