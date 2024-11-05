import React from 'react'
import { CgProfile } from "react-icons/cg";

const Profile: React.FC = () => {
  return (
    <div className='flex items-center space-x-1'>
        <CgProfile className='h-6 w-7' color='black'/>
        <button className='text-clockground text-lg'>Profile</button>
    </div>
  )
}

export default Profile