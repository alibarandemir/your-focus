import React from 'react';
import forestBackground from '../assets/images/forestBg.jpg';
import seaBackground from '../assets/images/seaBg.jpg';
import libraryBackground from '../assets/images/libraryBg.jpg';
import forestSound from '../assets/sounds/forest.mp3';
import seaSound from '../assets/sounds/sea.mp3';
import librarySound from '../assets/sounds/library.mp3';
import ReactPlayer from 'react-player';
import { useState,useEffect } from 'react';
import { IoMdSettings } from "react-icons/io";
import { AiFillCloseCircle } from 'react-icons/ai';

function UserSettings({selectedBgImg,setSelectedBgImg,getSelectedBackGround}) {
 
    
    
    const [selectedSound,setSelectedSound]= useState(forestSound);
    const [isOpen,setIsOpen] = useState(false);
    
  return (
        <>
        {!isOpen&&<div id='settings' className={`w-16 h-16 bg-${getSelectedBackGround.color} absolute right-0 top-20 flex flex-col items-center justify-center`}><div onClick={()=>{setIsOpen(true)}} className='mx-auto cursor-pointer' id='icon'><IoMdSettings className='text-white text-3xl'/></div></div>}
        {isOpen&&
          <div className={`h-44 w-44 bg-${getSelectedBackGround.color} absolute right-0 top-20 flex flex-col items-center`}>
          <div className='bg-slate-100 flex mt-5' id='backgroundImages'>
              <p>Background İmage:</p>
              <select value={selectedBgImg} className='cursor-pointer' name="selectedBg"  onChange={(e)=>{setSelectedBgImg(e.target.value)}}>
                <option value={forestBackground}>Forest</option>
                <option value={seaBackground}>Sea</option>
                <option value={libraryBackground}>Library</option>
              </select>
          </div>
          <div className='bg-slate-100 mt-5 flex' id='backgroundSounds'>
              <p>Background Sounds</p>
              <select name="" id="" value={selectedSound} onChange={(e)=>{setSelectedSound(e.target.value)}}>
                <option value='/'>None</option>
                <option value={forestSound}>Forest</option>
                <option value={seaSound}>Sea</option>
                <option value={librarySound}>Library</option>
              </select>
              

          </div>
          <div className='flex items-center justify-center mt-4 bg-slate-100 w-1/3'>
            <AiFillCloseCircle className='text-2xl cursor-pointer' onClick={()=>{setIsOpen(false)}}/>
          </div>
          </div>}
          
            <ReactPlayer url={selectedSound} loop={true} width={0} height={0} volume={0.2} playing={true}>
            </ReactPlayer>
          
      </>
  )
}

export default UserSettings;