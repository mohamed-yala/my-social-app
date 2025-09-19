import { use, useEffect, useRef, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'
import { useStateContext } from './contexts/ContextProvider'
import { useNavigate} from 'react-router-dom'
import echo from './echo.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'


function App() {

  const {user,count,setToggleMenu,toggleMenu}=useStateContext()
  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const container=useRef()
  const [users,setUsers]=useState([])
  
  
  const cursor=useRef(null)
  let latestCursor=cursor.current

  const fetchMore=()=>{
  if(cursor.current!==latestCursor){
      latestCursor=cursor.current
    axiosClient.get('/homePosts',{
      params:{cursor:cursor.current}
    })
  .then((postsRes) => {
    cursor.current=postsRes.data.data.next_cursor
    setPosts(prevPosts=>[...prevPosts,...postsRes.data.data.data])  
  })
}
    

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
      if(el.scrollHeight<=el.scrollTop+el.clientHeight+1 && cursor.current){
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

    const [isWide, setIsWide] = useState(window.innerWidth);
   
     useEffect(() => {
       const handleResize = () => {
         setIsWide(window.innerWidth);
       };
   
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);
 
  return (
     
      

    <div ref={container} className='app container'>
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

      {posts.map((elem)=>(
        <Post visitProfile={visitProfile} key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false} />
       
      ))}
    </div>
    
  )
}

export default App
