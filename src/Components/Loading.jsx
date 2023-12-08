import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { MoonLoader } from 'react-spinners';

function Loading() {
  const {loading} = useContext(AuthContext)
  return (
    <div className='bg-slate-50 min-w-full min-h-screen flex justify-center items-center'>
        <MoonLoader color='#15803d' loading={loading}/>
    </div>
    
  )
}

export default Loading