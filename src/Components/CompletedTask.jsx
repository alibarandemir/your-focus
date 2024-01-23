import React, { useContext, useEffect, useState } from 'react'
import {CgMenu} from 'react-icons/cg';
import {motion} from 'framer-motion';
import TaskContext from '../Context/TaskContext';
import {MdDoneOutline} from 'react-icons/md';
import {AiFillDelete,AiFillCloseCircle} from 'react-icons/ai';
import { db } from '../firebase/firebase';


const variants = {
  open: { opacity: 0, x: -30,},
  closed: { opacity: 1, x: 0 },
}

function CompletedTask() {
  const [isOpen,setIsOpen] = useState(false);
  const {completedTasks,setCompletedTasks} = useContext(TaskContext);
  
  function handleDeleteBtn(taskNum,completedTask){
      db.collection("tasks").where("id",'==',completedTask.id).get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
          doc.ref.delete()
          .then(()=>{
            setCompletedTasks((prev)=>{
              return (prev.filter((task)=>{
                return task.id!==completedTask.id;
              }))
            })
            console.log("document deleted successfully!")
          })
          .catch((error)=>{
            console.error(error)
          })
        })
      }) 
  }
  
  return (
    <div className='fixed w-14 h-14 left-0 top-28'>
      <motion.div onClick={()=>setIsOpen((prev)=>!prev)} animate={isOpen ? "open" : "closed" } className='fixed left-0 top-28 w-14 h-14 bg-green-800 flex justify-center items-center cursor-pointer'
    variants={variants}>
      <CgMenu className='text-white text-3xl'/>
      </motion.div>
      {isOpen&& 
      <motion.div id='drop-down' initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} className='bg-white absolute left-0 top-20 z-10 w-52 min-h-min'>
      {completedTasks.length=== 0 ?
        (<p onClick={()=>{setIsOpen(false)}} className='bg-red-700 text-white'>
          you have not completed a task yet!
        </p>):
        <div className='bg-white w-72 h-36 overflow-scroll rounded-r-xl snap-x'>
          <div className='flex items-center pl-16 gap-x-6  my-3'> 
            <h3 className='font-bold mr-7'>Completed Tasks!</h3>
            <AiFillCloseCircle className='text-2xl text-gray-700 cursor-pointer float-right' onClick={()=>setIsOpen((prev)=>!prev)}/>
          </div>
          {
          
          completedTasks.map((task,index)=>{
            return(
          <li className='snap-center  bg-green-900 text-white flex items-center relative mb-3 ' key={index}>
            <div className='flex items-center gap-x-2'>
            <MdDoneOutline className='text-xl'/>
            <p>{task.title}</p>
            </div>
            <AiFillDelete onClick={()=>{handleDeleteBtn(index,task)}} className=' text-xl cursor-pointer absolute right-1'/>
            
          </li>)
        })}
        </div>
        }
      </motion.div>}
      
    </div>
  )
}

export default CompletedTask
