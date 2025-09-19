import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { useRef } from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client'
import { useParams } from 'react-router-dom'

function EditProfile() {
 const {user,setUser}=useStateContext()
 const imageRef=useRef()
 const [bio,setBio]=useState(user.bio)
 const [name,setName]=useState(user.name)
 const [choice,setChoice]=useState(user.visibility)
 const {id}=useParams()

 const {setMove,setToggle}=useStateContext()
  
   const removeForm=()=>{
    setToggle(false)
    setMove(null)
   }

    const handleSubmit=(e)=>{
       e.preventDefault()    
      const formData=new FormData()
      if(imageRef.current.files[0]){
       formData.append('ppicture',imageRef.current.files[0])
      }
       formData.append('name',name)
       formData.append('bio',bio)
       formData.append('visibility',choice)
      
      axiosClient.post(`/edit/${Number(id)}`,formData)
       .then(({data})=>{
          setUser(data.data)
          removeForm()
       })
    }
 
  return (
   <div className='add'>
    <form className='postForm' onSubmit={handleSubmit}  encType='multipart/form-data'>
        <div className='postHeader'>
          <p>Edit</p>
          <FontAwesomeIcon onClick={removeForm} className='xmark' icon={faXmark}/>
        </div>
        <div>
          <label className='addPhotoBtn' htmlFor="inptFile">Add Profile picture</label>     
          <input ref={imageRef} id='inptFile' type="file"/>
        </div>
      
       <input onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='change name'></input>
       <textarea onChange={(e)=>{setBio(e.target.value)}} value={bio}  placeholder='Bio'></textarea>
                         

        
         <div className='porp'>
                <label className="radio-container">Public
                 <input  onChange={()=>setChoice('public')} checked={choice==='public'} type="radio" name="choice" />
                 <span className="checkmark"></span>
              </label>

              <label  className="radio-container">Private
                  <input onChange={()=>setChoice('private')} checked={choice==='private'} type="radio" name="choice"/>
                  <span className="checkmark"></span>
             </label>
        </div>
       
       <button type='submit'>Edit</button>
     </form>
    </div>
  )
}

export default EditProfile