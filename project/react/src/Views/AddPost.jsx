import React, { useState } from 'react'
import '../Styles/AddPost.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../contexts/ContextProvider'

function AddPost() {
 
   const {setMove,setToggle}=useStateContext()

   const removeForm=()=>{
    setToggle(false)
    setMove(null)
   }

  return (
    <div className='addPost'>
    <form  encType='multipart/form-data'>
        <div className='postHeader'>
          <p>Post</p>
          <FontAwesomeIcon onClick={removeForm} className='xmark' icon={faXmark}/>
        </div>
        <div>
          <label className='addPhotoBtn' htmlFor="inptFile">Add Photo</label>     
          <input id='inptFile' type="file"/>
        </div>
      
       <textarea placeholder='description'></textarea>
       <button>Post</button>
    </form>
    </div>
  )
}

export default AddPost