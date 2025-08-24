import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'
import { useParams } from 'react-router-dom'
import Loading from './Loading'


function Profile() {
  const {user,count,loading,setLoading,setMove,setToggle,setCount}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [userProfile,setUserProfile]=useState({})
  const {id}=useParams()
  
  

  
  const handleEdit=(e)=>{
         if( Number(id)===user.id|| userProfile.visibility==='public' || userProfile.follow){
          setToggle(true)
          setMove(e.target.dataset.action)
          }
  }
 const removeForm=()=>{
   setToggle(false)
    setMove(null)
 }
  useEffect(()=>{
   
   setLoading(true)
   
    Promise.allSettled([
    axiosClient.get(`/userprofile/${id}`),
    axiosClient.get(`/userposts/${id}`),
    axiosClient.get(`/likedposts/${user.id}`)
  ]).then((result) => { 
    const [userRes,postsRes, likedRes]=result
   if(userRes.status==='fulfilled'){
    setUserProfile({...userRes.value.data.data.user,follow: userRes.value.data.data.following.includes(Number(id))})
  
   }
    
   
    if(postsRes.status==="fulfilled"){
    setPosts(postsRes.value.data.data.data)
    }else{
      setPosts([])
    }

    if(likedRes.status==="fulfilled"){
    setLikedPosts(likedRes.value.data.data)
    
  }
  
  
  }).finally(()=>{
    removeForm()
  setLoading(false)
   
  });
  
  },[id,count])

  const follow=()=>{
     setUserProfile({...userProfile,follow:!userProfile.follow}) 
     axiosClient.post(`/follower/${Number(id)}`)
     setCount(prev=>!prev)
   }



  return (
    <div className='userProfile container'>

       <div className='profileCon'>
        {userProfile.ppicture==='847969.png' ?
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
     
     { Number(id)===user.id|| userProfile.visibility==='public' || userProfile.follow? 

      posts.map((elem)=>(
        <Post key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false}/>
      ))
        : 
       <div className='privateAcnt'>private account</div> 
      }
     
    </div>
  )
}

export default Profile