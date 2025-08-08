import { useEffect, useState } from 'react'
import Post from './Views/Post'
import axiosClient from './axios-client'



function App() {

  const [posts,setPosts]=useState([])

 
  useEffect(()=>{
    axiosClient.get('/homePosts')
    .then(({data})=>{
      setPosts(data.data)
    })
  },[])

  return (
    <div className='app container'>
      <input placeholder='search'/>
      {posts.map((elem)=>(
        <Post key={elem.id} description={elem.description} image={elem.picture} likes={elem.likes} cmnts={elem.comments}/>
      ))}
    </div>
  )
}

export default App
