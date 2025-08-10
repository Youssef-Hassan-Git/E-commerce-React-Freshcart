import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useAllCategories from '../../Custom Hooks/useAllCategories';

export default function Categories() {

  
  const {data , isError, isLoading, error} = useAllCategories();
  

  if(isLoading){
    return <LoadingSpinner />;
  }

if (isError) {
  return (
    <div className="flex justify-center items-center bg-red-500 h-screen">
      <h2 className="text-white text-3xl">
        Error: {error?.message || "Something went wrong"}
      </h2>
    </div>
  );
}

  return (
    <>
      <div className='container mx-auto py-5'>
        <div className=" grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {data.data.data.map(category => {
          return (
          <div key={category._id} className='category hover:bg-emerald-400 p-3 rounded-2xl shadow-xl shadow-gray-200'>

          <img src={category.image} alt={category.name} className='w-full h-80  rounded-lg hover:rotate-y-360 transition-all duration-500' />
          <h2 className='mt-2 p-2 text-lg font-semibold text-emerald-800 bg-emerald-200 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center'>{category.name}</h2>

          </div>
          )
         })}
        </div>
      </div>
    </>
  )
}
