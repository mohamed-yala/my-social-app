import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'
import { useParams } from 'react-router-dom'


function Profile() {
  const {user}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [userProfile,setUser]=useState({})
  const {id}=useParams()
  
  const {setMove,setToggle}=useStateContext()
  
  const handleEdit=(e)=>{
    setToggle(true)
    setMove(e.target.dataset.action)
  }

  useEffect(()=>{
    Promise.all([
    axiosClient.get(`/userprofile/${id}`),
    axiosClient.get(`/userposts/${id}`),
    axiosClient.get(`/likedposts/${id}`)
  ]).then(([userRes,postsRes, likedRes]) => { 
    setUser(userRes.data.data)
    setPosts(postsRes.data.data.data)
    setLikedPosts(likedRes.data.data)
  });
  },[id])

  return (
    <div className='userProfile container'>

       <div className='profileCon'>
         <img src='/assets/847969.png'></img>

         <div className='profileInfo'>

            <div className='profileName'>{userProfile.name}</div>

            {Number(id)===user.id ? 
            <div className='btns'>
                <button data-action='edit' onClick={handleEdit}>Edit</button>
                <button data-action='post' onClick={handleEdit}>Post</button>
            </div>
            :

            <div className='btns'>
                <button>Follow</button>
            </div>
            }
            <div className='activity'>
                <p><span>0</span> posts</p>
                <p><span>{userProfile.follower}</span> Followers</p>
                <p><span>{userProfile.nbfollowing}</span> Following</p>
            </div>

            <div className='bio'>
                {userProfile.bio}
            </div>


         </div>

       </div>
      {posts.map((elem)=>(
        <Post key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false}/>
      ))}
        
    </div>
  )
}

export default Profile