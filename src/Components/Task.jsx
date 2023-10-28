import React, { useContext, useEffect, useState } from 'react'
import {BsPlayCircleFill} from 'react-icons/bs';
import {AiFillDelete,AiFillClockCircle} from 'react-icons/ai';
import { motion,AnimatePresence } from 'framer-motion';
import TaskContext from '../Context/GlobalState';
import { useNavigate} from 'react-router-dom';
import { db } from '../db/firebase';

function Task(props) {
    const {setCompletedTasks,setTasks} = useContext(TaskContext);
    const [isChecked,setIsChecked] = useState(false);
    const navigate =useNavigate();
    useEffect(()=>{
      controlTaskIsDone();
      
    },[isChecked])
    const controlTaskIsDone=()=>{
      if(isChecked){
        props.currentTask.completed=true;
        setTasks((prev)=>{
          return (prev.filter((task,index)=>{
            return index!==props.id;
          }))
        })
        setCompletedTasks((prev)=>{
          return([...prev,props.currentTask])
        })
        setIsChecked(false);
      }
      else{
        return 0;
      }
    }
    const handleDeleteBtn =  ()=>{
      // setTasks((prev)=>{
      //   return (prev.filter((task,index)=>{
      //     return index!==props.id;
      //   }))
      // })
       const deletedTask=  db.collection("tasks").doc(props.currentTask.id).delete()
       
      deletedTask.then(()=>{
        console.log("document deleted successfully!");
      })
      .catch((error)=>{
        console.error(error);
      })
    }
    
  return (
    <AnimatePresence>
    <motion.div initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} transition={{ ease: "easeIn", duration: 0.7}} exit={{opacity:0,y:-30}} className='w-2/3 mt-4'>
        <div className='bg-white flex items-center  rounded-xl h-12'>
            <div className='flex gap-3 mx-4'>
            <input className='grow-0 w-6 h-6 cursor-pointer' checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}} type='checkbox'/>
            <BsPlayCircleFill onClick={()=>{navigate('/counter',{state:{currentTask:props.currentTask}})}} className='grow-0 text-2xl cursor-pointer text-gray-700 hover:text-green-800'/>
            </div>
            <p className='grow text-left text-2xl'>{props.currentTask.title}</p>
            {Array.from({length:props.currentTask.pomodoroNum }).map((_, index) => {
              return(<AiFillClockCircle className='text-2xl'/>);
            })}
            <AiFillDelete onClick={handleDeleteBtn} className='grow-0 text-2xl cursor-pointer mx-4 text-gray-700 hover:text-green-800'/>
        </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Task;