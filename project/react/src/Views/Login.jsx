import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

function Login() {

   const {setToken,setUser}=useStateContext()
  
  const email=useRef()
  const password=useRef()
   
  const handleSubmit=(ev)=>{
    ev.preventDefault()
    const payload={
      email:email.current.value,
      password:password.current.value
    }
    
    axiosClient.post('/login',payload)
    .then(({data})=>{
      setUser(data.data.user)
      setToken(data.data.token)
      console.log(data.data.user)
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
  }
  return (
    <form onSubmit={handleSubmit} className='auth-form'>
        <h1>Sign in</h1> 
        <input ref={email} placeholder='Email' />
        <input ref={password} placeholder='Password'/>
        <button>Sign in</button>
        <p>Don't have an account?<Link to='/signup' className='link-clean'>Sign Up now</Link></p>
    </form>
  )
}

export default Login