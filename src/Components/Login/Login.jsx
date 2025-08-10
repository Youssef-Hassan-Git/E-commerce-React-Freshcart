import axios from 'axios'
import { useFormik  } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthContext } from '../Context/AuthContext'
import { cartContext } from '../Context/CartContext'
import { wishListContext } from '../Context/WishlistContext'
import img from "../../assets/images/slider-image-3.jpeg"
import { jwtDecode } from "jwt-decode"; 

export default function Login() {


  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  let user = {
    email: "",
    password: ""
  }

  const {token, setToken} = useContext(AuthContext);
  const {getCartItems} = useContext(cartContext)
  const {getWishlist} = useContext(wishListContext);

  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      // console.log(values);
      
      
      setIsSubmitted(true)
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((loggedData)=>{
        
        setIsSubmitted(false)
        setIsSuccess(true);

        setToken(loggedData.data.token)
        localStorage.setItem("tkn", loggedData.data.token)
        
        const user = jwtDecode(loggedData.data.token);
        localStorage.setItem("userName", user.name);

        const res = getCartItems();
        getWishlist();

        setTimeout(()=>{
          navigate("/")
        }, 2000)


      })
      .catch((err)=>{

        setIsSubmitted(false);
        setErrorMessage(err.response.data.message);
        setTimeout(()=>{
          setErrorMessage(null)
        }, 4000)

      })
      
    },

    validationSchema: yup.object().shape({
      email: yup.string().required("Email is Required").email("Invalid email"),
      password: yup.string().required("Password is Required").min(6, "Minimum password is 6 characters").max(12, "Maximum password is 12 characters")
    })
  })



  return (
    <>


    <div className='container mx-auto '>
          <div className='md:flex flex-row items-center justify-center  gap-3 py-10'>
    
    <img src={img} alt="" className=" w-full  md:w-[50%]  h-105 text-center mx-auto m-5 rounded-md shadow-lg shadow-stone-500" />

            <div className=' md:w-[50%]  '>
            <div className=' p-6  bg-white  shadow-2xl shadow-gray-400 rounded-xl '>
            <form  onSubmit={loginFormik.handleSubmit}>
            <h2 className='text-2xl font-bold text-emerald-600  text-center'><i className='fa-solid fa-right-to-bracket text-emerald-400 text-xl m-1'></i> Login </h2>
            <h3 className='text-gray-500 text-center font-medium mt-3 '><i className="fa-solid fa-user text-lg m-1 hover:text-blue-300"></i> Enter Your Login Details Below Please:</h3>
         
         {/* email */}
        <div className='flex flex-col m-2 mb-5'>
        <label htmlFor="email" className='p-1 mb-1 text-gray-600 hover:text-emerald-600 '>Email:</label>
        <input value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur}  id='email' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="email" />
        {/* err msg */}
        {loginFormik.errors.email && loginFormik.touched.email ?
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
      <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div>
        {loginFormik.errors.email}
      </div>
    </div>     
    : ""}
        </div>
         {/* password */}
        <div className='flex flex-col m-2 mb-5'>
        <label htmlFor="password" className='p-1 mb-1 text-gray-600 hover:text-emerald-600'>Password:</label>
        <input value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} id='password' className='border-b-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 ' type="password" />
        {/* err msg */}
        {loginFormik.errors.password && loginFormik.touched.password ?
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3" role="alert">
      <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div>
        {loginFormik.errors.password}
      </div>
    </div>     
    : ""}    
        </div>     

    
        <button disabled={!loginFormik.isValid || isSubmitted} className='bg-emerald-500 text-center hover:bg-emerald-600 rounded-xl shadow-lg shadow-gray-300 px-5 py-3 text-white w-full mt-3'>
        {isSubmitted ?  
        <div className="flex justify-center items-center">
          <FallingLines
            color="#fff"
            width="30"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
        : "Login" } 
        
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
       <p>Login successfully!</p>
      </div>
      </div>
    
    : ""}
    
    <Link to={"/register"} className='text-center text-blue-600 hover:underline'>
    <p className='mt-4 text-shadow-blue-50 text-md text-shadow-xs'>Don't have an account?<span className="font-semibold"> Register now</span></p>
    </Link>

    <Link to={"/forgotpassword"} className='text-center text-blue-600 hover:underline'>
    <p className='mt-2 text-shadow-blue-50 text-md text-shadow-xs'> Forgot Password?</p>
    </Link>
    </form>
            
            
            </div>
    
            </div>
    
    </div>
    </div>




      
    </>
  )
}
