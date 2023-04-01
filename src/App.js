import React, {useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products,Navbar,Cart,Checkout} from './components'
import {BrowserRouter as Router, Routes, Route,Switch} from 'react-router-dom';
import Productview from './components/ProductView/ProductView'
import { SearchProvider } from "./components/Navbar/SearchContext";
const App = () => {
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState({total_items:''});
  const[order,setOrder]=useState({});
  const[errorMessage,setErrorMessage]=useState('');
  const [updatedCart, setUpdatedCart] = useState({total_items:''});
  
  
  useEffect(() => {
    setCart(updatedCart);
  }, [updatedCart]);

  const fetchProducts=async()=>{
    const {data}= await commerce.products.list();
    setProducts(data);
  }
  
  const handleAddToCart=async(productId,quantity)=>{
    const item=await commerce.cart.add(productId,quantity);
    setUpdatedCart({
      ...cart,
      total_items: cart?.total_items + 1,
    });
      setCart(item.cart); 
  }
  const handleUpdateCartQty=async (productId,quantity)=>{
    const {cart}=await commerce.cart.update(productId,quantity);
    setCart(cart);
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
      console.log(error.response.data); // Log the response data
      console.log(error.response.status);
      setErrorMessage(error.data.error.message);
    }
  }
  useEffect(()=>{
      fetchProducts();
      async function fetchCart() {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      }
      fetchCart();
  },[]);
  useEffect(() => {
    const fetchCart = async () => {
      const { cart } = await commerce.cart.retrieve();
      handleAddToCart(cart);
    };
    fetchCart();
  }, [handleAddToCart]);

  return (
    <SearchProvider>
    <Router>
    <Navbar totalItems={cart?.total_items ?? 0}/>
    <Routes>
    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
    <Route path="/cart" element={<Cart cart={ cart } handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}
HandleEmptyCart={HandleEmptyCart} />}/>
    <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}/> 
    <Route exact path="/product-view/:id" element={<Productview onAddToCart={handleAddToCart}/>}/>
    </Routes>   
   </Router>
   </SearchProvider>
  );
}

export default App