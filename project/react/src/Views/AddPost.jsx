import React, { useRef, useState } from 'react'
import '../Styles/AddPost.css'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'

function AddPost() {

  const imageRef=useRef()
  const descriptionRef=useRef()
 
   const {setMove,setToggle}=useStateContext()
  
   const removeForm=()=>{
    setToggle(false)
    setMove(null)
   }

   const handleSubmit=(e)=>{
     e.preventDefault()
     const formData=new FormData()
      formData.append('picture',imageRef.current.files[0])
      formData.append('description',descriptionRef.current.value)
      
     axiosClient.post('/post',formData)
     .then(()=>{
        removeForm()
     })
   }

  return (
    <div className='add'>
    <form className='postForm' onSubmit={handleSubmit}  encType='multipart/form-data'>
        <div className='postHeader'>
          <p>Post</p>
          <FontAwesomeIcon onClick={removeForm} className='xmark' icon={faXmark}/>
        </div>
        <div>
          <label className='addPhotoBtn' htmlFor="inptFile">Add Photo</label>     
          <input ref={imageRef} id='inptFile' type="file"/>
        </div>
      
       <textarea ref={descriptionRef} placeholder='description'></textarea>
       <button>Post</button>
    </form>
    </div>
  )
}

export default AddPost