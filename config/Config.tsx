
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAdSv7pV1tUk0XbSTHJUlxn-V7vr2IaeM0",
  authDomain: "app-1-7f12f.firebaseapp.com",
  projectId: "app-1-7f12f",
  storageBucket: "app-1-7f12f.appspot.com",
  messagingSenderId: "589834617808",
  appId: "1:589834617808:web:abfa6d1957e800e7366fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);