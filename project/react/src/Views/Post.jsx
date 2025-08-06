import React from 'react'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-regular-svg-icons'
function Post() {
  return (
    <div className='post'>
        
        <div className='poster'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
          
         <div className='description'>
            fuck this
         </div>

         <div className='photo'>
             <img src='/assets/Thg.png'></img>
         </div>

         <div className='features'>
          <FontAwesomeIcon className='icon postIcon' icon={faHeart}/>
          <FontAwesomeIcon className='icon postIcon' icon={faComment}/>
         </div>
        
    </div>
  )
}

export default Post