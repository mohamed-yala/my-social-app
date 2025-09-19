<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React from 'react'
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../Views/Navbar'
import Friends from '../Views/Friends'
import { useStateContext } from '../contexts/ContextProvider'
import AddPost from '../Views/AddPost'
import AddComment from '../Views/AddComment'
import EditProfile from '../Views/EditProfile'
import ProfileStats from '../Views/ProfileStats'
import Loading from '../Views/Loading'
<<<<<<< HEAD
import echo from '../echo'
import Err from '../Views/err'
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46


function DefaultLayout() {

<<<<<<< HEAD

  const {move,toggle,token,loading}=useStateContext()
  const [isWide, setIsWide] = useState(window.innerWidth > 1012);
  

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1012);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
=======
  const {move,toggle,token,loading}=useStateContext()
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

  

   if(!token){
    return <Navigate to='/login'/> 
   }
<<<<<<< HEAD
    
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

  
  return (
    <div className='defaultLayout'>
      { loading && <Loading/>}
<<<<<<< HEAD
          
           <Navbar/> 
           <Err/>
           <Outlet/>
         {isWide && <Friends/> }  
=======
         
        
           <Navbar/>
           <Outlet/>
           <Friends/>
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
       
      
     
      
  
      {toggle && move==='post' && <AddPost/>}
      {toggle && move==='comment' && <AddComment/>} 
      {toggle && move==='edit' && <EditProfile/>}
      {toggle && move==='followers' && <ProfileStats window='followers'/> }
      {toggle && move==='following' && <ProfileStats window='following'/>}
      

    </div>
  )
}

export default DefaultLayout