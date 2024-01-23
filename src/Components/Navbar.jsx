import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../Context/TaskContext';


function Navbar() {
  const [taskNumber,setTaskNumber] = useState('0');
  const{tasks} = useContext(TaskContext);
  useEffect(()=>{
    setTaskNumber(tasks.length);
    calculateTotalPomodoro();
  },[tasks])
  const calculateTotalPomodoro=()=>{
    let totalPomodoro=0;
    tasks.forEach(task => {
        totalPomodoro+=parseInt(task.pomodoroNum);      
    });
    return totalPomodoro;
  }
  return (
    <div className='flex flex-col items-center gap-y-4 w-2/3'>
      <h2 className='font-extrabold text-green-900 text-3xl mt-3'>Tasks</h2>
      <div className='flex justify-center w-2/3 bg-green-700 text-white rounded-xl gap-x-4'>
        <div>
          <span>{calculateTotalPomodoro()*25} d</span>
          <p>Estimated Time</p>
        </div>
        <div>
          <span>{taskNumber}</span>
          <p>number of tasks to complete</p>
        </div>
      </div>
    </div>
  )
}
export default Navbar