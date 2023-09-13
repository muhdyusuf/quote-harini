import { useAuth } from '@/Context/authContext'
import Navbar from '@/components/Navbar'
import { FC } from 'react'
import {Outlet,Navigate,useLocation} from 'react-router-dom'


interface GuestProps {
  
}

const Guest: FC<GuestProps> = ({}) => {
    const {currentUser}=useAuth()
    const location=useLocation()
    const { from } = location.state || { from: { pathname: '/' }}
    

  return !currentUser?(
    <div
        className='min-w-screen min-h-screen grid place-content-center'
    >
        <Outlet/>
    </div>
  ):(
    <div
        className='min-w-screen min-h-screen'
    >
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Guest