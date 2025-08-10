import axios from 'axios'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import React, { useContext } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { cartContext } from '../Context/CartContext';


export default function ProductDetails() {
 
  const {addProductToCart, successMessage , errorMessage} =  useContext(cartContext)

  const {id} = useParams();

  function getSpecificProductDetails(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
 
  async function handleAddProductToCart(id){

   const responseFlag = await addProductToCart(id);

   if(responseFlag === true){
    toast.success("Added to cart successfully!",
      {
        duration: 3000,
        position: 'top-right',
        className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
        icon: '🛒'
      }
    )
   }

   if(responseFlag === false){
      toast.error("Please Login before adding to cart", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-red-100 text-red-800 font-semibold px-4 py-2 rounded shadow-md border-l-4 border-red-500'
      })  
   }
   }
    


  const { data , isError, isLoading, error} = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getSpecificProductDetails
  })
 
 
 if (isError) {
   return (
     <div className="flex justify-center items-center bg-red-500 h-screen">
       <h2 className="text-white text-3xl">
         Error: {error?.message || "Something went wrong"}
       </h2>
     </div>
   );
 }
 
   if (isLoading) {
    return <LoadingSpinner />
   }

   const productDetails = data.data.data;

     const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,

  };
 
    return (
    <>

    <div className='container mx-auto p-5 py-12 md:flex md:items-center md:justify-between'>

        <div className='md:w-1/4'>
    
    <Slider {...settings}>
        {productDetails.images.map((img, idx) =>{
            return (
        <div key={idx} className='shadow-md p-2 shadow-gray-200 rounded-3xl hover:bg-emerald-100'>
        <img src={img} alt={productDetails.title} className="w-full rounded-3xl " />
        </div>
            )           
        })}
  
    </Slider>

        </div>




        <div className="md:w-[70%] mt-12 md:mt-0">

        <h1 className='text-emerald-700 font-bold text-2xl mb-4 text-center border-b-1 pb-2'>{productDetails.title}</h1>
        <p className='text-gray-400 mb-3'>{productDetails.description}</p>

        <h5 className='bg-gray-100 p-2 text-center mb-2 rounded-full text-gray-600'>Category: {productDetails.category.name}</h5>
        <h5 className='bg-gray-100 p-2 text-center mb-2 rounded-full text-gray-600'>Brand: {productDetails.brand.name}</h5>
        <h5 className='bg-gray-100 p-2 text-center mb-4 rounded-full text-gray-600'>Available Quantity: {productDetails.quantity}</h5>

        {productDetails.priceAfterDiscount ? 
        <div className='flex justify-between items-center'>

        <div>
        <h5 className='text-md  mb-4 line-through text-red-500'>Price: {productDetails.price}EGP</h5>
        <h5 className='text-lg font-semibold mb-4 text-white bg-red-500 rounded-lg p-2'>Sale: {productDetails.priceAfterDiscount}EGP</h5> 
        </div>

        <div>
         <h5 className='text-lg font-semibold me-2'><i className='fa-solid fa-star  text-yellow-400'></i>{productDetails.ratingsAverage}</h5>   
        </div>

        </div>
        :
        <div className='flex justify-between items-center'>

        <div>
        <h5 className='text-lg font-semibold mb-4'><span className=' text-emerald-600'>Price:</span> {productDetails.price}EGP</h5>
        </div>

        <div>
         <h5 className='text-lg font-semibold me-2 '><i className='fa-solid fa-star pe-1 text-yellow-400 mb-4'></i>{productDetails.ratingsAverage}</h5>   
        </div>

        </div>}


        <button onClick={() => handleAddProductToCart(productDetails._id)} className='bg-emerald-500 text-white hover:bg-emerald-600 p-4 rounded-xl w-full'>Add Product To Cart</button>
        </div>

    </div>


    </>
  )
}
