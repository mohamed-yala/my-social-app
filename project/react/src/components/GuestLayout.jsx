import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import '../index.css'
import { useStateContext } from '../contexts/ContextProvider'
import Err from '../Views/err'

function GuestLayout() {

  const {token}=useStateContext()

    if(token){
      return <Navigate to='/Home'/>
    }

  return (
    <div className='guestLayout'>
       <Err/>
       <Outlet/>
       
    </div>
  )
}

export default GuestLayout