import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import React,{useState,useEffect} from "react";
import useStyles from "./Styles";
import "./cartitem.css";
import {commerce} from '../../../lib/commerce';

const CartItem = ({ item, onUpdateCartQty }) => {
  const classes = useStyles();
  const [cart,setCart]=useState({total_items:''});
  const [updatedCart, setUpdatedCart] = useState({total_items:''});

  const handleRemoveFromCart=async (productId)=>{
    const response=await commerce.cart.remove(productId);
    setCart(response.cart);
    window.location.reload();
  }
  useEffect(() => {
    setCart(updatedCart);
  }, [updatedCart]);
  
  function trim(str) {
    if (str.length > 25) str = str.substr(0, 25) + "...";
    return str;
  }
  
  return (
    <div className="root">
    <Card className={`${classes.root}`}>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <h4 className="h4">{trim(item.name)}</h4>
        <h4 className="h4" align="right">
          {item.line_total.formatted_with_symbol}
        </h4>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <Typography varient="h5">Remove</Typography>
        </Button>
      </CardActions>
    </Card>
    </div>
  );
  
};

export default CartItem;
