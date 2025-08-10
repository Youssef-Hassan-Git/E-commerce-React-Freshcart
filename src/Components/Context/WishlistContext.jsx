import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export const wishListContext = createContext();

export default function WishlistContextProvider({children}) {

    const [wishlistProducts, setWishlistProducts] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0);
    const {token } = useContext(AuthContext)

   async function addToWishlist(productId) {
    
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
    "productId": productId
    },{
        headers: {
           token: localStorage.getItem("tkn") 
        }
    })
    .then((res)=>{

        getWishlist();
        return {flag: true, message: res.data.message}
    })
    .catch((err) =>{
        return {flag: false, message: err?.response?.data?.message}
    })

   }


   async function getWishlist() {
    // if(!token) return;
     axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers: {
            token: localStorage.getItem("tkn")
        }
    })
    .then((res) =>{
        setWishlistProducts(res.data.data)
        setWishlistCount(res.data.count);
        
    })
    .catch((err)=>{
        console.log("err", err);   
    })

   }

   async function deleteItemFromWishlist(productId) {

     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:{
            "token": localStorage.getItem("tkn")
        }
    })
    .then((res) => {
        getWishlist();
        return {flag: true, message: res.data.message}
    })
    .catch((err)=>{
        return {flag:false, message: err?.response?.data.message}
    })
   }

   useEffect(() => {
    if (token) getWishlist();

   }, [])
   



  return (
    <wishListContext.Provider value={{addToWishlist, getWishlist , wishlistProducts, wishlistCount, deleteItemFromWishlist}}>
      {children}
    </wishListContext.Provider>
  )
}
