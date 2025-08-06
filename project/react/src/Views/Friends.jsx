import React from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Friends() {
  return (
    <div className='friends'>

        <p className='friend-title'>
            Suggested for you
        </p>

        <div className='suggestions'>
         <div className='userAcc'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
            <button className='btnn'>
               <span class="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
               <span class="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
             </button>
         
        </div>
        
        <div className='suggestions'>
         <div className='userAcc'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
            <button className='btnn'>
               <span class="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
               <span class="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
             </button>
         
        </div>
        
        <div className='suggestions'>
         <div className='userAcc'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
            <button className='btnn'>
               <span class="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
               <span class="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
             </button>
         
        </div>
        
        <div className='suggestions'>
         <div className='userAcc'>
            <img className='profile-img' src='/assets/847969.png'/> 
            <p>Mohamed Yala</p>
         </div>
            <button className='btnn'>
               <span class="span-mother">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
               <span class="span-mother2">
                 <span>F</span>
                 <span>o</span>
                 <span>l</span>
                 <span>l</span>
                 <span>o</span>
                 <span>w</span>
               </span>
             </button>
         
        </div>
        <div className='more'>
            <FontAwesomeIcon className='icon' icon={faCaretDown}/>
            <p>More</p>
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