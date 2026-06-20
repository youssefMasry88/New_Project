import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAqXRlUn91ONR1fFHOJxa80-4go6CkYYko",
  authDomain: "homey-bac86.firebaseapp.com",
  projectId: "homey-bac86",
  storageBucket: "homey-bac86.firebasestorage.app",
  messagingSenderId: "775947552978",
  appId: "1:775947552978:web:207e8fb4467dc759f9450b",
  measurementId: "G-YQW0M2F4RL"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);