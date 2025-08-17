import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

function Navbar() {
  const {user,setUser,setToken}=useStateContext()

 const handleLogOut=(e)=>{
   e.preventDefault()
   axiosClient.post('/logout')
   .then(()=>{
    setUser(null)
    setToken(null)
   })
 }
 

  return (
    <div className='navbar'>
        <div className='userAcc'>
          <Link className='link' to={`/Profile/${user.id}`}>
          {user.pPicture==='847969.png'?
            <img className='profile-img' src='/assets/847969.png'/> :
            <img className='profile-img'  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${user.pPicture}`}/>  }
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

       <Link className='link' to='/Messages'>
        <div className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faMessage} />
           <p>Messages</p>
        </div>
        </Link>
       
       <Link className='link' to={`/Profile/${user.id}`}>
        <div className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faUser} />
          <p>Profile</p>
        </div>
       </Link>

        <div onClick={handleLogOut} className='des boton-elegante'>
          <p>Log out</p>
        </div>

        </div>
    </div>
  )
}

export default Navbar