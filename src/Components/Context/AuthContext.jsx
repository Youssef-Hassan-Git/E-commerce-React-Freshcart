import React, { createContext, useContext, useEffect, useState } from 'react'
import { cartContext } from './CartContext'

export const AuthContext = createContext()

export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(null)
    // const {getCartItems} =useContext(cartContext)

    // const [token, setToken] = useState(localStorage.getItem("tkn"))
    
    // each refresh => will make the token lose its value => (NULL)
    // how to prevent on refresh token become null?
    
    // on refresh
    useEffect(()=>{
        // Did Mount
        // will be seen only on first time will never be seen again
        // cause its the whole application will not be unmounted unless app closed
        // => الاساس
        
        // console.log("refresh");
        const userToken = localStorage.getItem("tkn");
        if(userToken){
           setToken(userToken)   
          //  const decoded = jwtDecode(userToken);
          //  setUsername(decoded.name);
        }
    }, [])

    return (
    <AuthContext.Provider value={{ token: token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}
