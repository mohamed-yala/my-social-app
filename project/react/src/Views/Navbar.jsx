import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

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
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>{user.name}</p>
        </div>
        
        <p className='menu-title'>
          Menu
        </p>


        <div className='menu'>
        <div className='des boton-elegante'>
        <FontAwesomeIcon className='icon' icon={faHouse} />
        <p>Home</p>
        </div>

        <div className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faMessage} />
           <p>Messages</p>
        </div>

        <div className='des boton-elegante'>
          <FontAwesomeIcon className='icon' icon={faUser} />
          <p>Profile</p>
        </div>

        <div onClick={handleLogOut} className='des boton-elegante'>
          <p>Log out</p>
        </div>

        </div>
    </div>
  )
}

export default Navbar