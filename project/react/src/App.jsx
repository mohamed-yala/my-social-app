import { useState } from 'react'
import Post from './Views/Post'



function App() {
 

  return (
    <div className='app container'>
      <input placeholder='search'/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default App
