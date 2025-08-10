import { useEffect, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'



function App() {

  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])

 
  useEffect(()=>{
   Promise.all([
    axiosClient.get('/homePosts'),
    axiosClient.get('/likedPosts')
  ]).then(([postsRes, likedRes]) => {
    
    setPosts(postsRes.data.data);
    setLikedPosts(likedRes.data.data);
  });
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
