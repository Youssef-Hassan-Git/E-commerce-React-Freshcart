import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export const cartContext = createContext();

export default function CartContextProvider({children}) {

  
    const [numOfCartItems, setNumOfCartItems] = useState(null);
    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(null);
    const [cartOwner, setCartOwner] = useState(null)
    const {token } = useContext(AuthContext)

   
  async function addProductToCart(productId) {
  return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
    {
      "productId": productId
    }, 
    {
      headers: {
        'token': localStorage.getItem("tkn")
      }
    }
  )
  .then((successResponse) => {
      setNumOfCartItems(successResponse.data.numOfCartItems);
      setTotalCartPrice(successResponse.data.data.totalCartPrice);
      setCartProducts(successResponse.data.data.products);
      const res = getCartItems();

      
      return true;
  })
  .catch((err) => {

      
     
      return false;
  });
}

  async function getCartItems() {
  //  if(!token) return
   return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        'token': localStorage.getItem("tkn")
      }
    })
    .then((res)=> {
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartProducts(res.data.data.products);

      
      setCartOwner(res.data.data.cartOwner);

      

      setCartId(res.data.data._id)
  
      return {flag: true, message: res.data.status};
    })
    .catch((err) => {
      return {flag: false, message: err?.response?.data?.message};
    })
  }

  async function updateCount(id, newCount){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
    "count": newCount
     },
     {      headers: {
        'token': localStorage.getItem("tkn")
      }}
    )
    .then((res) => {
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartProducts(res.data.data.products);
      setCartId(res.data.data._id)
 
      return {flag: true, message: res}     
    })
    .catch((err)=>{
      console.log("err:", err.response?.data?.message);
      return {flag: false , message: err?.response?.data?.message}
    })
  }

  async function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: {
        'token': localStorage.getItem("tkn")
      }
    } )
    .then((res)=>{
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartProducts(res.data.data.products); 
      setCartId(res.data.data._id)

     return {flag: true, message: res}     
    })
    .catch((err)=>{
      console.log("err:", err.response?.data?.message);
      return {flag: false , message: err?.response?.data?.message}
    })
  }

  async function clearCart(){
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        'token': localStorage.getItem("tkn")
      }
    })
    .then((res)=>{
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProducts(null); 

     return {flag: true, message: res}     
    })
    .catch((err)=>{
      console.log("err:", err.response?.data?.message);
      return {flag: false , message: err?.response?.data?.message}
    })    
    
  }

  useEffect(() => {
    if(token) {const res = getCartItems();}

  }, [token])
  

    return (
    <cartContext.Provider value={ {addProductToCart, numOfCartItems, cartProducts, totalCartPrice, getCartItems, updateCount, removeCartItem, clearCart, cartId, cartOwner} }>
     {children} 
    </cartContext.Provider>
  )
}
