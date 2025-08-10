import React, { useContext } from 'react'
import { wishListContext } from '../Context/WishlistContext'
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function Wishlist() {

   const {wishlistProducts, deleteItemFromWishlist, wishlistCount} = useContext(wishListContext)
   const{addProductToCart} = useContext(cartContext)
   
     async function handleAddToCartProduct(id) {
    const responseFlag =  await addProductToCart(id);
    if(responseFlag === true){
      toast.success("Added to cart successfully!", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
        icon: '🛒'
      });
   }

   if(responseFlag === false){
      toast.error("Please Login before adding to cart", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-red-100 text-red-800 font-semibold px-4 py-2 rounded shadow-md border-l-4 border-red-500'
      })  
   }
  }

  async function handleDeleteItemFromWishlist(id){
    const {flag, message} = await deleteItemFromWishlist(id);
  if(flag === true){
      toast.success(message+"!", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
      });
   }

   if(flag === false){
      toast.error(message, {
        duration: 3000,
        position: 'top-right',
        className: 'bg-red-100 text-red-800 font-semibold px-4 py-2 rounded shadow-md border-l-4 border-red-500'
      })  
   }    
  }
   

  return (
    <>


{wishlistCount === null ? 
<LoadingSpinner />
:
wishlistCount === 0 ?

  <div className='text-center p-15 '>
    <p className='text-3xl font-semibold '><i className='fa-solid fa-heart text-8xl text-red-500  text-shadow-red-500 me-3'></i> My Wishlist is Empty </p>
  </div> 

:


<>
<div className='w-full mx-auto text-center'>
<i className="fa-regular fa-heart text-black text-7xl p-4 rounded-full  mt-10  shadow-gray-300  shadow-xl hover:text-white hover:bg-red-500 transition-all duration-200"></i>
    <p className='text-5xl p-2'>My Wishlist</p>
</div>
<div className="container mx-auto py-15">
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          Product Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          <p>Price <i cl="fa-solid fa-dollar-sign text-emerald-400 text-md"></i></p>
        </th>
        <th scope="col" className="px-6 py-3">
          <p>Ratings <i className="fa-solid fa-ranking-star text-yellow-400 text-md"></i></p>
        </th>    
        <th scope="col" className="px-6 py-3">
          Actions <i className='fa-solid fa-pen text-blue-400 '></i>
        </th>
      </tr>
    </thead>
    <tbody>
      {wishlistProducts?.map((product)=>{
        return (
    <tr key={product._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
        <td className="p-4 flex items-center ">
           <i onClick={() => handleDeleteItemFromWishlist(product._id)} className='fa-solid fa-trash text-2xl cursor-pointer text-emerald-500 hover:text-emerald-600 pe-3'></i>
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full hover:bg-emerald-500 p-2  rounded-xl  transition-all  duration-200 hover:shadow-lg hover:shadow-emerald-300" alt={product.title} />
        </td>
        <td className='p-4'>
          <p className="mb-3 text-emerald-500 hover:text-emerald-600 font-bold text-lg">
            {product.title.split(" ").splice(0, 4).join(" ")}
          </p>
          <p className='mb-3'>
            <span className="text-blue-600 font-medium">Category: </span>
            <span className="text-gray-700">{product.category.name}</span>
          </p>
          <p>
            <span className="text-purple-600 font-medium">Brand: </span>
            <span className="text-gray-700">{product.brand.name}</span>
          </p>
        </td>

        <td className="px-6 py-4 font-semibold ">
          {product.priceAfterDiscount?
          <>
          <p className='text-red-500 line-through text-xs'> {product.price} EGP</p>
          <p className='text-emerald-500 '> {product.priceAfterDiscount} <span className='text-black'>EGP</span></p>
          </>
          :
     <p className='text-emerald-500 '> {product.price} <span className='text-black'>EGP</span></p>
 
          } 
        </td>
        <td className="px-6 py-4 font-semibold ">
        <p className='font-bold  '> <i className='fa-solid fa-star text-yellow-400 me-1  '></i> {product.ratingsAverage}</p>
        </td>
        <td className="px-6 py-4">
          <button onClick={() => handleAddToCartProduct(product._id)} className="font-medium  bg-emerald-500 px-5 py-3 rounded-xl hover:bg-emerald-600 text-white  shadow-md shadow-emerald-300 transition-all ">Add To Cart</button>
        </td>
      </tr>
        )
      })}

    </tbody>
  </table>


</div>
</div>

</>



}


    </>
  )
}
