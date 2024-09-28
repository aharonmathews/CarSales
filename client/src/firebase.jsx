// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

/* const firebaseConfig = {
  apiKey: "AIzaSyCOecOW3_zgj_wkI5ri6T0x8JvP9isCDlo",
  authDomain: "test-carsales-f7229.firebaseapp.com",
  projectId: "test-carsales-f7229",
  storageBucket: "test-carsales-f7229.appspot.com",
  messagingSenderId: "406792719903",
  appId: "1:406792719903:web:f83e342b977120d519cf2a",
  measurementId: "G-CK40C21S4F"
}; */

const firebaseConfig = {

  apiKey: "AIzaSyC3CZTCKME1X83IotKT_eyHDqcu7MNsO9c",

  authDomain: "chandi-9dc8f.firebaseapp.com",

  projectId: "chandi-9dc8f",

  storageBucket: "chandi-9dc8f.appspot.com",

  messagingSenderId: "558114302237",

  appId: "1:558114302237:web:26998b4cfdd7a87b2859f4",

  measurementId: "G-2QC6EV2JB9"

}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth }; 