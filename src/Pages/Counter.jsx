import React, { useContext, useEffect, useState } from 'react'
import {useLocation,useNavigate}from 'react-router-dom';
import { db } from '../db/firebase';
import TaskContext from '../Context/GlobalState';
import forestBackground from '../assets/images/forestBg.jpg';
import seaBackground from '../assets/images/seaBg.jpg';
import libraryBackground from '../assets/images/libraryBg.jpg';
import forestSound from '../assets/sounds/forest.mp3';
import seaSound from '../assets/sounds/sea.mp3';
import librarySound from '../assets/sounds/library.mp3';
import ReactPlayer from 'react-player';
import UserSettings from '../Components/UserSettings';


function Counter() {
  const location = useLocation();
  const data= location.state.currentTask;
  
  const {fetchedData,setTasks,setTask}= useContext(TaskContext)
  const navigate = useNavigate();
  const [time,setTime] = useState(1500);
  const [isActive,setIsActive] = useState(true);
  const [selectedBgImg,setSelectedBgImg] = useState(forestBackground);
  
  useEffect(()=>{
    let interval;
    if (isActive & time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime-1;
        });
        
      }, 1000);}
    if(time==0){
      finishTaskAddCompleted();
    }
    return ()=>clearInterval(interval);
  },[isActive,time])
  useEffect(()=>{
    getSelectedBackGround();
  },[selectedBgImg])
  const formatTime=(seconds)=>{
    const minutes= Math.floor(seconds/60);
    const formattedMinutes= minutes<10 ? `0${minutes}`: minutes
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return(
      `${formattedMinutes}:${formattedSeconds}`
    )
  }
  useEffect(()=>{
    getSelectedBackGround();
  },[selectedBgImg])
  
  const toggleTime=()=>{
    setIsActive((prev)=>{
      return !prev;
    });
  }
  const finishTaskAddCompleted=()=>{
    if(data.pomodoroNum == 1){
     
      data.completed=true;
      setTasks((prev)=>{
        return (prev.filter((task,index)=>{
          return task.id!==data.id;
        }))
      })
      db.collection("tasks").where("id",'==',data.id).get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
          db.collection("tasks").doc(doc.id).update({
            completed:true
          })
          .then(()=>{
            console.log("task is updated!")
          })
          .catch((e)=>{console.error("doc not updated!" + e)})
        })
        
      }).catch((e)=>{
        console.error(e+"failed!")
      })
      fetchedData(data);
    }
    else{
      data.pomodoroNum=data.pomodoroNum-1;
      setTask((prev)=>{
        return({...prev,pomodoroNum: data.pomodoroNum})
      })
      // db.collection('tasks').where('id','==',data.id).get()
      // .then((querySnapshot)=>{
      //     querySnapshot.forEach((doc)=>{
      //       db.collection('tasks').doc(doc.id).update({
      //         pomodoroNum:data.pomodoroNum
      //       }).then(()=>{console.log('task is updated!')}).catch((e)=>{console.error(e)})
      //     })
      // })
      // .catch((e)=>{console.error(e)})
    }
  }
  const finishPomod =()=>{
    navigate('/homepage',{state:{donePomod:data}})
    finishTaskAddCompleted();
  }
  
  const getSelectedBackGround=()=>{
    const backgrounds= [
      {selectedBgImg:forestBackground, color:'green-700'},
      {selectedBgImg:seaBackground,color:'black'},{selectedBgImg:libraryBackground,color:'red-700'}]
      const selectedBackground = backgrounds.find(
        (background) => background.selectedBgImg === selectedBgImg
      )
      const finalBackground = selectedBackground || backgrounds[0];
      console.log(finalBackground)
      return finalBackground;
  }
  
  return (
    <div className='flex min-h-screen flex-col items-center z-50  bg-cover relative' style={{'backgroundImage': `url(${getSelectedBackGround().selectedBgImg})`}}>
      <div className=' flex items-center bg-white rounded-xl w-1/2  h-10   my-6'>
        <p className='text-xl font-bold text-left ml-4'>
          {data.title}<span className='opacity-50 text-lg'> is being done now..</span>
        </p>
      </div>
      <div className='bg-slate-100 opacity-70 mt-2 h-96 w-7/12 relative flex flex-col items-center'>
        <p className={`font-extrabold text-7xl text-${getSelectedBackGround().color}`}>{formatTime(time)}</p>
        <div id='buttons' className='flex '>
          <button className={`z-20 border-4 border-${getSelectedBackGround().color} text-${getSelectedBackGround().color}  bg-white mr-3 p-4 rounded-xl text-xl `} id='stop' onClick={toggleTime}>
            Stop
          </button>
          {!isActive &&<div><button onClick={toggleTime} className={`z-20 border-4 border-${getSelectedBackGround().color} text-${getSelectedBackGround().color} bg-white mr-2 p-4 rounded-xl text-xl`}>
            Continue
            </button> 
          <button onClick={finishPomod}  className={`z-20 border-4 border-${getSelectedBackGround().color} text-${getSelectedBackGround().color} bg-white p-4 rounded-xl text-xl`}>
          
            Finish It
          </button>
          </div> }
        </div>
      </div>
      <UserSettings selectedBgImg={selectedBgImg} setSelectedBgImg={setSelectedBgImg} getSelectedBackGround={getSelectedBackGround()}/>
    </div>
  )
}

export default Counter