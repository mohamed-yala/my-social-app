
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

import echo from '../echo'
import Friends from './Friends'


function Navbar() {
  const {user,setUser,setToken,toggleMenu,setToggleMenu}=useStateContext()

   const [isWide, setIsWide] = useState(window.innerWidth);
     
       useEffect(() => {
         const handleResize = () => {
           setIsWide(window.innerWidth);
         };
     
         window.addEventListener('resize', handleResize);
         return () => window.removeEventListener('resize', handleResize);
       }, []);
 

 const handleLogOut=(e)=>{
   e.preventDefault()
   axiosClient.post('/logout')
   .then(()=>{
    setUser(null)
    setToken(null)
   })
 }
 
  return (
    <div className={`navbar ${toggleMenu ? '':'hideMenu'}`}>
     { isWide<850 &&  <div className='xmarkCon'>
      <FontAwesomeIcon onClick={()=>setToggleMenu(false)} className='navXmark' icon={faXmark}/>
      </div>}
        <div className='userAcc'>
          <Link className='link' to={`/Profile/${user.id}`}>
          {user.ppicture==='847969.png'?
            <img className='profile-img' src='/assets/847969.png'/> :
            <img className='profile-img'  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${user.ppicture}`}/>  }
          </Link>
          <Link className='link' to={`/Profile/${user.id}`}>
            <p>{user.name}</p>
          </Link>
        </div>
        
        <p className='menu-title'>
          Menu
        </p>


        <div className='menu'>

        <Link className='link' to='/Home'>
        <div className='des boton-elegante'>
        <FontAwesomeIcon className='icon' icon={faHouse} />
        <p>Home</p>
        </div>
         </Link>

       
       
       <Link className='link' to={`/Profile/${user.id}`}>
        <div className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faUser} />
          <p>Profile</p>
        </div>
       </Link>

        <div onClick={handleLogOut} className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} />
          <p>Log out</p>
        </div> 

        {window.innerWidth<1012 && <Friends/>}

        </div>
    </div>
  )
}

export default Navbar