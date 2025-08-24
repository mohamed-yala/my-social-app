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
    Err:[],
    setUser: ()=>{},
    setToken: ()=>{},
    setToggle:()=>{},
    setMove:()=>{},
    setPostId:()=>{},
    setNbCmnts:()=>{},
    setCount:()=>{},
    setLoading:()=>{},
    setShowErr:()=>{},
    setErr:()=>{}

    
})

function ContextProvider({children}) {
    const [user,_setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'))
    const [toggle,setToggle]=useState(false)
    const [move,_setMove]=useState(localStorage.getItem('move'))
    const [post_id,setPostId]=useState(null)
    const [nbCmnts,setNbCmnts]=useState(null)
    const [count,setCount]=useState(false)
    const [loading,setLoading]=useState(false)
    const [showErr,setShowErr]=useState(false)
    const [Err,setErr]=useState([])
    
    
  

                               
    const setToken=(token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setUser=(user)=>{
    
      _setUser(user)
      if(user){
        localStorage.setItem('user',JSON.stringify(user))
      }else{
        localStorage.removeItem('user')
      }
    }

    const setMove=(elem)=>{
      _setMove(elem)
       if(elem){
        localStorage.setItem('move',elem)
      }else{
        localStorage.removeItem('move')
      }
    }
    
     const contextValue = useMemo(() => ({
    user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,
    setUser, setToken, setToggle, setMove, setPostId, setNbCmnts, setCount, setLoading,setShowErr,setErr
  }), [user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err]);


  
  
  return (
    <stateContext.Provider value={contextValue}>
       {children}
    </stateContext.Provider>
  )
}

export const useStateContext=()=>useContext(stateContext)

export default ContextProvider