import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <>
 <div className='h-screen flex justify-center items-center bg-emerald-100/70'>
  <InfinitySpin
   visible={true}
   width="200"
   color="#10b981"
   ariaLabel="infinity-spin-loading"
   />
 
 </div>     
    </>
  )
}
