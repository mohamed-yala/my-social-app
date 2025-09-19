import React from 'react'
import '../index.css'
import '../Styles/Message.css'

function Message({right,text,img}) {
  return (
    <div className={`messageCon ${right?'right':''}`}>
        {right ? <></>: 
        <img className='chat-img'  src={img==='847969.png' ? '/assets/847969.png': `${import.meta.env.VITE_API_BASE_URL}/storage/${img}` }/>
        }

        {right ?  <div  className={`msg ${right ? 'right-color':''}`}>{text}</div>: 
         
          
          <>  <div  className={`msg ${right ? 'right-color':''}`}>{text}</div></>
         
        }
      
    </div>
  )
}

export default Message