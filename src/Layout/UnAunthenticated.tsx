import { useAuth } from '@/Context/authContext'
import Navbar from '@/components/Navbar'
import { FC } from 'react'
import {Outlet,Navigate,useLocation} from 'react-router-dom'


interface UnAuthenticatedProps {
  
}

const UnAuthenticated: FC<UnAuthenticatedProps> = ({}) => {
    const {currentUser}=useAuth()
    const location=useLocation()
    console.log(location.state)
    

  return !currentUser?(
    <Outlet/>
  ):(
    <Navigate to={"/"} />
  )
}

export default UnAuthenticated