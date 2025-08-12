import { use, useEffect, useRef, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'



function App() {

  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const container=useRef()
  
  const cursor=useRef(null)

  const fetchMore=()=>{
    
    Promise.all([
    axiosClient.get('/homePosts',{
      params:{cursor:cursor.current}
    }),
    axiosClient.get('/likedPosts')
  ]).then(([postsRes, likedRes]) => {
  
    cursor.current=postsRes.data.data.next_cursor
    setPosts(prevPosts=>[...prevPosts,...postsRes.data.data.data])
    setLikedPosts(likedRes.data.data);
    
  })
  }
 
  

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
    axiosClient.get('/likedPosts')
  ]).then(([postsRes, likedRes]) => {
   
    setPosts(postsRes.data.data.data);
    cursor.current=postsRes.data.data.next_cursor
    setLikedPosts(likedRes.data.data);
  });
    
  return ()=>{
    el.removeEventListener('scroll',handleScroll)
  }
  },[])

  return (
    <div ref={container} className='app container'>
      <input placeholder='search'/>
      {posts.map((elem)=>(
        <Post key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false} />
       
      ))}
    </div>
  )
}

export default App
