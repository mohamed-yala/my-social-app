import React, { useEffect, useState } from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function ProfileStats({window}) {
   
    const {setToggle,setMove}=useStateContext()
    const [users,setUsers]=useState([])
    const {id}=useParams()

   const removeForm=()=>{
    setToggle(false)
    setMove(null)
   }


   useEffect(()=>{
    if(window==='followers'){
        axiosClient.get(`/followers/${id}`)
        .then(({data})=>{
           setUsers(data.data)
        })
    }else{
        axiosClient.get(`/following/${id}`)
        .then(({data})=>{
            setUsers(data.data)
            console.log(data.data)
        })
    }
   },[])

    const navigate =useNavigate()
      const visitProfile=(elem)=>{
     return navigate(`/Profile/${elem.id}`)
   }

  return (
    <div className='add'>
        <div className='followCon'>
            <div className='postHeader'>
                <p>{window}</p>
                <FontAwesomeIcon onClick={removeForm} className='xmark' icon={faXmark}/>
            </div>

            <div className='cmnts'>

              {users.map((elem)=>(
                  <div key={elem.id}  className='people'>
                    {elem.pPicture==='847969.png'?
                      <img onClick={()=>visitProfile(elem)} className='profile-img' src='/assets/847969.png'/> :
                      <img onClick={()=>visitProfile(elem)} className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${elem.pPicture}`}/> 
                    }
                    <p>{elem.name}</p>
                  </div>
              ))}

         </div>


        </div>
    </div>
  )
}

export default ProfileStats