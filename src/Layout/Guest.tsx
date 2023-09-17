import { useAuth } from '@/Context/authContext'
import Navbar from '@/components/Navbar'
import { FC } from 'react'
import {Outlet} from 'react-router-dom'


interface GuestProps {
  
}

const Guest: FC<GuestProps> = ({}) => {
    const {currentUser}=useAuth()
    

  return (
    <div
        className='min-w-screen min-h-screen'
    >
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Guest