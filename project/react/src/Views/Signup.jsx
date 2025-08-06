import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import '../index.css'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

function Signup() {

   const {setUser,setToken}=useStateContext()

  const name=useRef()
  const email=useRef()
  const Password=useRef()
  const PasswordConfirmation=useRef()

  const handleSubmit=(ev)=>{
    ev.preventDefault()
    const payload={
      name:name.current.value,
      email:email.current.value,
      password:Password.current.value,
      password_confirmation:PasswordConfirmation.current.value
    }

    axiosClient.post('/signup',payload)
    .then(({data})=>{
      setUser(data.data.user)
      setToken(data.data.token)
     
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
  }

  return (
     <form onSubmit={handleSubmit} className='auth-form'>
        <h1>Sign up</h1>
        <input ref={name} placeholder='Name' />
        <input ref={email} placeholder='Email' />
        <input ref={Password} type='password' placeholder='Password'/>
        <input ref={PasswordConfirmation} type='password' placeholder='Password Confirmation'/>
        <button>Sign in</button>
        <p>Already have an account?<Link className='link-clean' to='/login'>Login now</Link></p>
    </form>
  )
}

export default Signup