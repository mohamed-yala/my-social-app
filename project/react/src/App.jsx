import { useEffect, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'



function App() {

  const [posts,setPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])

 
  useEffect(()=>{
    axiosClient.get('/homePosts')
    .then(({data})=>{
      setPosts(data.data)
    })
    axiosClient.get(`/likedPosts`)
    .then(({data})=>{
     setLikedPosts(data.data)
    })
  },[])

  return (
    <div className='app container'>
      <input placeholder='search'/>
      {posts.map((elem)=>(
        <Post key={elem.id} post={elem} likedPosts={likedPosts}/>
      ))}
    </div>
  )
}

export default App
