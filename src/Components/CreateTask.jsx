import React, { useContext, useEffect, useState } from 'react';
import {BsPlusCircleFill} from 'react-icons/bs';
import {FiClock} from 'react-icons/fi';
import '../App.css';
import TaskContext from '../Context/GlobalState';
import { db } from '../db/firebase';


function CreateTask() {
  const {task,setTask,setTasks} = useContext(TaskContext)
  const [showWarning,setShowWarning] =useState(false);
  useEffect(()=>{
    //console.log(tasks);
    
  },[])
   //ref ile element seçilip stil atanacak
   
   const handleKeyDown=(e)=>{
      if(e.key==='Enter'){
        addTask();
      }
   }
   const addTask =()=>{
      // showing error message
      if(task.title.trim() ===''){
          setShowWarning(true);
          return 0;
      }
      else{
        setShowWarning(false);
        //adding task to task list
        setTasks((previous)=>[...previous,task]);
        const docRef=db.collection("tasks").add(task);
        
        docRef.then((doc)=>{
        console.log(doc.id);
        db.collection("tasks").doc(doc.id).update({
          id:doc.id
        })
      })
      .catch((err)=>{
        console.error(err);
      })
      console.log(docRef.id);
        setTask({
          title:"",
          pomodoroNum:"1",
        })
      }
   }
   const detectChange =(e)=>{
      const {name,value} = e.target;
      setTask((prev)=>{
        return{
          ...prev,
          [name]:value,
        }
      })
   }
  return (
    <div className='flex flex-col items-center mt-7 w-2/3'>
    <div className='w-2/3 flex justify-center'>
      <div id='parent' className='bg-slate-50 rounded-xl flex h-12 w-full items-center justify-center gap-x-20 px-8'>
        <BsPlusCircleFill className='text-green-700 text-2xl cursor-pointer' onClick={addTask}/>
        <input name='title' type="text" className='bg-slate-50 w-2/3 outline-none' placeholder='"press Enter or click plus button to save the task"' value={task.title} onChange={detectChange} onKeyDown={handleKeyDown}/>
        <div className='flex gap-x-3'>
          <FiClock className='text-green-700 text-2xl'/>
          <select name='pomodoroNum' value={task.pomodoroNum} onChange={detectChange} className='cursor-pointer'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        </div>
        
      </div>
    </div>
    {showWarning&&<div className='bg-red-600 text-white w-1/4'>Please enter a task!</div>}
    </div>
  )
}

export default CreateTask;