import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCk25KCK3mNPM0tV3kBtqEmabszcvarQtI",
    authDomain: "your-focus.firebaseapp.com",
    projectId: "your-focus",
    storageBucket: "your-focus.appspot.com",
    messagingSenderId: "268441486867",
    appId: "1:268441486867:web:eb002575e56aec912261e6",
    measurementId: "G-8SWZMK855Z"
  };
const app=firebase.initializeApp(firebaseConfig);


export const db = app.firestore(app);
export const auth = getAuth(app);

