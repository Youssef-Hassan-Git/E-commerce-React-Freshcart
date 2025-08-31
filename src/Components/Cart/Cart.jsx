import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function Cart() {

  const {cartProducts, numOfCartItems, totalCartPrice, updateCount, removeCartItem, clearCart} = useContext(cartContext);

  async function handleCount(id, productId){
   const {flag, message} = await updateCount(id, productId);

    if(flag=== true){
          toast.success("Quantity Increased!",
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )
    }
    if(flag === false){
           toast.error(message,
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )     
    }

  }

  async function handleRemoveCartItem(productId){
    const {flag, message} = await removeCartItem(productId);
  if(flag=== true){
          toast.success("Item Removed!",
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )
    }
    if(flag === false){
           toast.error(message,
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )     
    }
  }

  async function handleClearCart() {
    const {flag, message} = await clearCart();
    if(flag=== true){
          toast.success("Cart Cleared Successfully",
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )
    }
    if(flag === false){
           toast.error(message,
            {
              duration: 3000,
              position: 'top-right',
              className:'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
              icon: <i className="fa-solid fa-suitcase text-purple-400"></i>,
            }
          )     
    }    
  }



  return (
    <>


      <div className="container mx-auto py-10">
<div className="bg-gray-50 my-5 py-5 px-6 rounded-xl shadow-sm border border-gray-200">
  <p className="text-3xl font-extrabold text-emerald-600 mb-2">My Shopping Cart</p>
{numOfCartItems ===null?

<LoadingSpinner />
:
numOfCartItems !==0?
 
 <>
  <div className="mt-4 space-y-2 text-gray-700 text-lg">
    <p>
      🛒 <span className="font-medium">Items in Cart:</span> {numOfCartItems}
    </p>
    <p>
      💰 <span className="font-medium">Total Cost:</span> <span className='text-emerald-500 me-1'>£</span>{totalCartPrice}
    </p>
  </div>
  <div className="mt-6">
    <Link to={"/paymentaddress"}>
    <button  className="inline-flex items-center px-5 py-3  bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg   shadow-md shadow-emerald-300 transition-all duration-300 me-3" >
      <i className="fa-solid fa-money-bill me-2 "></i> Purchase Products
    </button>    
    </Link>
    <button  onClick={() => handleClearCart()} className="inline-flex items-center px-5 py-3  bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg   shadow-md shadow-red-300 transition-all duration-300" >
      <i className="fa-solid fa-trash me-2"></i> Clear Cart
    </button>
  </div>
 </>
 :
  ""

}


</div>


{
numOfCartItems ===null ?

<LoadingSpinner />
:
numOfCartItems ===0 ?

  <div className='text-center p-15 '>
    <p className='text-3xl font-semibold '><i className='fa-solid fa-cart-shopping text-8xl text-blue-500  text-shadow-blue-500 me-3'></i> My Shopping Cart is Empty </p>
  </div>
:

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-t-2 border-b-2 border-gray-700 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="">Product Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          <p>Quantity <i className="fa-solid fa-suitcase text-purple-400"></i></p>
        </th>
        <th scope="col" className="px-6 py-3">
          <p>Price <i className="fa-solid fa-dollar-sign text-emerald-400 text-md"></i></p>
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
      
    {cartProducts?.map((product) => {
      return(
        <tr key={product._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50">
        <td className="p-6">
          <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full hover:bg-emerald-500 p-2  rounded-xl  transition-all  duration-200 hover:shadow-lg hover:shadow-emerald-300" alt={product?.product?.title} />
        </td>
        <td className='p-4'>
          <p className="mb-3 text-emerald-500 hover:text-emerald-600 font-bold text-lg">
            {product?.product?.title?.split(" ").splice(0, 4).join(" ")}
          </p>
          <p className='mb-3'>
            <span className="text-blue-600 font-medium">Category: </span>
            <span className="text-gray-700">{product?.product?.category?.name}</span>
          </p>
          <p>
            <span className="text-purple-600 font-medium">Brand: </span>
            <span className="text-gray-700">{product?.product?.brand?.name}</span>
          </p>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">

            <button disabled={product.count == 1}  onClick={() => handleCount(product.product._id, product.count - 1 )} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>

            <div>
              <input value={product.count} onChange={(e) => {
                const oldValue = product.count;
                const newValue = e.target.value;
                if(oldValue > newValue){
                   handleCount(product.product._id, product.count - 1)
                }
                else{
                  handleCount(product.product._id, product.count + 1)
                }
              }} type="number" id="count" className="bg-gray-50 w-14 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1  " placeholder={product.count } required />
            </div>
            
            <button onClick={() => handleCount(product.product._id, product.count + 1 )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        
        </td>
        <td className="px-6 py-4 font-semibold text-emerald-500">
          {product.priceAfterDiscount?
          <>
          <p className='text-red-500 line-through text-sm'> {product.price} EGP</p>
          <p className='text-emerald-500 '> {product.priceAfterDiscount} <span className='text-black'>EGP</span></p>
          </>
          :
          <p className='text-emerald-500 '> {product.price} <span className='text-black'>EGP</span></p>
 
          }         
       </td>
        <td className="px-6 py-4 font-semibold ">
        <p className='font-bold  '> <i className='fa-solid fa-star text-yellow-400 me-1  '></i> {product.product.ratingsAverage}</p>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={() => handleRemoveCartItem(product.product._id)} className="font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md shadow-red-300 rounded-md p-1.5 pe-3 ps-3 hover:text-white"><i className='fa-solid fa-trash text-white'></i> Remove Product</a>
        </td>
      </tr>
      )
    })}

    </tbody>
  </table>

</div>


}  


      </div>



    </>
  )
}
