import React, {useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products,Navbar,Cart,Checkout} from './components'
import {BrowserRouter as Router, Routes, Route,Switch} from 'react-router-dom';
import Productview from './components/ProductView/ProductView'
const App = () => {
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState({total_items:''});
  const[order,setOrder]=useState({});
  const[errorMessage,setErrorMessage]=useState('');
  const [updatedCart, setUpdatedCart] = useState({});
  
  useEffect(() => {
    setCart(updatedCart);
  }, [updatedCart]);

  const fetchProducts=async()=>{
    const {data}= await commerce.products.list();
    setProducts(data);
  }

  const fetchCart= async()=>{
    setCart(await commerce.cart.retrieve());
  }
  
  const handleAddToCart=async(productId,quantity)=>{
    const item=await commerce.cart.add(productId,quantity);
    setUpdatedCart({
      ...cart,
      total_items: cart.total_items + 1,
    });
      setCart(item.cart);
  }
  const handleUpdateCartQty=async (productId,quantity)=>{
    const {cart}=await commerce.cart.update(productId,quantity);
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

  const refreshCart=async()=>{
    const newCart=await commerce.cart.refresh();
    setCart(newCart);
  }
  const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>{
    try{
      const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder);
      setOrder(incomingOrder);
      refreshCart();
    }
    catch(error){
      setErrorMessage(error.data.error.message);
    }
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
    <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}/> 
    <Route exact path="/product-view/:id" element={<Productview onAddToCart={handleAddToCart}/>}/>
    </Routes>   
   </Router>
   
  );
}

export default App