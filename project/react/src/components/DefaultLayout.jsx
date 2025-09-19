import React, { useEffect, useState } from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Views/Navbar'
import Friends from '../Views/Friends'
import { useStateContext } from '../contexts/ContextProvider'
import AddPost from '../Views/AddPost'
import AddComment from '../Views/AddComment'
import EditProfile from '../Views/EditProfile'
import ProfileStats from '../Views/ProfileStats'
import Loading from '../Views/Loading'
import echo from '../echo'
import Err from '../Views/Err'


function DefaultLayout() {


  const {move,toggle,token,loading}=useStateContext()
  const [isWide, setIsWide] = useState(window.innerWidth > 1012);
  

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1012);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

   if(!token){
    return <Navigate to='/login'/> 
   }
    

  
  return (
    <div className='defaultLayout'>
      { loading && <Loading/>}
          
           <Navbar/> 
           <Err/>
           <Outlet/>
         {isWide && <Friends/> }  
       
      
     
      
  
      {toggle && move==='post' && <AddPost/>}
      {toggle && move==='comment' && <AddComment/>} 
      {toggle && move==='edit' && <EditProfile/>}
      {toggle && move==='followers' && <ProfileStats window='followers'/> }
      {toggle && move==='following' && <ProfileStats window='following'/>}
      

    </div>
  )
}

export default DefaultLayout