import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Views/Navbar'
import Friends from '../Views/Friends'
import { useStateContext } from '../contexts/ContextProvider'
import AddPost from '../Views/AddPost'
import AddComment from '../Views/AddComment'
import EditProfile from '../Views/EditProfile'
import ProfileStats from '../Views/ProfileStats'
import Loading from '../Views/Loading'


function DefaultLayout() {

  const {move,toggle,token,loading}=useStateContext()

  

   if(!token){
    return <Navigate to='/login'/> 
   }

  
  return (
    <div className='defaultLayout'>
      { loading && <Loading/>}
         
        
           <Navbar/>
           <Outlet/>
           <Friends/>
       
      
     
      
  
      {toggle && move==='post' && <AddPost/>}
      {toggle && move==='comment' && <AddComment/>} 
      {toggle && move==='edit' && <EditProfile/>}
      {toggle && move==='followers' && <ProfileStats window='followers'/> }
      {toggle && move==='following' && <ProfileStats window='following'/>}
      

    </div>
  )
}

export default DefaultLayout