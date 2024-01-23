import React, { useState,useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import CreateTask from '../Components/CreateTask';
import TaskList from '../Components/TaskList';
import TaskContext from '../Context/TaskContext';
import CompletedTask from '../Components/CompletedTask';
import { db } from '../firebase/firebase';
import { collection } from 'firebase/firestore';
import { auth } from '../firebase/firebase';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Loading from '../Components/Loading';

function Main() {
  const navigate= useNavigate();
  const {user,logOut,loading,setLoading} = useContext(AuthContext);
  const location= useLocation();
  
  console.log(user)
  if(loading){
    console.log('mainden logine dönüş');
    return(<Loading/>)
  }
  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/login"); // Logout sonrasında login sayfasına yönlendir
        const timer = setTimeout(() => { //firebase logout kısmı kısa sürdüğü için loading kısmının geliştirilmesi açısında
          setLoading(false);           // süre tutulmuştur
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
      <div className='flex flex-col items-center'>
        <div className='relative right-0 top-0 bg-green-700 w-32 h-14 flex items-center justify-center'>
          <button className='bg-black text-white rounded p-2' onClick={handleSignOut}>Log Out</button>
        </div>
        <div><h2><span className='text-3xl font-bold'>Welcome </span><span className='text-green-700 text-4xl font-extrabold'>{user.displayName}</span> </h2></div>
        <Navbar/>
        <CreateTask/>
        <TaskList/>
        <CompletedTask/>
     
      </div>
    
  )
}

export default Main