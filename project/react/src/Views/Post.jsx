import React, { useState,useEffect, useRef } from 'react'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
function Post({description,image,likes,cmnts}) {

  const clicked=useRef(false)
   const [nblikes,setLikes]=useState(likes)
   
  const addLike=()=>{
    
    if(!clicked.current){
    setLikes(prev=>prev+1)
    clicked.current=true
    }else{
      setLikes(prev=>prev-1)
      clicked.current=false
    }
  }

  return (
    <div className='post'>
        
        <div className='poster'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
          
         <div className='description'>
            {description}
         </div>

         <div className='photo'>
             <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${image}`}/>
         </div>

         <div className='features'>
          <FontAwesomeIcon onClick={addLike} className='icon postIcon' icon={faHeart}/>
          <p >{nblikes}</p>
          <FontAwesomeIcon className='icon postIcon' icon={faComment}/>
          <p>{cmnts}</p>
         </div>
        
    </div>
  )
}

export default Post