import React from 'react'
import apple from '../../assets/images/apple.png'
import playstore from "../../assets//images/playstore.png"
export default function Footer() {
  return (
    <>
      <div className=' p-5 bg-[#F8F9FA]'>
      {/* header */}
      <div className='container ps-6'>
      <h2 className='text-3xl p-5 pb-1'>Get The freshCart App</h2>
      <p className='text-stone-600 p-5 pt-2'>We will send you a link, open it on your phone to download the app.</p>
      </div>

      {/* input */}
      <div className='flex items-center ps-12'>
      <input className='w-[70%] bg-white ring-0 outline-none-0 rounded-2xl ms-5 border-b-emerald-500 border-b-3 focus:border-3  focus:border-emerald-500 focus:outline-none p-2' type="text" placeholder='Email ...'/>
      <button className='w-[20%] bg-emerald-500 hover:bg-emerald-600 px-3 py-2.5 shadow-md shadow-emerald-300 rounded-2xl ms-5 text-white'>Share App Link</button>
      </div>

      <hr className='text-emerald-600 mt-8 rounded-2xl border-dashed w-[92%] mx-auto' />

      {/* partners */}
      <div className=' md:flex justify-between items-center ps-18'>
      <p className="mt-6 text-2xl flex items-center flex-wrap">
        Payment Partners
        <i className="fa-brands fa-apple-pay text-black text-3xl mx-3"></i>
        <i className="fa-brands fa-paypal text-blue-700 text-3xl mx-3"></i>
        <i className="fa-brands fa-google-pay text-[#5F6368] text-3xl mx-3"></i>
      </p>

    <div className="mt-6 flex justify-end items-center">
      <span className='text-md font-semibold me-2'>Get Deliverables with freshCart </span>

      {/* Apple Pay Button */}
      <img src={apple} alt="apple store icon" className='w-25 me-2' />
      <img src={playstore} alt="apple store icon" className='w-25' />

    </div>
      </div>
  
      <hr className='text-emerald-600 mt-8 rounded-2xl border-dashed w-[92%] mx-auto mb-6' />

      </div>
    </>
  )
}
