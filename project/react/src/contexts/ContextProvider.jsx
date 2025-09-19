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
<<<<<<< HEAD
    newMessage:"",
    Err:[],
    toggleMenu:false,
=======
    Err:[],
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    setUser: ()=>{},
    setToken: ()=>{},
    setToggle:()=>{},
    setMove:()=>{},
    setPostId:()=>{},
    setNbCmnts:()=>{},
    setCount:()=>{},
    setLoading:()=>{},
    setShowErr:()=>{},
<<<<<<< HEAD
    setErr:()=>{},
    setNewMessage:()=>{},
    setToggleMenu:()=>{}
=======
    setErr:()=>{}
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

    
})

function ContextProvider({children}) {
<<<<<<< HEAD
    const [user,_setUser]=useState(JSON.parse(sessionStorage.getItem('user')))
    const [token,_setToken]=useState(sessionStorage.getItem('ACCESS_TOKEN'))
    const [toggle,setToggle]=useState(false)
    const [move,_setMove]=useState(sessionStorage.getItem('move'))
=======
    const [user,_setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'))
    const [toggle,setToggle]=useState(false)
    const [move,_setMove]=useState(localStorage.getItem('move'))
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    const [post_id,setPostId]=useState(null)
    const [nbCmnts,setNbCmnts]=useState(null)
    const [count,setCount]=useState(false)
    const [loading,setLoading]=useState(false)
    const [showErr,setShowErr]=useState(false)
    const [Err,setErr]=useState([])
<<<<<<< HEAD
    const [newMessage,setNewMessage]=useState(null)
    const [toggleMenu,setToggleMenu]=useState(false)
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    
    
  

                               
    const setToken=(token)=>{
        _setToken(token)
        if(token){
<<<<<<< HEAD
            sessionStorage.setItem('ACCESS_TOKEN',token)
        }else{
            sessionStorage.removeItem('ACCESS_TOKEN')
=======
            localStorage.setItem('ACCESS_TOKEN',token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
        }
    }

    const setUser=(user)=>{
    
      _setUser(user)
      if(user){
<<<<<<< HEAD
        sessionStorage.setItem('user',JSON.stringify(user))
      }else{
        sessionStorage.removeItem('user')
=======
        localStorage.setItem('user',JSON.stringify(user))
      }else{
        localStorage.removeItem('user')
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
      }
    }

    const setMove=(elem)=>{
      _setMove(elem)
       if(elem){
<<<<<<< HEAD
        sessionStorage.setItem('move',elem)
      }else{
        sessionStorage.removeItem('move')
=======
        localStorage.setItem('move',elem)
      }else{
        localStorage.removeItem('move')
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
      }
    }
    
     const contextValue = useMemo(() => ({
<<<<<<< HEAD
    user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,newMessage,toggleMenu,
    setUser, setToken, setToggle, setMove, setPostId, setNbCmnts, setCount, setLoading,setShowErr,setErr,setNewMessage,setToggleMenu,
  }), [user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,newMessage,toggleMenu]);
=======
    user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err,
    setUser, setToken, setToggle, setMove, setPostId, setNbCmnts, setCount, setLoading,setShowErr,setErr
  }), [user, token, toggle, move, post_id, nbCmnts, count, loading,showErr,Err]);
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46


  
  
  return (
    <stateContext.Provider value={contextValue}>
       {children}
    </stateContext.Provider>
  )
}

export const useStateContext=()=>useContext(stateContext)

export default ContextProvider