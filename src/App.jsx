import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import AuthContextProvider from './Components/Context/AuthContext'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishlistContextProvider from './Components/Context/WishlistContext'
import Wishlist from './Components/Wishlist/Wishlist'
import PaymentAddress from './Components/PaymentAddress/PaymentAddress'
import AllOrders from './Components/AllOrders/AllOrders'
import { Offline } from 'react-detect-offline'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import VerifyForgotCode from './Components/VerifyForgotCode/VerifyForgotCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import PaymentSuccess from './Components/AfterSuccessPayment/PaymentSuccess'


const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children: [
    {path: '/register', element: <Register /> },
    {path: '/login', element: <Login /> },
    {path: '/forgotpassword', element: <ForgotPassword /> },
    {path: '/verifyforgotcode', element: <VerifyForgotCode /> },
    {path: '/resetpassword', element: <ResetPassword /> },
    {path: '*', element: <NotFound /> },
    {path: "/", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
    {path: "/cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
    {path: "/wishlist", element: <ProtectedRoute> <Wishlist /></ProtectedRoute> },
    {path: "/categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    {path: "/brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    {path: "/productdetails/:id", element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
    {path: "/allorders", element: <ProtectedRoute> <AllOrders /></ProtectedRoute> },
    {path: "/paymentaddress", element: <ProtectedRoute> <PaymentAddress /></ProtectedRoute> },
    {path: "/cart/allorders", element: <ProtectedRoute> <PaymentSuccess /></ProtectedRoute> },

  ]}

]);


const reactQueryConfigs = new QueryClient();

export default function App() {
  return (
    <>

    <AuthContextProvider>
      <QueryClientProvider client={reactQueryConfigs}>
      <WishlistContextProvider>
        <CartContextProvider >
    <RouterProvider router={router} />
    <Toaster />
        </CartContextProvider>
      </WishlistContextProvider >
 
     </QueryClientProvider>
    </AuthContextProvider>

        <Offline>
          <div className='fixed bottom-5 left-5 bg-black text-white rounded-2xl p-5 z-500'>
          <h1>You're offline right now. Check your connection.</h1>
          </div>
        </Offline>
    </>
  )
}
