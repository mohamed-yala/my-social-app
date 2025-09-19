import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import '../Styles/Chat.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import Message from './Message'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import EmojiPicker from "emoji-picker-react";

function Chat() {
   const {id}=useParams()
  
   const [chatInfo,setChatInfo]=useState({})
   const [messages,setMessages]=useState([])
   const [message,setMessage]=useState("")
   const [emoji,setEmoji]=useState(false)
   const {user,newMessage,setLoading,setToggleMenu}=useStateContext();
   const chatContainer=useRef(null)
    const [users,setUsers]=useState([])
   
    const [isWide, setIsWide] = useState(window.innerWidth);
   
     useEffect(() => {
       const handleResize = () => {
         setIsWide(window.innerWidth);
       };
   
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);

    
     const cursor=useRef(null)
  let latestCursor=cursor.current

  const fetchMore=()=>{
  if(cursor.current!==latestCursor){
    
      latestCursor=cursor.current

   
        
    
      axiosClient.get(`/userConver/${id}`,{params:{cursor:cursor.current}})
      .then(({data})=>{
     
    
        setMessages(prev=>[...prev,...data.data.messages.data])
        cursor.current=data.data.messages.next_cursor
       
      
       
       })
   


 }
  }
 



   useEffect(()=>{

    const el=chatContainer.current
     const handleScroll=()=>{
     
      if(el.scrollTop===0 && cursor.current){
      
      fetchMore()
     }
    }
    
    el.addEventListener('scroll',handleScroll)


      setLoading(true)
     
   
    
      axiosClient.get(`/userConver/${id}`)
      .then(({data})=>{
        setChatInfo(data.data.friend)
        setMessages(prev=>data.data.messages.data)
        cursor.current=data.data.messages.next_cursor  
   
        setLoading(false)
       })
   
            
    return ()=>{
    el.removeEventListener('scroll',handleScroll)
  }

   },[id])

   const sendMessage=(e)=>{
    
        e.preventDefault()
         
         setMessages(prev=>[{message:message,sender:{id:user.id,name:user.name}},...prev])
         

        if(message.trim() === ""){
          return
        } 
        
        const formData=new FormData()
        formData.append('message',message)
        setMessage('')
      
           formData.append('receiver_id',id)
       
        formData.append('attachments', [])
       
        
        axiosClient.post('/message',formData)
       
      
      
   }


   useEffect(()=>{
    
    if(newMessage && user.id!==newMessage.message.sender_id ){
   
      setMessages(prev=>[newMessage.message,...prev])
    }
    
   },[newMessage])

  
 useEffect(() => {
    chatContainer.current?.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: 'auto' 
    });
    
}, [messages]);


 let latestQuery = '';

const searchUsers = (e) => {
  const query = e.target.value;
  latestQuery = query;

  if (query.length >= 1) {
    axiosClient.post('/search', { search: query })
      .then(({ data }) => {
        if (query === latestQuery) {
          setUsers(data.data);
        }
      });
  } else {
    setUsers([]);
  }
};

  return (
    <div className='chat'>

           <div className='searchRe chatSearch'>
                 <div className='elemCon'>
               {isWide<850 && <FontAwesomeIcon onClick={()=>setToggleMenu(true)} className='bars' icon={faBars}/> }
               <input  onInput={searchUsers} placeholder='search'/>
               </div>
               {
                     users.map((elem)=>(
                  <div key={elem.id} className='userAcc bc'>
                   {elem.ppicture==='847969.png' ?
                     <img onClick={()=>visitProfile(elem)} className='profile-img' src='/assets/847969.png'/> :
                     <img onClick={()=>visitProfile(elem)} className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${elem.ppicture}`}/> 
                  }
                     
                     <p onClick={()=>visitProfile(elem)}>{elem.name}</p>
                   </div>
                ))
             }
              
                </div>

       <div className='chatLyout'>
          <div className='userAcc chatUser'>
          <Link className='link' to={`/Profile/${chatInfo.id}`}>
          {   chatInfo.ppicture==='847969.png' ?
            <img className='profile-img' src='/assets/847969.png'/> :
            <img className='profile-img'  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${chatInfo.ppicture}`}/>  }
          </Link>
          <Link className='link' to={`/Profile/${chatInfo.id}`}>
            <p>{chatInfo.name}</p>
          </Link>
        </div>

        <div ref={chatContainer} className='messagesUser'>
         
         {messages.slice().reverse().map((elem,index)=>(
             <Message key={index} text={elem.message} right={user.id===elem.sender.id} img={elem.sender.ppicture}/> 
         ))}
         {emoji ?
         <div className='emojiesCon'>
          <EmojiPicker width={300} height={400} onEmojiClick={(ev)=>setMessage(prev=>prev+ev.emoji)}/>
         </div> :
            <>

            </>
         }
         
        </div>
           
        <form onSubmit={sendMessage}> 
        <FontAwesomeIcon onClick={()=>setEmoji(prev=>!prev)} className='emoji' icon={faFaceSmile}/>
        <input value={message} onChange={(e)=>setMessage(e.target.value)}  type="text" placeholder='Message' />
        <FontAwesomeIcon onClick={sendMessage} className='send' icon={faPaperPlane}/>
        </form>

       </div>
    </div>
  )
}

export default Chat