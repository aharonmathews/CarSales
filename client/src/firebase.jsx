// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOecOW3_zgj_wkI5ri6T0x8JvP9isCDlo",
  authDomain: "test-carsales-f7229.firebaseapp.com",
  projectId: "test-carsales-f7229",
  storageBucket: "test-carsales-f7229.appspot.com",
  messagingSenderId: "406792719903",
  appId: "1:406792719903:web:f83e342b977120d519cf2a",
  measurementId: "G-CK40C21S4F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const  
 storage = getStorage(app);

export { db, storage };