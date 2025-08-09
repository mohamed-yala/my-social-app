import React, { useState,useEffect, useRef } from 'react'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
function Post({post,likedPosts}) {

   const [clicked,setClicked]=useState(JSON.parse(localStorage.getItem('clicked')))
   const [nblikes,setLikes]=useState(post.likes)
  
   useEffect(()=>{
      if(likedPosts.includes(post.id) && !clicked){
      setClicked(true)
      localStorage.setItem('clicked',JSON.stringify(true))
    }
   },[])
   
  const addLike=()=>{
    if(!clicked){
    setLikes(prev=>prev+1)
    setClicked(true)
    localStorage.setItem('clicked',JSON.stringify(true))
    }else{
      setLikes(prev=>prev-1)
      setClicked(false)
      localStorage.setItem('clicked',JSON.stringify(false))
    }
    axiosClient.patch(`/like/${post.id}`)
  }

  return (
    <div className='post'>
        
        <div className='poster'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
          
         <div className='description'>
            {post.description}
         </div>

         <div className='photo'>
             <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${post.picture}`}/>
         </div>

         <div className='features'>
          <FontAwesomeIcon onClick={addLike} className='icon postIcon' icon={faHeart}/>
          <p >{nblikes}</p>
          <FontAwesomeIcon className='icon postIcon' icon={faComment}/>
          <p>{post.comments}</p>
         </div>
        
    </div>
  )
}

export default Post