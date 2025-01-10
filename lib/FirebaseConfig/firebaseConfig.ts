import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCP9swcjOq_PhzMWa-DYuunZc1I3XuT3YU",
  authDomain: "drello-0000.firebaseapp.com",
  projectId: "drello-0000",
  storageBucket: "drello-0000.firebasestorage.app",
  messagingSenderId: "822174348999",
  appId: "1:822174348999:web:d167d9a6ea867a393530e2",
  measurementId: "G-LRVHQJRBVG",
};

const app = initializeApp(firebaseConfig);
export const fcm = getMessaging(app);
