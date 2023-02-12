import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { CallMissedSharp, ShoppingCart} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import logo from '../../assets/commerce.png'
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = ({totalItems}) => {
  const classes=useStyles();
  const { user , loginWithRedirect ,isAuthenticated} = useAuth0();
  const { logout } = useAuth0();
  return (
    <>
    <AppBar position="fixed" className={CallMissedSharp.appBar} color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title} color="inherit">
          <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
          <Link to="/" className={classes.Link}>E-Mart</Link>
        </Typography>
        <div className={classes.grow}/>
        <div className={classes.button}>
          <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
        </div>
        {isAuthenticated && (
        <div>
          <Typography varient="h6" className={classes.title}>
          {user.name}
          </Typography>
        </div>)}
          {
            isAuthenticated ? (
              <div>
              <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Log Out</Button>
              </div>):(
              <div className={classes.button}>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
              </div>
            )
          }         
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar