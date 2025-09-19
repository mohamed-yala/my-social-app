import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from './components/GuestLayout'
import DefaultLayout from './components/DefaultLayout'
import Login from './Views/Login'
import Signup from './Views/Signup'
import App from './App'
import Profile from './Views/Profile'
import Chat from './Views/chat'

 const router=createBrowserRouter([
   {
    path:'/',
    element:<GuestLayout/>,
    children:[
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<Signup/>
        },
    ]
   },
   {
    path:'/',
    element:<DefaultLayout/>,
    children:[
        {
            path:'/Home',
            element:<App/>
        },
        {
            path:'/Profile/:id',
            element:<Profile/>,
        },
        {
            path: '/Chat/:id',
            element:<Chat/>
        },
       
    ]
   }

])

export default router;