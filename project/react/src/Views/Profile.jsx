import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'


function Profile() {
  
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])

  const {user,setMove,setToggle}=useStateContext()
  const handleEdit=(e)=>{
    setToggle(true)
    setMove(e.target.dataset.action)
  }

  useEffect(()=>{
    Promise.all([
    axiosClient.get('/userPost'),
    axiosClient.get('/likedPosts')
  ]).then(([postsRes, likedRes]) => {  
    setPosts(postsRes.data.data.data);
    console.log(postsRes.data.data.data)
    setLikedPosts(likedRes.data.data);
  });
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
        <Post key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false}/>
      ))}
        
    </div>
  )
}

export default Profile