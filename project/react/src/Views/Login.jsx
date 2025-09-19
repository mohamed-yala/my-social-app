import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

function Login() {

   const {setToken,setUser,setShowErr,setErr}=useStateContext()
   
  
  const email=useRef()
  const password=useRef()
   
  const handleSubmit=(ev)=>{
    ev.preventDefault()
    setShowErr(false)
    
    const payload={
      email:email.current.value,
      password:password.current.value
    }
    
    axiosClient.post('/login',payload)
    .then(({data})=>{
      setUser(data.data.user)
      setToken(data.data.token)
      
    })
    .catch((err)=>{
      
      if(err.response.status===401){
       setErr({message:[err.response.data.message]})
      }
      if(err.response.status===422){
       setErr(err.response.data.errors)
      }
      setShowErr(true)
     
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