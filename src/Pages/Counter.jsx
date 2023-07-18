import React from 'react'
import {useLocation}from 'react-router-dom'

function Counter() {
  const location = useLocation();
  const data= location.state.currentTask;
  return (
    <div className='flex min-h-screen flex-col items-center bg-counterBackground bg-cover'>
      <div className=' flex items-center bg-white rounded-xl w-1/2  h-10   my-6'>
        <p className='text-xl font-bold text-left ml-4'>
          {data.title}<span className='opacity-50 text-lg'> is being done now..</span>
        </p>
        <div>
            
        </div>

      </div>
      
    </div>
  )
}

export default Counter