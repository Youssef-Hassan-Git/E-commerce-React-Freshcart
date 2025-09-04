import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
  return (
    <div>
        <h2 className='text-center text-3xl text-green-600 font-bold my-10'>Your Payment Is Done Successfully  <i className='fa-solid fa-circle-check text-green-500 text-3xl'></i></h2> 
        <h3 className='text-center text-xl text-gray-600 font-medium my-10'>Thank You For Your Trust In Us</h3>
        <div className='text-center my-9'>
            <p className='text-gray-500'>Your order is being processed and will be shipped soon.</p>
            <Link to="/">
              <button  className='bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition my-5'>Go to Home</button>  
            </Link>
        </div>
    </div>
  )
}
