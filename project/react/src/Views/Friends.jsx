import React, { useEffect, useState } from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client'
import { useRef } from 'react'
import axios from 'axios'

function Friends() {

  const [users,setUsers]=useState([])
  const [showMore,setShowMore]=useState(true)
  const cursor=useRef(null)
  const firstUsers=useRef([])
  const firstCursor=useRef(null)

   useEffect(()=>{
     axiosClient.get('/users')
     .then(({data})=>{
       setUsers(data.data.data.map((elem)=>({...elem,follow:false})))
       firstUsers.current=data.data.data
       cursor.current=data.data.next_cursor
       firstCursor.current=cursor.current
     })
   },[])

   const addSuggestions=()=>{
     if(cursor.current===null && users.length===4){
      console.log('no more users')
     }else{


     axiosClient.get('/users',{
      params:{cursor:cursor.current}
     })
     .then(({data})=>{
      
       if(cursor.current){
        setUsers([...users,...data.data.data.map((elem)=>({...elem,follow:false}))])
        cursor.current=data.data.next_cursor
        cursor.current ? setShowMore(true):setShowMore(false)

      }else{
        setUsers(firstUsers.current)
        cursor.current=firstCursor.current
        setShowMore(true)
      }
     })
    }
   }

   const follow=(user)=>{
     setUsers(users.map((elem)=>(elem.id===user.id ? {...elem,follow:!elem.follow}:elem))) 
     axiosClient.post(`/follower/${user.id}`)
   }


  return (
    <div className='friends'>

        <p className='friend-title'>
            Suggested for you
        </p>


         {users.map((elem)=>(

         <div key={elem.id} className='suggestions'>
               <div className='userAcc'>
                  <img className='profile-img' src='/assets/847969.png'/> 
                  <p>{elem.name}</p>
               </div>
            <button onClick={()=>follow(elem)} className='btnn'>
             {elem.follow ?
              <>
              <span className="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
                  <span>i</span>
                 <span>n</span>
                 <span>g</span>
               </span>
               <span className="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
                 <span>i</span>
                 <span>n</span>
                 <span>g</span>
               </span>
               </>
               :
               <>
                 <span className="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
                 
               </span>
               <span className="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
                
               </span>
               </>
              
             }
               
             </button>
         
        </div>

        ))}
        
  
        <div onClick={addSuggestions} className='more'>
            <FontAwesomeIcon className='icon' icon={faCaretDown}/>
            <p>{showMore ? 'More': 'Less'}</p>
        </div>
        
         <p className='friend-title'>
            Friends
        </p>

         <div className='userAcc boton-elegante fr'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
        </div>
       
         <div className='userAcc boton-elegante fr'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
        </div>
       
         <div className='userAcc boton-elegante fr'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
        </div>
       
         <div className='userAcc boton-elegante fr'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
        </div>

         <div className='more'>
            <FontAwesomeIcon className='icon' icon={faCaretDown}/>
            <p>More</p>
        </div>
       
    </div>
  )
}

export default Friends