import React, { createContext, use, useContext, useState } from 'react'


const stateContext=createContext({
    user: null,
    token: null,
    toggle:false,
    move:null,
    post_id:null,
    nbCmnts:null,
    setUser: ()=>{},
    setToken: ()=>{},
    setToggle:()=>{},
    setMove:()=>{},
    setPostId:()=>{},
    setNbCmnts:()=>{},
    
})

function ContextProvider({children}) {
    const [user,_setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'))
    const [toggle,setToggle]=useState(false)
    const [move,_setMove]=useState(localStorage.getItem('move'))
    const [post_id,setPostId]=useState(null)
    const [nbCmnts,setNbCmnts]=useState(null)


  

                               
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
    
    

  
  
  return (
    <stateContext.Provider value={{user,token,toggle,move,post_id,nbCmnts,setUser,setToken,setToggle,setMove,setPostId,setNbCmnts}}>
       {children}
    </stateContext.Provider>
  )
}

export const useStateContext=()=>useContext(stateContext)

export default ContextProvider