import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { CallMissedSharp, ShoppingCart } from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import logo from '../../assets/commerce.png'
import useStyles from './styles';
import {Link} from 'react-router-dom';


const Navbar = ({totalItems}) => {
  const classes=useStyles();
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
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar