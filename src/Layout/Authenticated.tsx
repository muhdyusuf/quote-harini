import { useAuth } from '@/Context/authContext'
import Navbar from '@/components/Navbar'
import { FC } from 'react'
import {Outlet,Navigate,useLocation} from 'react-router-dom'


interface AuthenticatedProps {
  
}

const Authenticated: FC<AuthenticatedProps> = ({}) => {
    const {currentUser}=useAuth()
    const location=useLocation()
    

  return currentUser?(
    <div
        className='min-w-screen min-h-screen'
    >
        <Navbar/>
        <Outlet/>
    </div>
  ):(
    <Navigate to={"/login"} state={{from:location.pathname}}/>
  )
}

export default Authenticated