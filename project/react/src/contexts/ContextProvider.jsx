import React, { createContext, useContext, useState } from 'react'

const stateContext=createContext({
    user: null,
    token: null,
    setUser: ()=>{},
    setToken: ()=>{}
})

function ContextProvider({children}) {
    const [user,_setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'))
                               
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

  return (
    <stateContext.Provider value={{user,token,setUser,setToken}}>
       {children}
    </stateContext.Provider>
  )
}

export const useStateContext=()=>useContext(stateContext)

export default ContextProvider