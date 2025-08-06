import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Views/Navbar'
import Friends from '../Views/Friends'
import { useStateContext } from '../contexts/ContextProvider'
function DefaultLayout() {

   const {token}=useStateContext()

   if(!token){
    return <Navigate to='/login'/> 
   }

  return (
    <div className='defaultLayout'>
      <Navbar/>
      <Outlet/>
      <Friends/>
    </div>
  )
}

export default DefaultLayout