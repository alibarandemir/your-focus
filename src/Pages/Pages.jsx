import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
import Main from './Main';
import Counter from './Counter';
import {Routes,Route} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import TaskContext from '../Context/TaskContext';
import PrivateRoute from '../PrivateRoute';
import Register from './Register';
import { Toaster } from 'react-hot-toast';




function Pages () {
  const [task,setTask] = useState({
    id:"",
    title:"",
    pomodoroNum:"1",
    completed:false,
  });
  const [tasks,setTasks] = useState([])
  const [completedTasks,setCompletedTasks]= useState([])
  
  
  const fetchedData= (currentTask)=>{
          setCompletedTasks((prev)=>{
            return ([...prev,currentTask])
          });
          
  }
  console.log(process.env.REACT_APP_API_KEY);
  return (
    
    <TaskContext.Provider value={{task, setTask,fetchedData,tasks,setTasks,completedTasks,setCompletedTasks}}>
      <Toaster position='top-center'/>
      <Routes>
        <Route  path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<PrivateRoute>
          <Main />
        </PrivateRoute>}/>
        <Route path='/counter' element={<PrivateRoute>
            <Counter/>
        </PrivateRoute>}/>
        
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      
      </TaskContext.Provider>
      
  )
}

export default Pages;