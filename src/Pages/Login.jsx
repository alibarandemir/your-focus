import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import LogoToDo from '../assets/images/logo1.svg';
import LogoTime from '../assets/images/logo2.svg';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading';
export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {user,loginUser,loading,setLoading} = useContext(AuthContext);
  const navigate=useNavigate()
  useEffect(()=>{
    setLoading(true)
    const timer = setTimeout(() => { //sayfa yüklenirken loading işlemi gözüksün diye geçiçi bir çözüm üretilmiştir
        setLoading(false);           
      }, 1300);
      return () => clearTimeout(timer);
},[])
    console.log(user);
  if(loading){
    console.log('login page loading')
    return(<Loading/>)
  }
    
    const handleSignIn=()=>{
        loginUser(email,password)
        .then(()=>{
           
            console.log('Successfully login')
            console.log(user)
            navigate('/homepage')
            setLoading(false);
        })
        .catch((error)=>{
            toast.error(error.message);
            setLoading(false);
            console.log('hatadayım')
        })
        console.log(loading)
    }
    console.log(loading);
  return (
    <div className='bg-white h-full max-w-full flex flex-col items-center justify-center relative '>
        <div id='logos' className='flex justify-between w-full relative'>
        <img className='w-96' src={LogoToDo} alt="" />
        <img className='w-96' src={LogoTime} alt="" />
        </div>
        <div className='absolute z-10 top-12'>
            <NavLink className='text-4xl font-extrabold text-green-700 z-30' to='/'>Your Focus</NavLink>
            
        </div>
        
        <form className='flex flex-col w-1/5 absolute min-h-min ' >
        <div className='text-left z-30'>
            <h3 className='font-extrabold text-4xl'>Sign In</h3>
        </div>
          
            <div className='flex flex-col mt-4'>
                <label className='text-left'>E-Posta</label>
                <input className=' h-10 border-4 rounded border-green-700 placeholder:text-gray-700 placeholder:text-lg focus:outline-none '  type="email" placeholder='you@example.com' onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className='flex flex-col mt-4'>
                <label className='text-left' htmlFor="">Password</label>
                <input className='h-10 border-4 rounded border-green-700 placeholder:text-gray-700 placeholder:text-lg focus:outline-none ' type="password" placeholder='*****' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='w-full mt-4'>
                <button  onClick={handleSignIn}className='bg-black text-xl w-full text-white rounded h-10' type='submit'>
                    Sign In
                </button>
            </div>
            
        </form>
        <p className='font-medium'>Don't have an account?</p>
        <NavLink className='font-bold text-xl text-green-700' to='/'>Create Now</NavLink>
    </div>
  )
}
