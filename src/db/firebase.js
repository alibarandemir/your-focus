import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

// Firestore'ı kullanılabilir hale getir
export const db = app.firestore(app);

