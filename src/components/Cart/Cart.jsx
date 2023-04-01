import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid,CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import './Cart.css';
const Cart = ({ handleUpdateCartQty, HandleEmptyCart }) => {
  const classes = useStyles();
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsCartUpdated(true);
  }, [cart]);

  useEffect(() => {
    if (isCartUpdated) {
      setIsLoading(true);
      commerce.cart.retrieve().then((cart) => {
        setCart(cart);
        setIsCartUpdated(false);
        setIsLoading(false);
      });
    }
  }, [isCartUpdated]);
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You Have no items in your shopping cart,
      <Link className={classes.link} to="/">
        start adding some
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
        <>
        
    <main className={classes.content}>
          <Grid container="center" spacing={2}>
            {cart.line_items.map((item) => (
              <Link to={`../product-view/${item.product_id}`}>
              <Grid item xs={12} sm={4} md={4} lg={4} key={item.id}>
                <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} />
              </Grid>
              </Link>
            ))}
          </Grid>
          <div className={`${classes.cardDetails}`} >
            <Typography variant="h4">
              {" "}
              Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
              <Button
                className={classes.emptyButton}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={HandleEmptyCart}
              >
                Empty Cart
              </Button>
              <Button
                component={Link}
                to="/checkout"
                className={classes.checkoutButton}
                size="large"
                type="button"
                variant="contained"
                color="primary"
              >
                Checkout
              </Button>
            </div>
          </div>
          </main>
    </>
  );
  if (!cart?.line_items) return "Loading...";
  return (
    <>
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </Container>
    </>
  );
};

export default Cart;
