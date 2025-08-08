import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'


function Profile() {

  const [posts,setPosts]=useState([])

  const {user,setMove,setToggle}=useStateContext()
  const handleEdit=(e)=>{
    setToggle(true)
    setMove(e.target.dataset.action)
  }

  useEffect(()=>{
    axiosClient.get('/userPost')
    .then(({data})=>{
     setPosts(data.data)
     
    
    })
  },[])

  return (
    <div className='userProfile container'>

       <div className='profileCon'>
         <img src='/assets/847969.png'></img>

         <div className='profileInfo'>

            <div className='profileName'>{user.name}</div>
            
            <div className='btns'>
                <button>Edit</button>
                <button data-action='post' onClick={handleEdit}>Post</button>
            </div>

            <div className='activity'>
                <p><span>0</span> posts</p>
                <p><span>0</span> Followers</p>
                <p><span>0</span> Following</p>
            </div>

            <div className='bio'>
                flowers without rain and men without pain never grow 
            </div>

         <form>
                <label className="radio-container">Public
                 <input type="radio" name="choice" />
                 <span class="checkmark"></span>
              </label>

              <label className="radio-container">Private
                  <input type="radio" name="choice"/>
                  <span class="checkmark"></span>
             </label>
        </form>



         </div>

       </div>
      {posts.map((elem)=>(
        <Post key={elem.id} description={elem.description} image={elem.picture}/>
      ))}
        
    </div>
  )
}

export default Profile