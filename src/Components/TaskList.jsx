import React, { useContext } from 'react'
import TaskContext from '../Context/GlobalState'
import Task from './Task';


function TaskList() {
  const {tasks} = useContext(TaskContext);
  return (
    <div className='flex flex-col items-center w-2/3 mt-5'>
        {tasks.map((task,index)=>{
            return(
              <Task key={index} id={index} currentTask={task}/>
            )
        })}
    </div>
  )
}

export default TaskList