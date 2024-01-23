import React, { useContext, useEffect } from 'react'
import TaskContext from '../Context/TaskContext'
import Task from './Task';
import { db } from '../firebase/firebase';
import { QuerySnapshot } from 'firebase/firestore';


function TaskList() {
  const {tasks,setTasks} = useContext(TaskContext);
  useEffect(()=>{
    db.collection("tasks").where("completed","==", false)
    .get()
    .then((QuerySnapshot)=>{
      const tasksArr = [];
      QuerySnapshot.forEach((doc)=>{
        tasksArr.push(doc.data());
      })
      setTasks(tasksArr);
    })
  },[])
  return (
    <div className='flex flex-col items-center w-2/3 mt-5'>
        {
         tasks.map((task,index)=>{
          console.log(task)
          console.log(tasks)
            return(
              <Task key={index} id={task.id} currentTask={task}/>
            )
        })} 
    </div>
  )
}
export default TaskList;