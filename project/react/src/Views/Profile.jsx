import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'
import { useParams } from 'react-router-dom'


function Profile() {
  const {user,count}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [userProfile,setUser]=useState({})
  const {id}=useParams()
  
  const {setMove,setToggle}=useStateContext()
  
  const handleEdit=(e)=>{
    setToggle(true)
    setMove(e.target.dataset.action)
  }
 const removeForm=()=>{
   setToggle(false)
    setMove(null)
 }
  useEffect(()=>{
    Promise.all([
    axiosClient.get(`/userprofile/${id}`),
    axiosClient.get(`/userposts/${id}`),
    axiosClient.get(`/likedposts/${id}`)
  ]).then(([userRes,postsRes, likedRes]) => { 
    setUser({...userRes.data.data.user,follow: userRes.data.data.following.includes(Number(id))})
    setPosts(postsRes.data.data.data)
    setLikedPosts(likedRes.data.data)
  });
  removeForm()
  },[id,count])

  const follow=()=>{
     setUser({...userProfile,follow:!userProfile.follow}) 
     axiosClient.post(`/follower/${Number(id)}`)
   }



  return (
    <div className='userProfile container'>

       <div className='profileCon'>
        {userProfile.pPicture==='847969.png' ?
           <img src='/assets/847969.png'/> :
           <img className='profilePic' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${userProfile.pPicture}`}/>
        }
  
         <div className='profileInfo'>

            <div className='profileName'>{userProfile.name}</div>

            {Number(id)===user.id ? 
            <div className='btns'>
                <button data-action='edit' onClick={handleEdit}>Edit</button>
                <button data-action='post' onClick={handleEdit}>Post</button>
            </div>
            :
            (userProfile.follow ?  
            <div className='btns'>
                <button onClick={follow}>Following</button>
            </div>:
            <div className='btns'>
                <button onClick={follow}>Follow</button>
            </div>
            )
        
            
           
            }
            <div className='activity'>
                <p><span>0</span> posts</p>
                <p style={{cursor:'pointer'}} onClick={handleEdit} data-action='followers'><span>{userProfile.follower}</span> Followers</p>
                <p style={{cursor:'pointer'}} onClick={handleEdit} data-action='following'><span>{userProfile.nbfollowing}</span> Following</p>
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