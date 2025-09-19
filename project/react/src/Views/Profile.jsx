import React, { useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { useStateContext } from '../contexts/ContextProvider'
import Post from './Post'
import axiosClient from '../axios-client'
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import '../index.css'



function Profile() {
  const {user,count,setLoading,setMove,setToggle,setCount,setToggleMenu}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [userProfile,setUserProfile]=useState({})
  const [nbPosts,setNbPosts]=useState(0)
  const {id}=useParams()
   const [users,setUsers]=useState([])
  
  
    const [isWide, setIsWide] = useState(window.innerWidth);
   
     useEffect(() => {
       const handleResize = () => {
         setIsWide(window.innerWidth);
       };
   
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);
=======
import { useParams } from 'react-router-dom'
import Loading from './Loading'


function Profile() {
  const {user,count,loading,setLoading,setMove,setToggle,setCount}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [userProfile,setUserProfile]=useState({})
  const {id}=useParams()
  
  
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

  
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
<<<<<<< HEAD
    axiosClient.get(`/likedposts/${user.id}`),
    axiosClient.get(`/nbPost/${id}`)
   
  ]).then((result) => { 
    const [userRes,postsRes, likedRes,nbRes]=result
   if(userRes.status==='fulfilled'){
    setUserProfile({...userRes.value.data.data.user,follow: userRes.value.data.data.following.includes(Number(id))})
    
   }
   if(nbRes.status==='fulfilled'){
    setNbPosts(nbRes.value.data.data)
=======
    axiosClient.get(`/likedposts/${user.id}`)
  ]).then((result) => { 
    const [userRes,postsRes, likedRes]=result
   if(userRes.status==='fulfilled'){
    setUserProfile({...userRes.value.data.data.user,follow: userRes.value.data.data.following.includes(Number(id))})
  
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
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
  
<<<<<<< HEAD
  },[id,count,user])
=======
  },[id,count])
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

  const follow=()=>{
     setUserProfile({...userProfile,follow:!userProfile.follow}) 
     axiosClient.post(`/follower/${Number(id)}`)
     setCount(prev=>!prev)
   }
<<<<<<< HEAD
  const navigate=useNavigate()
  const goToChat=(user)=>{
    return navigate(`/Chat/${user.id}`)
  }

  
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
    <div className='userProfile container'>
           
      <div className='searchRe'>
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



       <div className='profileCon'>

      
        {userProfile.ppicture==='847969.png' ?
           <img src='/assets/847969.png'/> :
           <img className='profilePic' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${userProfile.ppicture}`}/>
        }
    

=======



  return (
    <div className='userProfile container'>

       <div className='profileCon'>
        {userProfile.ppicture==='847969.png' ?
           <img src='/assets/847969.png'/> :
           <img className='profilePic' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${userProfile.pPicture}`}/>
        }
  
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
         <div className='profileInfo'>

            <div className='profileName'>{userProfile.name}</div>

            {Number(id)===user.id ? 
            <div className='btns'>
                <button data-action='edit' onClick={handleEdit}>Edit</button>
                <button data-action='post' onClick={handleEdit}>Post</button>
            </div>
            :
<<<<<<< HEAD
            
            (userProfile.follow ?  
            <div className='btns'>
                <button onClick={follow}>Following</button>
                <button onClick={()=>goToChat(userProfile)}>Message</button>
            </div>:
            <div className='btns'>
                <button onClick={follow}>Follow</button>
                 <button onClick={()=>goToChat(userProfile)}>Message</button>
            </div>
            )

            }

            <div className='activity'>
                <p><span>{nbPosts}</span> posts</p>
=======
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
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
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