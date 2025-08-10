import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ColorRing, FallingLines, Rings } from 'react-loader-spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function Register() {
  // react hook form => another library


  // formik => handle form states
  // handle errors


  // real dom - virtual dom
  // un-controlled element - controlled component

  // Hook => custom hook

  

  let user = {
      name: '',
      password: '',
      rePassword: '',
      email: '',
      phone: '',

    }; 


    const [errorMessage, setErrorMessage] = useState(null)    
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false)

  const registerFormik = useFormik({
    initialValues:user,
    onSubmit: ( values )=> {
      // console.log("hello from formik", values);
      // send Object to api

    // try{
    //   const {registerRes} = await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values )
    // }
    // catch(err){
    //   console.log(err.response.data.message);
    // }

      setIsSubmitted(true)

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values )
    .then( () => {
      // success message

      
      setIsSubmitted(false);
      
      setTimeout( () => {
        setIsSuccess(true);
  
      }, 1000)


      navigate("/login")

    })
    .catch( (err)=> {
      // err.response.data.message
      setErrorMessage(err.response.data.message);
      setIsSubmitted(false)

      setTimeout(()=> {
        setErrorMessage(null);
      }, 4000)



    })
    
    },

    // validate: (values) => {

    //   const errors = {};

    //   const nameRegex = /^[A-Z][a-z]{3,11}$/
    //   const phoneRegex = /(20)?01[0125][0-9]{8,9}$/

    //   if(! nameRegex.test(values.name )){
    //     errors.name = "Name must start with a capital letter and be 4–12 letters long"
    //   }

    //   if(! phoneRegex.test(values.phone) ){
    //     errors.phone = "The phone must be egyptian number start with 011 | 012 | 010 | 015 and ranged between 11 - 12 numbers"
    //   }

    //   if( ! values.email.includes('@') || ! values.email.includes('.')){
    //     errors.email = "Invalid Email, Email must include @example.com"
    //   }

    //   if(values.password.length < 6 || values.password.length > 12){
    //     errors.password = "Password must from 6 to 12 characters"
         
    //   }

    //   if(values.password !== values.rePassword){
    //     errors.rePassword = "Confirm password Doesn't match the password"
         
    //   }

    //   console.log(errors);
      
    //   return errors;
    // },

    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required").min(3, "Name is mininum 3 characters").max(18, "Name is maximum 18 characters"),
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required().min(6, "Minimum is 6 characters").max(12, "Maximum is 12 characters"),
      rePassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password')], "Password doesn't match the confirm password"),
      phone: yup.string().required("Phone is Required").matches(/^(02)?01[0125][0-9]{8,9}$/, "The phone must be egyptian number start with 011 | 012 | 010 | 015 and ranged between 11 - 12 numbers"),
    }),

  })

  return (
    <>



<div className='p-6 max-w-[46%] py-8  shadow-2xl shadow-gray-400 rounded-xl  mx-auto  mt-5 mb-5'>

  <h2 className='text-2xl font-bold text-emerald-600  text-center'><i className="fa-solid fa-user-plus me-2 text-emerald-400 text-xl m-1"></i>Register</h2>
  <h3 className='text-gray-500 text-center font-medium mt-3 mb-3 '><i className="fa-solid fa-user text-lg m-1 hover:text-blue-300"></i> Enter Your Account Details Below Please:</h3>

  <form onSubmit={ registerFormik.handleSubmit } className="max-w-[85%] mx-auto">
  <div className="flex flex-col m-2 mb-5 ">
      <label htmlFor="name" className="p-1 text-gray-600 hover:text-emerald-600 mb-1">Name</label>
      <input value={ registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="border-b-2 focus:outline-none focus:ring-2 w-full focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500" placeholder="" required />
  
  {registerFormik.errors.name && registerFormik.touched.name?  
<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {registerFormik.errors.name}
  </div>
</div>  : ''}

  
  </div>    
  <div className="flex flex-col m-2 mb-5 ">
      <label htmlFor="email" className="p-1 text-gray-600 hover:text-emerald-600 mb-1">Email address</label>
      <input value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="email" name="email" id="email" className="border-b-2 focus:outline-none focus:ring-2 w-full focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500" placeholder=" " required />
  
    {registerFormik.errors.email && registerFormik.touched.email ?  
<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {registerFormik.errors.email}
  </div>
</div>  : ''}
  
  </div>


  <div className="flex flex-col m-2 mb-5 ">
      <label htmlFor="password" className="p-1 text-gray-600 hover:text-emerald-600 mb-1">Password</label>
      <input value={registerFormik.values.password} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" name="password" id="password" className="border-b-2 focus:outline-none focus:ring-2 w-full focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500" placeholder=" " required />
  
  {registerFormik.errors.password && registerFormik.touched.password? 
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {registerFormik.errors.password}
  </div>
</div>  : '' }
  
  
  </div>

  <div className="flex flex-col m-2 mb-5 ">
      <label htmlFor="rePassword" className="p-1 text-gray-600 hover:text-emerald-600 mb-1">Confirm password</label>
      <input value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" name="rePassword" id="rePassword" className="border-b-2 focus:outline-none focus:ring-2 w-full focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500" placeholder=" " required />
 
   {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? 
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {registerFormik.errors.rePassword}
  </div>
</div>  : '' }
 
  </div>
  <div className="flex flex-col m-2 mb-5 ">
      <label htmlFor="phone" className="p-1 text-gray-600 hover:text-emerald-600 mb-1">Phone</label>
      <input value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="tel" name="phone" id="phone" className="border-b-2 focus:outline-none focus:ring-2 w-full focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500" placeholder=" " required />
 
   {registerFormik.errors.phone && registerFormik.touched.phone ? 
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {registerFormik.errors.phone}
  </div>
</div>  : '' }

  </div>


    {errorMessage ? 
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    {errorMessage}
  </div>
  </div>
: '' }


    {isSuccess == true ? 
<div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
  </svg>
  <div>
    Registered Sucessfully!
  </div>
  </div>
: '' }

        
  <button type="submit" disabled={!registerFormik.isValid} className={`${registerFormik.isValid 
  ? 'w-full text-white  bg-emerald-500 hover:bg-emerald-600  focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-600 shadow-emerald-500 shadow-md' 
  : 'w-full bg-emerald-600 text-white font-medium rounded-lg text-sm px-5 py-3.5 text-center'}`}>
  { isSubmitted == false ? 'Register' :   
  <FallingLines
  color="#fff"
  width="26"
  visible={true}
  ariaLabel="falling-circles-loading"
  />}

  </button>

    <div className='mt-5 text-center text-lg '>

  <NavLink to={"/login"} className={" text-blue-700 ms-5 hover:underline hover:text-blue-800 text-shadow-sm text-shadow-blue-50"}>Already have an account? Login</NavLink>
  
    </div>


</form>
</div>



    </>
  )
}
