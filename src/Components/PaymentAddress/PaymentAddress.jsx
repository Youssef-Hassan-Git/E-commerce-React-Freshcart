import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from 'yup'
import { cartContext } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'

export default function PaymentAddress() {

    const {cartId, getCartItems} = useContext(cartContext);
    const [isSubmittedOnline, setIsSubmittedOnline] = useState(false);
    const [isSubmittedOffline, setIsSubmittedOffline] = useState(false);
    const [isSucceded, setIsSucceded] = useState(false)
    const [isFailed, setIsFailed] = useState(null)
    const [isOnline, setIsOnline] = useState(null)
    const navigate = useNavigate()

    const address = {
        details: '',
        phone: '',
        city: ''
    }

    function onlineOrOfflineCheck(values){

      if(isOnline){
        createCheckOutSession(values)
        
      }
      else{
        createCashOrder(values)
        
      }

    }

    function createCheckOutSession( values ) {
      setIsSubmittedOnline(true);
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values
        },
        {
          params: {
            url: 'http://localhost:5173'
          },
          headers:{
            token: localStorage.getItem("tkn")
          }
        }
      )
      .then((res)=>{
       setIsSubmittedOnline(false);
        setIsSucceded(true);
        shippingAddressForm.resetForm();
        
        setTimeout(()=>{
        window.open(res.data.session.url, "_self")
        }, 3000)

      })
      .catch((err)=>{
        setIsSubmittedOnline(false);
        setIsFailed(err.response.data.message);
        setTimeout(()=>{
          setIsFailed(null)
        }, 3000);

      })

    }


    function createCashOrder( values ){

    setIsSubmittedOffline(true);
    const backendBody = {
        shippingAddress: values
    }

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }
    )
    .then((res) =>{
    const cartData = getCartItems();
    setIsSubmittedOffline(false);
    setIsSucceded(true);
    
    setTimeout(()=>{
       navigate("/") 
    }, 3000)
    


    })
    .catch((err)=>{
        setIsSubmittedOffline(false);
        setIsFailed(err.response.data.message);
        setTimeout(()=>{
        setIsFailed(null)
        }, 3000)
    })

    }



    const shippingAddressForm = useFormik({
        initialValues: address,

        onSubmit: onlineOrOfflineCheck,

        validationSchema: yup.object().shape({
            details: yup.string().required("Details Are Required!").min(5, "Minimum is 5 characters"),
            phone: yup.string().required("Phone is Required").matches(/^(02)?01[0125][0-9]{8,9}$/, "The phone must be egyptian number start with 011 | 012 | 010 | 015 and ranged between 11 - 12 numbers"),
            city: yup.string().required("City Is Required").min(3, "Minimum is 3 characters")
        })

    })


  return (
    <>
        
        <div className='container mx-auto md:w-[50%] py-10'>
        <div className=' p-6  bg-white  shadow-2xl shadow-gray-400 rounded-xl '>
        <form  onSubmit={shippingAddressForm.handleSubmit}>
        <h2 className='text-2xl font-bold text-emerald-600  text-center'><i className='fa-solid fa-house text-emerald-400 text-xl m-1'></i> Address Details </h2>
        <h3 className='text-gray-500 text-center font-medium mt-3 '><i className="fa-solid fa-user text-lg m-1 hover:text-blue-300"></i> Enter Your Shipping Address Below Please:</h3>
     
     {/* details */}
    <div className='flex flex-col m-2 mb-5'>
    <label htmlFor="details" className='p-1 mb-1 text-gray-600 hover:text-emerald-600 '>Details:</label>
    <input value={shippingAddressForm.values.details} onChange={shippingAddressForm.handleChange} onBlur={shippingAddressForm.handleBlur}  id='details' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="text" />
    {/* err msg */}
    {shippingAddressForm.errors.details && shippingAddressForm.touched.details ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {shippingAddressForm.errors.details}
  </div>
</div>     
: ""}
    </div>
     {/* Phone */}
    <div className='flex flex-col m-2 mb-5'>
    <label htmlFor="phone" className='p-1 mb-1 text-gray-600 hover:text-emerald-600'>Phone:</label>
    <input value={shippingAddressForm.values.phone} onChange={shippingAddressForm.handleChange} onBlur={shippingAddressForm.handleBlur} id='phone' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="tel" />
    {/* err msg */}
    {shippingAddressForm.errors.phone && shippingAddressForm.touched.phone ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {shippingAddressForm.errors.phone}
  </div>
</div>     
: ""}    
    </div>     
    {/* City */}
    <div className='flex flex-col m-2 mb-5'>
    <label htmlFor="city" className='p-1 mb-1 text-gray-600 hover:text-emerald-600'>City:</label>
    <input value={shippingAddressForm.values.city} onChange={shippingAddressForm.handleChange} onBlur={shippingAddressForm.handleBlur} id='city' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="text" />
    {/* err msg */}
    {shippingAddressForm.errors.city && shippingAddressForm.touched.city ?
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {shippingAddressForm.errors.city}
  </div>
</div>     
: ""}  
    </div>


      {/* offline */}
    <button onClick={() => setIsOnline(false)} disabled={!shippingAddressForm.isValid || isSubmittedOffline} className='bg-emerald-500 text-center hover:bg-emerald-600 rounded-xl shadow-lg shadow-gray-300 px-5 py-3 text-white w-[47%] me-5 mt-3'>
    {isSubmittedOffline ?  
    <div className="flex justify-center items-center">
      <FallingLines
        color="#fff"
        width="30"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
    : "Offline Payment" } 
    
        </button>

{/* online */}
      <button onClick={() => setIsOnline(true)} disabled={!shippingAddressForm.isValid || isSubmittedOnline} className='bg-emerald-500 text-center hover:bg-emerald-600 rounded-xl shadow-lg shadow-gray-300 px-5 py-3 text-white w-[47%]  mt-3'>
    {isSubmittedOnline ?  
    <div className="flex justify-center items-center">
      <FallingLines
        color="#fff"
        width="30"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
    : "Online Payment" } 
    
        </button>

{isFailed?
      <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
      <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div>
        {isFailed}
      </div>
      </div>
  
  :""}

{isSucceded ?
<div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3" role="alert">
      <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
  <div>
   <p>Your order has been created successfully!</p>
  </div>
  </div>

: ""}


</form>
        
        
        </div>

        </div>

    </>
  )
}
