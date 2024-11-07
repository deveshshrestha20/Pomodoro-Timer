import React from 'react'
import { FcTodoList } from "react-icons/fc";


const Tasks:React.FC = () => {
  return (
<div className='h-14 w-[30rem] bg-clockground flex items-center justify-center rounded-lg'>
    <div className='flex items-center  space-x-2'>
        <FcTodoList className='h-9 w-7' />
        <button className='text-background text-2xl text-center font-medium'>Tasks</button>
    </div>
    
</div>
  )
}

export default Tasks;