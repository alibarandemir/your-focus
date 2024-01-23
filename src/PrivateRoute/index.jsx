import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({children}) {
  const {user}= useContext(AuthContext); 
  return (
    <div>
        {user ? children: <Navigate to='/login'/>}

    </div>
  )
}

export default PrivateRoute;