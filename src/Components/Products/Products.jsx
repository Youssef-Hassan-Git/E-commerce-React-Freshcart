import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import SimpleSlider from '../HomeSlider/HomeSlider';
import banner1 from "../../assets/images/banner-4.jpeg"
import banner2 from "../../assets/images/blog-img-1.jpeg"
import banner3 from "../../assets/images/blog-img-2.jpeg"
import SimpleSlider2 from '../CategoriesSlider/CategoriesSlider';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import useAllCategories from '../../Custom Hooks/useAllCategories';
import useAllBrands from '../../Custom Hooks/useAllBrands';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/CartContext';
import { wishListContext } from '../Context/WishlistContext';

export default function Products() {
  const scrollUp = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  const {addProductToCart} = useContext(cartContext);
  const {addToWishlist} = useContext(wishListContext);

  async function handleAddToWishlist(productId) {

    const {flag, message} = await addToWishlist(productId);

    if (flag === true) {
      toast.success(message+"!",{
        duration: 3000,
        position: 'top-right',
         icon: '❤️'
      })
    }
   if(flag === false){
      toast.error(message, {
        duration: 3000,
        position: 'top-right',
        className: 'bg-red-100 text-red-800 font-semibold px-4 py-2 rounded shadow-md border-l-4 border-red-500'
      })  
   }    
    
  }

  async function handleAddToCartProduct(id) {
    const responseFlag =  await addProductToCart(id);
    if(responseFlag === true){
      toast.success("Added to cart successfully!", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-md',
        icon: '🛒'
      });
   }

   if(responseFlag === false){
      toast.error("Please Login before adding to cart", {
        duration: 3000,
        position: 'top-right',
        className: 'bg-red-100 text-red-800 font-semibold px-4 py-2 rounded shadow-md border-l-4 border-red-500'
      })  
   }
  }

  // const [allProducts, setAllProducts] = useState(null)

  // async function getAllProducts(){
  // const  {data}  = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  
  // setAllProducts(data.data)

  // }

  // useEffect(() => {
    
  //   getAllProducts();


  // }, [])

  const [params, setParams] = useState({
  page: 1,
  limit: 18,
}); 

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [priceOrder, setPriceOrder ] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('')


  function sortProducts(){

    const newParams = {
      ...params,
      page: 1,
    }

    if (priceMin) {
      newParams['price[gte]'] = priceMin ;  
    }    
    
    if (priceMax) {
      newParams['price[lte]'] = priceMax ;  
    }
    if(priceOrder){
      newParams['sort'] = priceOrder;
    }    
    
    

    if (category) {
      newParams['category[in]'] = category;
    }

    if(brand){
      newParams['brand'] = brand;
    }

    setParams(newParams)



  }

  function resetSort(){
    setParams({
    page: 1,
    limit: 18,
    })
  }

  function getAllProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products",{
      params: params
    })
  
  }
  
  const { data, isError, isLoading, error, isFetching, refetch } = useQuery({
    // queryKey: 'allProducts',
    // key to the cached data 
    queryKey: ['allProducts', params],
    queryFn: getAllProducts,
    
    // refetch the data on mount true by default
    // refetchOnMount: false,
    // refetch data every specified interval seconds
    // refetchInterval: 3000,
  
    // retry to fetch data if error arise default is (3) tries but on server launched is 0
    // retry: 3,
    // wait to retry 1min
    // retryDelay: 1000*60,
 
    // default is 5min to cache time
    // cacheTime: 5000*60,

    refetchOnWindowFocus: false,
    // staleTime: 3000,
    
    // in case error keep old data when go next page if no error handled
    // placeholderData: keepPreviousData,

    // by default true => use it when want control calling Api make it false
    // use refetch on the button manually
    // enabled: true,
  })

  // console.log("data", data);
  // console.log("isloading", isLoading);
  // console.log("iserror", isError);
  
  const {data:categorydata, isLoading:categoriesLoading} = useAllCategories();
  const {data:brandData, isLoading:brandLoading} = useAllBrands();


  if(categoriesLoading){
    return <LoadingSpinner />
  }


  if(brandLoading){
    return <LoadingSpinner />
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


if (isLoading) {
  return <LoadingSpinner />
}




  return (
//     <>
// {allProducts ?



  
// <div className='container mx-auto'>

//   <div className='md:flex md:justify-center md:items-center  pt-4 '>
//     <div className='md:w-[70%]  mb-15 md:mb-8'>
      
//     <SimpleSlider />
//     </div>

//     <div className='md:w-[30%] mb-9.5'>

//       <img src={banner1} alt="" className='w-full h-45' />
//       <img src={banner3} alt="" className='w-full h-45' />

//     </div>



//   </div>


//   <div>
//     <h3 className='p2 pt-5 pb-3 font-bold'>Shop Popular Categories</h3>
//     <SimpleSlider2 />
//   </div>


//     <div className=' grid md:grid-cols-3 lg:grid-cols-6 pt-10'>

    

//     {allProducts.map( (product) =>{

//       return (
//     <div key={product._id} className='product p-2 gap-3 relative'>

//     <img src={product.imageCover} className='w-full' alt={product.title} />
    
//     <h6 className='text-green-500'>{product.category.name}</h6>
//     <h2>{product.title.split(" ").splice(0,2).join(" ")}</h2>

//     <div className="flex justify-between items-center">
//       <p>
//         {product.MinAfterDiscount ?
//         <>
//         <span className='me-2 line-through text-red-500'>{product.Min} EGP</span>         
//         <span>{product.MinAfterDiscount} EGP</span> 
//         </>:
//         <span className=''>{product.price} EGP</span>}
//         </p>
//       <p><i className='fa-solid fa-star pe-1 text-yellow-400'></i>{product.ratingsAverage}</p>
//     </div>

//     {product.priceAfterDiscount?     <h4 className='text-white bg-red-500 absolute top-2 right-2 p-1.5 pe-3 ps-3'>Sale</h4>: ""}
    
//     </div>
    
  
//       )

//     }
    
//  )}


//     </div>


// <div>
//   <i onClick={scrollUp}   className="fa-solid fa-arrow-up fixed bottom-6 right-0.5 text-white bg-emerald-500 p-3 rounded-full text-xl shadow-md shadow-emerald-500 hover:bg-emerald-600 transition-all duration-300 cursor-pointer z-50"></i>
// </div>
// </div>

// :

// <LoadingSpinner />

// }
//     </>


    <>

  
<div className='container mx-auto'>

  <div className='md:flex md:justify-center md:items-center  pt-4 '>
    <div className='md:w-[70%]  mb-15 md:mb-8'>
      
    <SimpleSlider />
    </div>

    <div className='md:w-[30%] mb-9.5'>

      <img src={banner1} alt="" className='w-full h-45' />
      <img src={banner3} alt="" className='w-full h-45' />

    </div>



  </div>


  <div>
    <h3 className='p2 pt-5 pb-3 font-bold'>Shop Popular Categories</h3>
    <SimpleSlider2 />
  </div>

  <div className="mt-15 mb-5 relative p-8 rounded-3xl shadow-2xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 opacity-90"></div>
    <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl"></div>
    <div className="relative z-10">
      {/* search */}
      <div className="mx-auto flex items-center justify-center  ">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 me-3">Search For Products</label>
          <div className="relative">
              <input onChange={(e) =>{setSearchedKeyword(e.target.value)}} type="search" id="default-search" className="md:w-[500px] lg:w-[800px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search T-shirts, Laptops..." required />
          </div>
      </div>

        <div className='filters '>

        <div className='flex items-center my-4  justify-center'>
            {/* min */}
          <label htmlFor="price">Minimum Price:</label>
            <input min="0" onChange={(e) =>{ setPriceMin( e.target.value)}}  id='price' className='w-[37%] p-3 me-6 ms-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500' type="number" placeholder='Min Price...' />
         
           {/* max */}
          <label htmlFor="price">Maximum Price:</label>
          <input min="0" onChange={(e) =>{ setPriceMax( e.target.value)}}  id='price' className='w-[37%] p-3 ms-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500' type="number" placeholder='Max Price...' />
         
        </div>
        

         
    <div className='flex flex-col md:flex md:flex-row md:items-center my-4  md:justify-start'>
      
      {/* categ */}
       <label htmlFor="category">Category:</label>
       <select onChange={ (e) => {setCategory( e.target.value )}} name="category" id="category" className='m-3 p-2 bg-gray-100 rounded-xl'>
         <option value="" defaultValue>Select a Category</option>
      {categorydata.data.data.map((category)=>{
        return (
      <option  key={category._id} value={category._id}>{category.name}</option>    
        )
      })}
      </select>


    {/* brand */}
      <label htmlFor="brand">Brand: </label>
      <select onChange={(e)=>{setBrand(e.target.value)}} name="brand" id="brand" className='m-3 p-2  bg-gray-100 rounded-xl'>
        <option value="" defaultValue>Select a Brand</option>
      {brandData.data.data.map((brand) =>{
       return (
          <option key={brand._id} value={brand._id}>{brand.name}</option>
        )
      })}

      </select>

    {/* price sorting */}
      <div className="flex flex-wrap m-3">
          <div className="flex items-center me-4">
            <input id="ascPrice" type="radio" onChange={() => {setPriceOrder('price')}} value={'price'} name="sortPrice" className="w-4 h-4  bg-gray-100 border-gray-300  " />
            <label htmlFor="ascPrice" className="ms-2 text-sm font-medium text-gray-900 ">Sort Price Asc.</label>
        </div>
        <div className="flex items-center me-4">
            <input id="descPrice" type="radio" onChange={() => {setPriceOrder('-price')}} value={'-price'} name="sortPrice" className="w-4 h-4  bg-gray-100 border-gray-300 " />
            <label htmlFor="descPrice" className="ms-2 text-sm font-medium text-gray-900 ">Sort Price Desc.</label>
        </div>


    </div>

      
    </div>


     
      </div>  

    {/* filters buttons */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
      <button  className='bg-white/40 backdrop-blur-md border border-white/30 shadow-lg text-emerald-900 font-semibold px-8 py-3 rounded-2xl hover:bg-white/60 hover:shadow-xl transition duration-300 flex items-center gap-2'
      onClick={ sortProducts } ><i className="fa-solid fa-filter text-emerald-700"></i> Filter</button>
      <button  className='bg-white/40 backdrop-blur-md border border-white/30 shadow-lg text-emerald-900 font-semibold px-8 py-3 rounded-2xl hover:bg-white/60 hover:shadow-xl transition duration-300 flex items-center gap-2'
      onClick={ resetSort } ><i className="fa-solid fa-rotate-left text-emerald-700"></i> Reset Filter</button>
    </div>

  </div>
</div>


    <div className='mt-15  shadow-2xl shadow-stone-300 p-5 py-8 mx-auto max-w-100 md:max-w-150 hover:shadow-emerald-400 hover:shadow-lg transition-all duration-200'>

      <div className='text-center'>
        <h2 className='text-2xl font-black text-emerald-600 text-shadow-2xs text-shadow-emerald-100 '>FreshCart Store</h2>
      </div>

    </div>


    <div className=' grid md:grid-cols-3 lg:grid-cols-6 pt-10'>



    {data.data.data.filter( (product) => product.title.toLowerCase().includes(searchedKeyword.toLowerCase())).map( (product) =>{

      return (
    <div key={product._id} className='product p-2 gap-3 relative'>
   
        <div className='relative overflow-hidden group  p-1.5 shadow-2xl shadow-gray-400 rounded-lg hover:shadow-xl hover:shadow-emerald-400 transition-all duration-150'>

          <div onClick={() => handleAddToCartProduct(product._id)} className='absolute z-20 top-1 start-1'>
          <i className='fa-solid fa-plus text-white p-1.5 bg-emerald-400 hover:bg-emerald-500 rounded-lg pe-3 ps-3 -translate-x-[150%] group-hover:translate-x-0 transition-all duration-500 border-3 border-emerald-500 hover:border-emerald-400'></i>
          </div>

          <div className='relative overflow-hidden group/outer group/layer'>
            <Link to={`/productdetails/${product._id}`}>
            
                <div className='overflow-hidden rounded-lg '>
                <img src={product.imageCover} className='w-full transition-transform duration-300 group-hover/outer:scale-110' alt={product.title} />

                </div>
              
                <div className='layer  rounded-lg absolute bottom-0 top-[50%] bg-black/50 flex justify-center items-center right-0 left-0 translate-y-[150%] group-hover/layer:translate-y-0 transition-all duration-800'>
                 <div className='flex  items-center'>
                 <p className='text-white me-2'>Quick Preview</p>
                <i className="fa-solid fa-eye text-purple-700 text-xl bg-white hover:bg-purple-700 hover:text-white  px-1.5 py-1.5 rounded-full transition-all duration-300 "></i>
                 </div>
                </div>
           </Link>   
            </div>             
               
               <div className='flex justify-between my-1'>
                 <h6 className='text-green-500'>{product.category.name}</h6>
                 <Link to={`/productdetails/${product._id}`}>
                <i className="fa-solid fa-eye text-purple-700 text-xl bg-white hover:bg-purple-700 hover:text-white  px-1.5 py-1.5 rounded-full transition-all duration-300 "></i>
                 </Link>
               </div>

                <div className='flex justify-between my-1'>
               
                <h2>{product.title.split(" ").splice(0,2).join(" ")} </h2>
                <i onClick={ () => handleAddToWishlist(product._id)} className="ms-4 fa-solid fa-heart  text-xl bg-white px-2 py-1.5 text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-all duration-300 "></i>
                </div>

                <div className="flex justify-between items-center">
                  <p>
                    {product.priceAfterDiscount ?
                    <>
                    <span className='me-1 line-through text-red-500 text-xs'>{product.price} EGP</span>         
                    <span>{product.priceAfterDiscount} EGP</span> 
                    </>:
                    <span className=''>{product.price} EGP</span>}
                    </p>
                  <p><i className='fa-solid fa-star pe-1 text-yellow-400'></i>{product.ratingsAverage}</p>
                </div>

                {product.priceAfterDiscount?     <h4 className='text-white bg-red-500 absolute top-2 right-2 p-1.5 pe-3 ps-3 rounded-lg'>Sale</h4>: ""}
                
            

            <div className='  '>
             <button  onClick={ () => handleAddToCartProduct(product._id) } className='bg-emerald-500 w-full text-white rounded-xl mt-2 p-2 hover:bg-emerald-600 transition-all duration-300  shadow-md shadow-emerald-300 group/btn'>Add To Cart <i className="ms-9 fa-solid fa-shopping-bag  text-xl bg-white px-2 py-1.5 text-emerald-500 rounded-full group-hover/btn:text-white group-hover/btn:bg-emerald-500 transition-all duration-400 "></i></button>
             <button  onClick={ () => handleAddToWishlist(product._id) } className='bg-red-500 w-full text-white rounded-xl mt-2 p-2 hover:bg-red-600 transition-all duration-300  shadow-md shadow-red-300 group/btn2 '>Add To Wishlist <i className="ms-4 fa-solid fa-heart  text-xl bg-white px-2 py-1.5 text-red-500 rounded-full group-hover/btn2:text-white group-hover/btn2:bg-red-500 transition-all duration-400"></i></button>
            </div>

        </div>
    </div>
    
  
      )

    }
    
 )}


  
    </div>


<div>
  <i onClick={scrollUp}   className="fa-solid fa-arrow-up fixed bottom-6 right-0.5 text-white bg-emerald-500 p-3 rounded-full text-xl shadow-md shadow-emerald-500 hover:bg-emerald-600 transition-all duration-300 cursor-pointer z-50"></i>
</div>


<p className="text-center m-3 text-gray-700">
  You're on page: <span className="font-bold ms-1 ">{params.page} of {data.data.metadata.numberOfPages}</span>
</p>
  <div className='flex justify-center items-center'>
    <button onClick={ () => { setParams({ ...params, page: params.page - 1 }) }}  className='bg-emerald-200 p-2 px-4 me-1 mb-5 rounded hover:bg-emerald-300 '>Previous Page</button>
   
  {Array(data.data.metadata.numberOfPages).fill(0).map((number, index)=>{
      return(
      
      <button onClick={ () => { setParams({ ...params, page: index + 1 }) }} key={index}   className={`${params.page == index + 1 ? 'bg-emerald-400 p-2 px-4 me-1 mb-5 rounded' : 'bg-emerald-100 p-2 px-4 me-1 mb-5 rounded hover:bg-emerald-200 ' }`}>{index + 1}</button>
      )
    })}

    <button onClick={ () => { setParams({ ...params, page: params.page + 1 }) }}  className='bg-emerald-200 p-2 px-4 me-1 mb-5 rounded hover:bg-emerald-300'>Next Page</button>
   
  </div>

</div>

  </>


  )
}


/*
react-query => handle async states - cache data => re-fetch data


*/