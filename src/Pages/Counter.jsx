import React, { useEffect, useState } from 'react'
import {useLocation,useNavigate}from 'react-router-dom';

function Counter() {
  const location = useLocation();
  const data= location.state.currentTask;
  const navigate = useNavigate();
  const [time,setTime] = useState(1500);
  const [isActive,setIsActive] = useState(true);
  useEffect(()=>{
    let interval;
    if (isActive & time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime-1;
        });
        console.log(time);
      }, 1000);}
    
    return ()=>clearInterval(interval);
      
    
  },[isActive,time])
  const formatTime=(seconds)=>{
    const minutes= Math.floor(seconds/60);
    const formattedMinutes= minutes<10 ? `0${minutes}`: minutes
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return(
      `${formattedMinutes}:${formattedSeconds}`
    )
  }
  const toggleTime=()=>{
    setIsActive((prev)=>{
      return !prev;
    });
  }
  const finishPomod =()=>{
    navigate('/',{state:{donePomod:data}})
  }
  
  
  return (
    <div className='flex min-h-screen flex-col items-center bg-counterBackground bg-cover'>
      <div className=' flex items-center bg-white rounded-xl w-1/2  h-10   my-6'>
        <p className='text-xl font-bold text-left ml-4'>
          {data.title}<span className='opacity-50 text-lg'> is being done now..</span>
        </p>
      </div>
      <div className='bg-slate-100 opacity-70 mt-2 h-96 w-7/12 relative flex flex-col items-center'>
        <p className='text-green-800 font-extrabold text-7xl'>{formatTime(time)}</p>
        <div id='buttons' className='flex '>
          <button className=' z-20 border-2 border-green-800 bg-white mr-3 p-4 rounded-xl text-xl' id='stop' onClick={toggleTime}>Stop
          </button>
          {!isActive &&<div><button onClick={toggleTime} className='z-20 border-2 border-green-800 bg-white mr-2 p-4 rounded-xl text-xl'>Continue</button> <button onClick={finishPomod}  className=' z-20 border-2 border-green-800 bg-white p-4 rounded-xl text-xl'>Finish It</button></div> }
        </div>
      </div>

      
    </div>
  )
}

export default Counter