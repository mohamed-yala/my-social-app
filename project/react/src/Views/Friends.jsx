import React, { useEffect, useState } from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client'

import { useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate} from 'react-router-dom'

import echo from '../echo'


    




function Friends() {
    const [users,setUsers]=useState([])
  const [showMore,setShowMore]=useState(true)
  const cursor=useRef(null)
  const firstUsers=useRef([])
 const firstCursor=useRef(null)
  const [onlineUsers,setOnlineUsers]=useState({})
  const [localConversations,setLocalConversations]=useState([])
  const {user,setNewMessage,setErr,setShowErr}=useStateContext()
  

  useEffect(()=>{
    axiosClient.get('/conversations')
    .then(({data})=>{
      setLocalConversations(data.data)
     
    })
   
  },[])
   

  useEffect(()=>{
    
    echo.join("online")
    .here((users)=>{
      const onlineUserObj=Object.fromEntries(users.map((user)=>[user.id,user]))
      setOnlineUsers((prevOnlineUsers)=>{
        return {...prevOnlineUsers,...onlineUserObj}
      })
    })
    .joining((user)=>{
      setOnlineUsers((prevOnlineUsers)=>{
        const updatedUsers={...prevOnlineUsers}
        updatedUsers[user.id]=user
       
        return updatedUsers
      })
    })
    .leaving((user)=>{
      setOnlineUsers((prevOnlineUsers)=>{
        const updatedUsers={...prevOnlineUsers}
        delete updatedUsers[user.id]
        return updatedUsers
      })
    })
    .error((error)=>{
      console.error("error",error)
    })
    return ()=>{
      echo.leave('online')
      
    }
   
   },[])

   useEffect(()=>{
    localConversations.forEach((conversation)=>{
      //  let channel=`message.group.${conversation.id}`
      //  if(conversation.is_user){
      const  channel=`message.user.${[parseInt(user.id),parseInt(conversation.id)].sort((a,b)=>a-b).join("-")}`
      //  }
      echo.private(channel)
      .error((error)=>{
        console.error(error)
      }).listen("SocketMessage",(e)=>{
        
       
         setNewMessage(e)
         
         if(e.message.sender_id===user.id){
          return
         }
      })

    })
    return ()=>{
       
         localConversations.forEach((conversation)=>{
      //  let channel=`message.group.${conversation.id}`
      //  if(conversation.is_user){
      const  channel=`message.user.${[parseInt(user.id),parseInt(conversation.id)].sort((a,b)=>a-b).join("-")}`
      //  }
      echo.leave(channel)
    })

    }

   },[localConversations])
    

   useEffect(()=>{
    setShowErr(false)
    axiosClient.get('/users')
     .then(({data})=>{
       setUsers(data.data.data.map((elem)=>({...elem,follow:false})))
       firstUsers.current=data.data.data
       cursor.current=data.data.next_cursor
       firstCursor.current=cursor.current
     })
   },[])

      const navigate=useNavigate()
      const visitProfile=(elem)=>{
     return navigate(`Profile/${elem.id}`)
   }

   const addSuggestions=()=>{
   
     if(cursor.current===null && users.length<=4){
      
      setShowErr(false)
     
    
        setTimeout(() => {
      setErr({ message: ['no more users'] });
      setShowErr(true);
    }, 50);

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
 const goToChat=(user)=>{
    return navigate(`Chat/${user.id}`)
  }



  return (
    <div className='friends'>
       {window.innerWidth>1012 &&
       <>
        <p className='friend-title'>
            Suggested for you
        </p>


         {users.map((elem)=>(

         <div key={elem.id} className='suggestions'>
               <div className='userAcc'>
                {elem.ppicture==='847969.png' ?
                <img onClick={()=>visitProfile(elem)} className='profile-img' src='/assets/847969.png'/> :
                 <img onClick={()=>visitProfile(elem)} className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${elem.ppicture}`}/> 
                }  
                  <p onClick={()=>visitProfile(elem)}>{elem.name}</p>
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
        </>}   
         <p className='friend-title'>
            Friends
        </p>

        
       
        <div className='userFr'>
       
        {
          localConversations.map((user,index)=>(
            <div onClick={()=>goToChat(user)} key={index}  className='userAcc boton-elegante fr'>
            <div className='profile-img'>
             { onlineUsers[user.id] && user.is_user ? <div className='onlineUser'></div>:<></>}
              
                {user.ppicture==='847969.png' ?
           <img src='/assets/847969.png'/> :
           <img className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${user.ppicture}`}/>
        }
              
            </div>
            <p>{user.name}</p>
            </div>
          ))
        }
         
        
        </div>

        
       
    </div>
  )
}

export default Friends