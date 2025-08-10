import React from 'react'
import notfound from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <div className='w-full flex justify-center items-center p-5 py-10'>
      <img src={notfound} className='w-[50%]' alt="not found path" />
    </div>
  )
}
