import React, { useState ,useEffect} from 'react'
import { AiFillDelete } from 'react-icons/ai'
import toast from 'react-hot-toast'

export default function HandleDeleteTask({handleDeleteFunc,currentTask}) {
    const [isOpen,setIsOpen] = useState(false)
    const [confirmDeleting,setConfirmDeleting] =useState({confirm:false,dontShowAgain:false})
    const [isChecked,setIsChecked] = useState(false)
    useEffect(() => {
      // isOpen durumu değiştiğinde, eğer false ise isChecked ve confirmDeleting'i sıfırla
      
        
        setConfirmDeleting((prev)=>({...prev}));
      
    },[isOpen])
    const handleDeleteBtn=()=>{
        if(!(confirmDeleting.dontShowAgain&&confirmDeleting.confirm)){
            setIsOpen(true);

        }
        else{
            handleDeleteFunc()
            toast.error('Task is deleted!')
        }
    }
    const handleCheckBoxChange=(e)=>{
        const newChecked= e.target.checked;
        setIsChecked(newChecked)
        setConfirmDeleting((prev)=>({...prev,dontShowAgain:newChecked})) 
    }
    const handleConfirm=()=>{
      handleDeleteFunc()
      setConfirmDeleting((prev)=>({...prev,confirm:true}))
      setIsOpen(false);
      toast.error('Task is deleted!')

    }
    const closePopup=()=>{
      setIsOpen(false)
      //setConfirmDeleting({confirm:false,dontShowAgain:false})
    
    }
    console.log(isChecked)
    console.log(confirmDeleting)
  return (
    
    <div className=' w-7 h-7  mx-2'>
    <AiFillDelete onClick={handleDeleteBtn} className='grow-0 text-2xl cursor-pointer mr-2  text-gray-700 hover:text-green-800'/>
    {isOpen&&<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            <div id='popup' className='border-green-700 border-4 mx-auto bg-black text-white rounded-sm flex flex-col items-center z-30 w-80 h-52 gap-y-5'>
            <span className="bg-green-700 rounded-t-md w-9 h-9 absolute -top-7 right-4 transform translate-x-2 -translate-y-2 cursor-pointer text-white font-bold text-center hover:text-black" onClick={closePopup}>
          X
        </span>
                <p className='mt-1'>The task named <span className='text-green-700 font-bold'>{currentTask}</span> will be deleted. Do you Confirm?</p>
                <button className='bg-green-700 p-2 rounded block text-white text-center' onClick={handleConfirm}>Confirm</button>
                <div>
                <input type="checkbox" checked={isChecked} onChange={handleCheckBoxChange}/> <p className='inline-block'>Don't show me this again</p></div></div>
    </div>}</div>
    
  )
}
