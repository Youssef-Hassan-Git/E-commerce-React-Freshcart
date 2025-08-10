import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollTopNavigation() {

    const {pathname} = useLocation();
    useEffect(() => {
      window.scrollTo({top: 0})
    
    }, [pathname])
    

  return null;
}
