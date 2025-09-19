import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from './components/GuestLayout'
import DefaultLayout from './components/DefaultLayout'
import Login from './Views/Login'
import Signup from './Views/Signup'
import App from './App'
import Profile from './Views/Profile'
<<<<<<< HEAD
import Chat from './Views/chat'
=======
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46

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
<<<<<<< HEAD
            element:<Profile/>,
        },
        {
            path: '/Chat/:id',
            element:<Chat/>
        },
       
=======
            element:<Profile/>
        }
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    ]
   }

])

export default router;