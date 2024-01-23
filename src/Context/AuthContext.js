import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
  
  export const AuthContext = createContext(null);
  
  const AuthProvider = ({ children }) => {
    const location= useLocation();
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [isMainToCounter,setIsMainToCounter]= useState(false);
    const [loading, setLoading] = useState(false);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const loginUser = (email, password) => {
      
      setLoading(true);
     return(
     
       signInWithEmailAndPassword(auth, email, password))
     
     }
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if(currentUser){
          setLoading(false)
          if(location.pathname!=='/homepage'){
            setTimeout(()=>{navigate('/homepage')},2000)
          }
          else{
            navigate('/homepage')
          }
        }
        else{
          setLoading(false);
          if(location.pathname!=='/login' || location.pathname!=='/'){
            setTimeout(()=>{navigate('/login')},3500)
          }
          else{
              navigate('/login');
          }
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
    const authValue = {
      createUser,
      user,
      loginUser,
      logOut,
      loading,
      setLoading,
      isMainToCounter,
      setIsMainToCounter,
    };
    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
  };
  export default AuthProvider;