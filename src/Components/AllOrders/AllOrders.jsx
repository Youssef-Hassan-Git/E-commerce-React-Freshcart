import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/CartContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function AllOrders() {

    const {cartOwner} = useContext(cartContext);

    const [orderProducts, setOrderProducts] = useState(null)

    const [selectedOrder, setSelectedOrder] = useState(null)
 
   async function getUserOrders(){
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`,
        {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }
    )
}

// useEffect(()=>{
//     if(cartOwner){
//         getUserOrders();
        
//     }
// }, [cartOwner])


 const {data, isError, isLoading, error} = useQuery({
    queryKey: ['allorders'],
    queryFn: getUserOrders,
    enabled: !!cartOwner
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

const order = data?.data


function cartDetails(id) {

    const selected = order.find(o => o.id === id);
    setSelectedOrder(selected);
 

}


    // {
    //     "shippingAddress": {
    //         "details": "details",
    //         "phone": "01282388380",
    //         "city": "Cairo"
    //     },
    //     "taxPrice": 0,
    //     "shippingPrice": 0,
    //     "totalOrderPrice": 149,
    //     "paymentMethodType": "card",
    //     "isPaid": true,
    //     "isDelivered": false,
    //     "_id": "6887a5cefdecb16afa3a2b24",
    //     "user": {
    //         "_id": "687715bb84e8428aab595e3a",
    //         "name": "test",
    //         "email": "test55555555555555555@gmail.com",
    //         "phone": "01282388380"
    //     },
    //     "cartItems": [
    //         {
    //             "count": 1,
    //             "_id": "6887a0c3fdecb16afa3a1c5e",
    //             "product": {
    //                 "subcategory": [
    //                     {
    //                         "_id": "6407f1bcb575d3b90bf95797",
    //                         "name": "Women's Clothing",
    //                         "slug": "women's-clothing",
    //                         "category": "6439d58a0049ad0b52b9003f"
    //                     }
    //                 ],
    //                 "ratingsQuantity": 18,
    //                 "_id": "6428eb43dc1175abc65ca0b3",
    //                 "title": "Woman Shawl",
    //                 "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg",
    //                 "category": {
    //                     "_id": "6439d58a0049ad0b52b9003f",
    //                     "name": "Women's Fashion",
    //                     "slug": "women's-fashion",
    //                     "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg"
    //                 },
    //                 "brand": {
    //                     "_id": "64089bbe24b25627a253158b",
    //                     "name": "DeFacto",
    //                     "slug": "defacto",
    //                     "image": "https://ecommerce.routemisr.com/Route-Academy-brands/1678285758109.png"
    //                 },
    //                 "ratingsAverage": 4.8,
    //                 "id": "6428eb43dc1175abc65ca0b3"
    //             },
    //             "price": 149
    //         }
    //     ],
    //     "paidAt": "2025-07-28T16:31:10.949Z",
    //     "createdAt": "2025-07-28T16:31:10.952Z",
    //     "updatedAt": "2025-07-28T16:31:10.952Z",
    //     "id": 59417,
    //     "__v": 0
    // }



  return (
    <>

    <div className='container mx-auto py-10'>
     
     <div className='max-w-[50%] mx-auto text-center shadow-stone-200 shadow-lg p-3 py-5'>
    <i className='fa-solid fa-receipt text-5xl text-cyan-500 shadow-2xl shadow-gray-200 mb-5'></i>
     <h2 className='text-3xl font-extrabold text-emerald-600 '>My Orders</h2>    
    </div> 

    {/* whole order */}
    {
    order?.map((order)=>{
    return(
    <div key={order.id} className='mt-7 max-w-[80%]  mx-auto shadow-xl shadow-stone-200 p-3 '>
    <div className='md:flex  justify-between items-center p-6'>
    
    <div className='mt-3 md:m-0'>
    <h3 className='font-bold text-xl mb-4' ><span className='text-emerald-600'>Order ID:</span> {order.id} </h3>
    <h3 className='font-bold text-xl'><span className='text-emerald-600 '>Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</h3>
    </div>

    <div className='mt-3 md:m-0'>
        <p className='font-bold text-xl mb-4'><span className='text-emerald-600'>Delivery Status:</span> {order.isDelivered == true? <> Order has been delivered. <i className='fa-solid fa-bus text-yellow-300'></i> </> : <> Order has not delivered yet. <i className='fa-solid fa-bus text-green-400'></i> </>} </p>
        <p className='font-bold text-xl '><span className='text-emerald-600'>Delivery Address:</span> {order.shippingAddress.city}</p>
    </div>

    {selectedOrder?.id !== order?.id ?

    <div className='mt-3 mb-5 md:m-0'>
     <button onClick={() => cartDetails(order.id)} className='bg-emerald-500 px-5 py-3 hover:bg-emerald-600 rounded-lg text-white shadow-emerald-300 shadow-md'>Order Details</button>
    </div> :
    <div className='mt-3 mb-5 md:m-0'>
     <button onClick={() => cartDetails(null)} className='bg-emerald-500 px-5 py-3 hover:bg-emerald-600 rounded-lg text-white shadow-emerald-300 shadow-md'>Hide Details</button>
    </div> }
    </div>
    <hr className='text-emerald-300 w-full mt-2'/>
    
    {
        selectedOrder?.id == order?.id ?

//    products in the cart

   order.cartItems.map((item)=>{
    return(
<div className='md:flex justify-between items-center p-10'>
    <img src={item.product.imageCover} className='md:w-[12%]' alt={item.product.title} />
    
    <div>
    <h3 className='text-emerald-500 text-lg mb-3 font-bold'>{item.product.title.split(" ").splice(0, 3).join(" ")}</h3>
          <p className='mb-3'>
            <span className="text-blue-600 font-medium">Category: </span>
            <span className="text-gray-700">{item.product.category.name}</span>
          </p>
          <p>
            <span className="text-purple-600 font-medium">Brand: </span>
            <span className="text-gray-700">{item.product.brand.name}</span>
          </p>
    <p className='mt-3'>Average Ratings: {item.product.ratingsAverage} <i className='fa-solid fa-star text-yellow-400'></i></p>
    </div>


    <div>
      <p className='mb-3'>Price: <span className='text-red-500'>{item.price} EGP</span>  </p>  
      <p>Count: <span className='text-emerald-500'>{item.count}</span></p>
    
    </div>

    </div>
    )
   })


    : ""
    }

    </div>
    )
    })
    }

    </div>
    </>
  )
}
