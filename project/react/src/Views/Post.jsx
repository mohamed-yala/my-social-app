import React, { useState,useEffect, useRef } from 'react'
import {faHeart as heart} from '@fortawesome/free-regular-svg-icons'
import {faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-regular-svg-icons'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
function Post({post,liked,visitProfile}) {

  const {setToggle,setMove,setPostId}=useStateContext()
  
   const [clicked,setClicked]=useState(!liked)

   const [nblikes,setLikes]=useState(post.likes)
  
  
   const openCmnts=(e)=>{
     setToggle(true)
     setMove(e.target.dataset.action)
     setPostId(post.id)
   }
   
   
  const addLike=()=>{
    if(clicked){
    setLikes(prev=>prev+1)
    setClicked(!clicked)
    }else{
      setLikes(prev=>prev-1)
      setClicked(!clicked)
    }
    axiosClient.patch(`/like/${post.id}`)
  }

  return (
    <div className='post'>
        
        <div className='poster'>
          {post.user.ppicture==='847969.png' ?
            <img onClick={()=>visitProfile(post.user)} className='profile-img'  src='/assets/847969.png' /> :
            <img onClick={()=>visitProfile(post.user)} className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${post.user.ppicture}`}  />
         }
           
            <p onClick={()=>visitProfile(post)}>{post.user.name}</p>
         </div>
          
         <div className='description'>
            {post.description}
         </div>
  
         <div className='photo'>
             <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${post.picture}`}/>
         </div>
    
         <div className='features'>
          <FontAwesomeIcon onClick={addLike} className='icon postIcon' icon={clicked ? heart : fullHeart}/>
          <p >{nblikes}</p>
          <FontAwesomeIcon data-action='comment' onClick={openCmnts} className='icon postIcon' icon={faComment}/>
          <p>{post.comments}</p>
         </div>
        
    </div>
  )
}

export default Post