import React, { useState,useEffect } from 'react';
import Navbar from '../Components/Navbar';
import CreateTask from '../Components/CreateTask';
import TaskList from '../Components/TaskList';
import TaskContext from '../Context/GlobalState';
import CompletedTask from '../Components/CompletedTask';
import { db } from '../db/firebase';
import { collection } from 'firebase/firestore';

function Main() {
  const [task,setTask] = useState({
    id:"",
    title:"",
    pomodoroNum:"1",
    completed:false,
  });
  useEffect(()=>{
    
    
  })
  const [tasks,setTasks] = useState([]);
  const [completedTasks,setCompletedTasks] =useState([]);
  
  
  return (
      <div className='flex flex-col items-center'>
      <TaskContext.Provider value={{task,setTask,tasks,setTasks,completedTasks,setCompletedTasks}}>
        <Navbar/>
        <CreateTask/>
        <TaskList/>
         <CompletedTask/>
      </TaskContext.Provider>
      </div>
    
  )
}

export default Main