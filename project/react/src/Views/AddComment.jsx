import React, { useEffect, useState } from 'react'
import '../Styles/AddPost.css'
import '../Styles/AddComment.css'
import '../index.css'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import { useRef } from 'react'
function AddComment() {

 const {setMove,setToggle,post_id,setCount}=useStateContext()

    const commentRef=useRef()
   
    const [comments,setComments]=useState([])

     const removeCmntForm=()=>{
       setToggle(true)
       setMove(null)
    }

    useEffect(()=>{
      
      axiosClient.get(`/comments/${post_id}`)
      .then(({data})=>{
        setComments(data.data.comments) 
      })
    },[])


    const handleInpt=(e)=>{
         e.preventDefault()
        const payload={
            'text':commentRef.current.value
        }
      
      
       axiosClient.post(`/comment/${post_id}`,payload)
       .then(({data})=>{
        setCount(prev=>!prev)
        setComments([...comments,data.data])
        commentRef.current.value=''
        
       })
       
      }
    

  return (
    <div className='addcomment'>
      <div className='cmntsCon'>
      

         <div className='commentHeader'>
             <p>Comments</p>
             <FontAwesomeIcon   onClick={removeCmntForm}  className='xmark' icon={faXmark}/>
         </div>

          

         <div className='cmnts'>

         
         {comments.map((elem)=>(
           <div key={elem.id} className='cmnt'>
            <img className='cmnt-img' src='/assets/847969.png'/> 
            <p><span>{elem.user.name} </span>{elem.text}</p>
         </div>
         ))}
          
      
       
         
        

         </div>
    
    
          <form onSubmit={handleInpt} className='cmntForm'>
           <input ref={commentRef}  placeholder='add comment' type='text' />
          </form>

         
         
     </div>
    </div>
  )
}

export default AddComment