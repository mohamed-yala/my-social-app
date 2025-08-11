import { use, useEffect, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'



function App() {

  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const [scroll,setScroll]=useState(window.scrollY)

 
  useEffect(()=>{
    
    const handleScroll=()=>{
      setScroll(window.scrollY)
      console.log(window.scrollY)
    }
    window.addEventListener('scroll',handleScroll)

   Promise.all([
    axiosClient.get('/homePosts'),
    axiosClient.get('/likedPosts')
  ]).then(([postsRes, likedRes]) => {
    
    setPosts(postsRes.data.data.data);
    console.log(postsRes.data.data.data)
    setLikedPosts(likedRes.data.data);
  });

  return ()=>{
    window.removeEventListener('scroll',handleScroll)
  }
  },[])

  return (
    <div className='app container'>
      <input placeholder='search'/>
      {posts.map((elem)=>(
        <Post key={elem.id} post={elem} liked={likedPosts.includes(elem.id)? true:false} />
       
      ))}
    </div>
  )
}

export default App
