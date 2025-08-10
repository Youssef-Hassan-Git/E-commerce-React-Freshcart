import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollTopNavigation from '../ScrollTopNavigation/ScrollTopNavigation'

export default function Layout() {
  return (
    <>
    <ScrollTopNavigation />
    <Navbar />

    <Outlet />

    <Footer />
      
    </>
  )
}
