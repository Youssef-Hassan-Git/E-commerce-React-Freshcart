import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImage1 from "../../assets/images/slider-image-1.jpeg"
import sliderImage2 from "../../assets/images/slider-image-2.jpeg"
import sliderImage3 from "../../assets/images/slider-image-3.jpeg"
import sliderImage4 from "../../assets/images/slider-2.jpeg"
import sliderImage5 from "../../assets/images/grocery-banner.png"
import sliderImage6 from "../../assets/images/grocery-banner-2.jpeg"
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useQuery } from "react-query";
import useAllCategories from "../../Custom Hooks/useAllCategories";

function SimpleSlider2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {breakpoint: 1024, settings: {
                slidesToShow: 7,
                slidesToScroll: 3,
        } },
        {breakpoint: 768 , settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
        }},
        {breakpoint: 480 , settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
        }},
    ],

  };

  // const [allCategories, setAllCategories] = useState(null)
  

  //  function getAllCategories(){

  //  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  //  .then((categoriesData) =>{
       
  //      setAllCategories(categoriesData.data.data)
  //  })
  //  .catch((err) =>{
  //   console.log("error in categories", err);
    
  //  })
    

  // }


  // useEffect(() => {
    
  //   getAllCategories();

  // }, [])
  


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



    <div className="slider-container">
      <Slider {...settings}>

{ data.data.data.map((category) => {
     
     return (
    <div className="" key={category._id}>
    <img src={category.image} className="w-full h-40" alt={category.name} />
    <h2>{category.name}</h2>

    </div>
     )
        
       
    })}

      </Slider>
    </div>





</>


  );
}

export default SimpleSlider2;
