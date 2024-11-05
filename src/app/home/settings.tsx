import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";


const Settings: React.FC = () => {
  return (
    <div className='flex items-center space-x-1 '>
        
          <IoSettingsOutline color='black' className='h-20 w-6'/>
        <button className={`text-clockground text-lg text-black `}>Settings</button>
    </div>
  )
}

export default Settings