import { use, useEffect, useRef, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'
import { useStateContext } from './contexts/ContextProvider'
import { useNavigate} from 'react-router-dom'


function App() {

  const {user,count}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const container=useRef()
  const [users,setUsers]=useState([])
  
  const cursor=useRef(null)

  const fetchMore=()=>{
    
   
    axiosClient.get('/homePosts',{
      params:{cursor:cursor.current}
    })
  .then((postsRes) => {
    cursor.current=postsRes.data.data.next_cursor
    setPosts(prevPosts=>[...prevPosts,...postsRes.data.data.data])  
  })
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

  useEffect(()=>{

    const el=container.current
     const handleScroll=()=>{
      if(el.scrollHeight<=el.scrollTop+el.clientHeight+5 && cursor.current){
      fetchMore()
     }
    }
    
    el.addEventListener('scroll',handleScroll)

   Promise.all([
    axiosClient.get('/homePosts'),
    axiosClient.get(`/likedposts/${user.id}`)
  ]).then(([postsRes, likedRes]) => {
    setPosts(postsRes.data.data.data);
    cursor.current=postsRes.data.data.next_cursor
    setLikedPosts(likedRes.data.data);
  });
    
  return ()=>{
    el.removeEventListener('scroll',handleScroll)
  }
  },[count])

  
  
   const navigate =useNavigate()
      const visitProfile=(elem)=>{
     return navigate(`/Profile/${elem.id}`)
   }

  return (
     
      

    <div ref={container} className='app container'>
      <div className='searchRe'>
      <input   onInput={searchUsers} placeholder='search'/>
      {
            users.map((elem)=>(
         <div key={elem.id} className='userAcc bc'>
          {elem.ppicture==='847969.png' ?
            <img onClick={()=>visitProfile(elem)} className='profile-img' src='/assets/847969.png'/> :
            <img onClick={()=>visitProfile(elem)} className='profile-img' src={`${import.meta.env.VITE_API_BASE_URL}/storage/${elem.pPicture}`}/> 
         }
            
            <p onClick={()=>visitProfile(elem)}>{elem.name}</p>
          </div>
       ))
    }
     
       </div>

      {posts.map((elem)=>(
        <Post visitProfile={visitProfile} key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false} />
       
      ))}
    </div>
    
  )
}

export default App
