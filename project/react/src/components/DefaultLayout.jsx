import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Views/Navbar'
import Friends from '../Views/Friends'
import { useStateContext } from '../contexts/ContextProvider'
import AddPost from '../Views/AddPost'


function DefaultLayout() {

  const {move,toggle}=useStateContext()

   const {token}=useStateContext()

   if(!token){
    return <Navigate to='/login'/> 
   }

  
  return (
    <div className='defaultLayout'>
      <Navbar/>
      <Outlet/>
      <Friends/>

      {toggle && move==='post' && <AddPost/>}

    </div>
  )
}

export default DefaultLayout