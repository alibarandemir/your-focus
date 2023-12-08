import React, { useContext, useState,useEffect } from 'react'
import { useNavigate,NavLink, useLocation} from 'react-router-dom';
import Login from './Login';
import LogoToDo from '../assets/images/logo1.svg';
import LogoTime from '../assets/images/logo2.svg';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { MoonLoader } from 'react-spinners';
import Loading from '../Components/Loading';

export default function Register() {
    const [userName,setUserName]=useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const {user,createUser,loading,setLoading} = useContext(AuthContext);
    const navigate=useNavigate();
    const location = useLocation()
    
    useEffect(()=>{
        setLoading(true)
        const timer = setTimeout(() => { //sayfa yüklenirken loading işlemi gözüksün diye geçiçi bir çözüm üretilmiştir
            setLoading(false);           
          }, 1500);
          return () => clearTimeout(timer);
    },[])
    if(loading){
        return(<Loading/>)
    }
    if(user){
        navigate('/homepage');
    }
    const handleRegister =(e)=>{
        e.preventDefault();
        createUser(email,password)
        .then((userCredential)=>{
            updateProfile(userCredential.user, {
                displayName: userName,
              });
            navigate('/login')
            setLoading(false);
            
        })
        .catch((error)=>{
            toast.error((error.message));
            setLoading(false)
        })
       
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
        
        <form className='flex flex-col w-1/5 absolute min-h-min ' onSubmit={handleRegister}>
        <div className='text-left z-30'>
            <h3 className='font-extrabold text-4xl'>Register</h3>
        </div>
            <div className='mt-3 flex flex-col w-full'>
                <label className='text-left' htmlFor="">User Name</label>
                <input className='h-10 border-4 rounded border-green-700 placeholder:text-gray-700 placeholder:text-lg focus:outline-none ' type="text" placeholder='John123' onChange={(e)=>{setUserName(e.target.value)}}  />
            </div>
            <div className='flex flex-col mt-4'>
                <label className='text-left'>E-Posta</label>
                <input className=' h-10 border-4 rounded border-green-700 placeholder:text-gray-700 placeholder:text-lg focus:outline-none '  type="email" placeholder='you@example.com' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col mt-4'>
                <label className='text-left' htmlFor="">Password</label>
                <input className='h-10 border-4 rounded border-green-700 placeholder:text-gray-700 placeholder:text-lg focus:outline-none ' type="password" placeholder='*****' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='w-full mt-4'>
                <button className='bg-black text-xl w-full text-white rounded h-10' type='submit'>
                    Create Account
                </button>
            </div>
            
        </form>

        <p className='font-medium mt-5'>Already Have An Account?</p>
        <NavLink className='font-bold text-xl text-green-700' to='/login'>Login</NavLink>
    </div>
  )
}
