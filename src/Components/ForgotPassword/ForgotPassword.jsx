import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function ForgotPassword() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

    const userEmail= {
        email: ""
    }

    function submitEmail(values) {
    
    setIsSubmitted(true)
        
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)

    .then((res) =>{
    setIsSubmitted(false);
    setIsSuccess(true);


        setTimeout(()=>{
          navigate("/verifyforgotcode")
        }, 3000)    

    })
    .catch((err)=>{

        setIsSubmitted(false)
        setErrorMessage(err?.response?.data?.message)
        setTimeout(()=>{
         setErrorMessage(null)
        }, 4000)            
    })

    }

    const forgotPasswordForm = useFormik({
        initialValues: userEmail,

        onSubmit: submitEmail,

        validationSchema: yup.object().shape({
         email: yup.string().required("Email is Required").email("Invalid email"),
            
        })
    })

  return (
    <>
    
    <div className='container mx-auto '>
          <div className='md:flex flex-row items-center justify-center  gap-3 py-10'>
    

            <div className=' md:w-[70%]  '>
            <div className=' p-6  bg-white  shadow-2xl shadow-gray-400 rounded-xl '>
            <form  onSubmit={forgotPasswordForm.handleSubmit}>
            <h2 className='text-2xl font-bold text-emerald-600  text-center'><i className='fa-solid fa-lock text-emerald-400 text-xl m-1'></i> Forgot Password ? </h2>
            <p className=' text-emerald-700 text-center m-3 '>No Worry, We have got you.</p>
            <h3 className='text-gray-500 text-center font-medium mt-3 '><i className="fa-solid fa-user text-lg m-1 hover:text-blue-300"></i> Enter Your Email Below Please:</h3>
         
         {/* email */}
        <div className='flex flex-col m-2 mb-5'>
        <label htmlFor="email" className='p-1 mb-1 text-gray-600 hover:text-emerald-600 '>Email:</label>
        <input value={forgotPasswordForm.values.email} onChange={forgotPasswordForm.handleChange} onBlur={forgotPasswordForm.handleBlur}  id='email' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="email" />
        {/* err msg */}
        {forgotPasswordForm.errors.email && forgotPasswordForm.touched.email ?
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
      <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div>
        {forgotPasswordForm.errors.email}
      </div>
    </div>     
    : ""}
           
        </div>     

    
        <button disabled={!forgotPasswordForm.isValid || isSubmitted} className='bg-emerald-500 text-center hover:bg-emerald-600 rounded-xl shadow-lg shadow-gray-300 px-5 py-3 text-white w-full mt-3'>
        {isSubmitted ?  
        <div className="flex justify-center items-center">
          <FallingLines
            color="#fff"
            width="30"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
        : "Submit Email" } 
        
            </button>
    
    {errorMessage?
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
          <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div>
            {errorMessage}
          </div>
          </div>
      
      :""}
    
    {isSuccess ?
    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3" role="alert">
          <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
      <div>
       <p>We’ve sent a verification code to your email. Please check your inbox and spam folder.</p>
      </div>
      </div>
    
    : ""}
    

    </form>
            
            
            </div>
    
            </div>
    
    </div>
    </div>
  
    </>
  )
}
