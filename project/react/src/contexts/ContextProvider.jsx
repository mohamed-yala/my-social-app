import React, { createContext, use, useContext, useMemo, useState } from 'react'


const stateContext=createContext({
    user: null,
    token: null,
    toggle:false,
    move:null,
    post_id:null,
    nbCmnts:null,
    count:null,
    loading:false,
    showErr:false,
    newMessage:"",
    Err:[],
    toggleMenu:false,
    setUser: ()=>{},
    setToken: ()=>{},
    setToggle:()=>{},
    setMove:()=>{},
    setPostId:()=>{},
    setNbCmnts:()=>{},
    setCount:()=>{},
    setLoading:()=>{},
    setShowErr:()=>{},
    setErr:()=>{},
    setNewMessage:()=>{},
    setToggleMenu:()=>{}

    
})

function ContextProvider({children}) {
    const [user,_setUser]=useState(JSON.parse(sessionStorage.getItem('user')))
    const [token,_setToken]=useState(sessionStorage.getItem('ACCESS_TOKEN'))
    const [toggle,setToggle]=useState(false)
    const [move,_setMove]=useState(sessionStorage.getItem('move'))
    const [post_id,setPostId]=useState(null)
    const [nbCmnts,setNbCmnts]=useState(null)
    const [count,setCount]=useState(false)
    const [loading,setLoading]=useState(false)
    const [showErr,setShowErr]=useState(false)
    const [Err,setErr]=useState([])
    const [newMessage,setNewMessage]=useState(null)
    const [toggleMenu,setToggleMenu]=useState(false)
    
    
  

                               
    const setToken=(token)=>{
        _setToken(token)
        if(token){
            sessionStorage.setItem('ACCESS_TOKEN',token)
        }else{
            sessionStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setUser=(user)=>{
    
      _setUser(user)
      if(user){
        sessionStorage.setItem('user',JSON.stringify(user))
      }else{
        sessionStorage.removeItem('user')
      }
    }

    const setMove=(elem)=>{
      _setMove(elem)
       if(elem){
        sessionStorage.setItem('move',elem)
      }else{
        sessionStorage.removeItem('move')
      }
    }
    
     const contextValue = useMemo(() => ({
    user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,newMessage,toggleMenu,
    setUser, setToken, setToggle, setMove, setPostId, setNbCmnts, setCount, setLoading,setShowErr,setErr,setNewMessage,setToggleMenu,
  }), [user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,newMessage,toggleMenu]);


  
  
  return (
    <stateContext.Provider value={contextValue}>
       {children}
    </stateContext.Provider>
  )
}

export const useStateContext=()=>useContext(stateContext)

export default ContextProvider