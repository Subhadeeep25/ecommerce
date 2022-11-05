import React, {useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products,Navbar,Cart,Checkout} from './components'
import {BrowserRouter as Router, Routes, Route,Switch} from 'react-router-dom';

const App = () => {
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState({});
  
  const fetchProducts=async()=>{
    const {data}= await commerce.products.list();
    setProducts(data);
  }

  const fetchCart= async()=>{
    setCart(await commerce.cart.retrieve());
  }
  
  const handleAddToCart=async(productId,quantity)=>{
    const item=await commerce.cart.add(productId,quantity);
      setCart(item.cart);
  }
  const handleUpdateCartQty=async (productId,quantity)=>{
    const {cart}=await commerce.cart.update(productId,{quantity});
    setCart(cart)
  }

  const handleRemoveFromCart=async (productId)=>{
    const response=await commerce.cart.remove(productId);
    setCart(response.cart)
  }
  const HandleEmptyCart=async()=>{
    const response=await commerce.cart.empty();
    setCart(response);
  }

  useEffect(()=>{
      fetchProducts();
      fetchCart();
  },[]);

  return (
    <Router>
    <Navbar totalItems={cart.total_items}/>
    <Routes>
    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
    <Route path="/cart" element={<Cart cart={ cart } handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}
HandleEmptyCart={HandleEmptyCart}/>}/>
    <Route exact path="/checkout" element={<Checkout/>}/> 
    </Routes>   
   </Router>
   
  );
}

export default App