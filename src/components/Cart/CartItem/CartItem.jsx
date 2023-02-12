import { Button, Typography , Card , CardActions , CardContent , CardMedia } from '@material-ui/core';
import React from 'react'

import useStyles from './Styles';
const cardStyle = {
    height:"28vw"
}
const CartItem = ({item,onUpdateCartQty,handleRemoveFromCart}) => {
    const classes=useStyles();
  return (
    <Card style={cardStyle}>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity+1)}>+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary" onClick={()=>handleRemoveFromCart(item.id)}><Typography varient="h5">Remove</Typography></Button>
        </CardActions>
    </Card>
  )
}

export default CartItem