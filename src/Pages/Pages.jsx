import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
import Main from './Main';
import Counter from './Counter';
import {Routes,Route} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import TaskContext from '../Context/GlobalState';
import PrivateRoute from '../PrivateRoute';
import Register from './Register';
import Loading from '../Components/Loading';
import { Toaster } from 'react-hot-toast';
import { auth } from '../db/firebase';
import AuthProvider, { AuthContext } from '../Context/AuthContext';


function Pages () {
  
 const {user,isMainToCounter,loading}= useContext(AuthContext);
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
  
  return (
    
    <TaskContext.Provider value={{task, setTask,fetchedData,tasks,setTasks,completedTasks,setCompletedTasks}}>
      <Toaster position='top-center'/>
      <Routes>
        <Route  path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<PrivateRoute isAllowed={!!user}>
          <Main />
        </PrivateRoute>}/>
        <Route path='/counter' element={<PrivateRoute redirectPath='/homepage' isAllowed={!!user&&isMainToCounter}>
            <Counter/>
        </PrivateRoute>}/>
        
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      
      </TaskContext.Provider>
      
  )
}

export default Pages;