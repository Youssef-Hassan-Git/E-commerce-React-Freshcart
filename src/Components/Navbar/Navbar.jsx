import React, { useContext, useState } from 'react'
import freshCartLogo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { cartContext } from '../Context/CartContext'
import { wishListContext } from '../Context/WishlistContext'

export default function Navbar() {

    const {token, setToken}= useContext(AuthContext)
    const {numOfCartItems} = useContext(cartContext)
    const {wishlistCount} = useContext(wishListContext)
    const navigate = useNavigate();


    const userName = localStorage.getItem("userName")

    const handleLogOut = () =>{
        localStorage.removeItem("tkn")
        setToken(null);

        navigate("/login")
    }


    const [menu, setMenu] = useState(false)

    function openMenu(){
        setMenu(!menu)
    }

    return (
    <>

    <nav className='bg-[#F8F9FA] relative'>

    <div className='flex items-center justify-between  p-6 pb-10 md:pb-6 container mx-auto md:max-w-[1150px]'>

 {/* left part */}   



 <div className='md:flex md:items-center gap-3  '>

    <Link to='/'><img src={freshCartLogo} className='mb-3' alt="freshcart logo" /></Link>

{token?

    <ul className=' flex items-center space-x-4 '>
        <li>
            <NavLink to ='/' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300'}>Products</NavLink>
        </li>
        <li>
            <NavLink to ='/categories' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300'}>Categories</NavLink>
        </li>
        <li>
            <NavLink to ='/brands' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300'}>Brands</NavLink>
        </li>
        <li >
            <NavLink to ='/cart' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300 relative '}> <i className='fa-solid fa-cart-shopping text-blue-400'></i> <span className='absolute -top-2 text-white -right-3 bg-red-500 px-2 py-0.5 text-bold text-xs rounded-full'>{numOfCartItems}</span> </NavLink>
        </li>        
        <li >
            <NavLink to ='/wishlist' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300 relative '}> <i className='fa-solid fa-heart text-red-500 '></i> <span className='absolute -top-2 text-white -right-3 bg-red-500 px-2 py-0.5 text-bold text-xs rounded-full'>{wishlistCount}</span> </NavLink>
        </li>        
        <li >
            <NavLink to ='/allorders' className={'text-text-gray-600 hover:text-emerald-500 transition duration-300 relative '}>    <i className='fa-solid fa-receipt text-cyan-500'></i> </NavLink>
        </li>
        
    </ul>

 
 :""}

    </div> 

    
    <button onClick={ openMenu } className='md:hidden text-black p-2 absolute  bottom-[-5px] left-5 text-2xl'>☰</button>

    <div className='sm:flex-col md:flex md:flex-row  gap-4 hidden '>

    

{/* icons */}
    <ul className='flex items-center gap-3'>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-facebook-f'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-twitter'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-behance'></i>
        </li>

        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-linkedin'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-youtube'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-instagram'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-tiktok'></i>
        </li>
    </ul>

    {/* links on right */}
    <ul className='flex items-center gap-4'>
{token ?
       <>  
                    <li className="hidden md:block">
                      <span className="inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-3 py-1 text-sm text-gray-700">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                          {userName?.[0].toUpperCase()}
                        </span>
                        <span className="font-medium">Hi, {userName}</span>
                        
                      </span>
                    </li>
                

        <li>
            <span onClick={handleLogOut} className='cursor-pointer bg-red-500 hover:bg-red-600 p-1.5 ps-3 pe-3 text-white rounded-md transition-all duration-300'>Logout</span>
        </li>
        </>
        :  
        <>
        <li>
            <NavLink to='/login' className={'bg-emerald-500 hover:bg-emerald-600 hover:text-white text-white rounded-md ps-4 pe-4 pt-2 pb-2 transition-all duration-300'}>Login</NavLink>
        </li>        
        <li>
            <NavLink className=' text-emerald-500 p-1.5 ps-2 pe-2 border-1 border-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition-all duration-300' to='/register'>Register</NavLink>
        </li>
        </>
        
        }
        
    </ul>

    </div>




    </div>

    {/* right part */}
{menu ?
    <div className='flex flex-col gap-3 md:hidden pb-9'>

    
{/* icons */}
    <ul className='flex justify-around '>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-facebook-f'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-twitter'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-behance'></i>
        </li>

        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-linkedin'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-youtube'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-instagram'></i>
        </li>
        <li>
            <i className='fa-brands text-gray-500 hover:text-emerald-500 transition duration-300  cursor-pointer fa-tiktok'></i>
        </li>
    </ul>

    {/* links on right */}
    <ul className='flex items-center gap-4'>
{token ?


       <>  
                    <li className="">
                      <span className="inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-3 py-1 text-sm text-gray-700">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                          {userName?.[0].toUpperCase()}
                        </span>
                        <span className="font-medium">Hi, {userName}</span>
                      </span>
                    </li>
                

        
        <li>
            <span onClick={handleLogOut} className='cursor-pointer bg-red-500 hover:bg-red-600 p-1.5 ps-3 pe-3 text-white rounded-md transition-all duration-300'>Logout</span>
        </li>
        </>
        :  
        <>
        <li>
            <NavLink to='/login' className={'bg-emerald-500 hover:bg-emerald-600 hover:text-white text-white rounded-md ps-4 pe-4 pt-2 pb-2 transition-all duration-300'}>Login</NavLink>
        </li>        
        <li>
            <NavLink className=' text-emerald-500 p-1.5 ps-2 pe-2 border-1 border-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition-all duration-300' to='/register'>Register</NavLink>
        </li>
        </>
        
        }
        
    </ul>


    </div>
: ""}

    </nav>
      
    </>
  )
}
