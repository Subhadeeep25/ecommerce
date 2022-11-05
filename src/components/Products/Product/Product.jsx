import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Product = ({ product ,onAddToCart}) => {
    const classes=useStyles();
    const handleAddToCart = () => onAddToCart(product.id, 1);

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        str=str.replace( /(<([^>]+)>)/ig, '');
        return str;
    }
    const cardStyle = {
        height:"30vw"
    }
  return (
    <Card className={classes.root} style={cardStyle}>
        <CardMedia className={classes.media} image={product.image.url} title={Product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography varient="h5" gutterBottom>
                    {product.name}
                </Typography> 
                <Typography varient="h5" >
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography varient="body2" color="textSecondary" noWrap="true">{removeTags(product.description)}</Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.CardActions}>
            <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
             <AddShoppingCart/>
            </IconButton>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
        </CardActions>
    </Card>
  )
  
}

export default Product