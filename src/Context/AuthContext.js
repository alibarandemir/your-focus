import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { auth } from "../db/firebase";
  
  export const AuthContext = createContext(null);
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isMainToCounter,setIsMainToCounter]= useState(false);
    const [loading, setLoading] = useState(false);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        //setLoading(false);
        
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
    // useEffect(()=>{
    //   const timer = setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
  
    //   return () => clearTimeout(timer);
    // },)   
    
  
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