import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../db/firebase'



function PrivateRoute({children,redirectPath='/login',isAllowed}) {
    const [isLogged,setIsLogged] = useState(false);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setIsLogged(true);
            }
        })
    })
  return (
    <div>
        {isAllowed ? children: <Navigate to={redirectPath} replace/>}

    </div>
  )
}

export default PrivateRoute