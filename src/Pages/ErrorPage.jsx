import React from 'react';
import ErrorLogo from '../assets/images/error_logo.svg';

function ErrorPage() {
  return (
    <div className='bg-slate-50 w-full min-h-screen flex'>
      <div className='min-h-screen w-1/2 flex flex-col justify-center' id='descriptions'>
        <h2 className='font-extrabold text-5xl mb-2'>Oops...</h2>
        <p className='tracking-widest mb-4'>This page doesn't exist or was removed!</p>
        <p className='font-extrabold text-lg'>You will turn Main Page... </p>
      </div>
      <div id='' className='min-h-screen w-1/2 flex items-center justify-center'>
        <img className='' src={ErrorLogo}/>
      </div>
    </div>
  )
}

export default ErrorPage