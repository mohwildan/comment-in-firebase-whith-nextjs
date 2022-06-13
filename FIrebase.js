// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAPaJgxA06DaMFCroTyx5gjsAOv7Wh9y_8",
  authDomain: "pertama-cd6c3.firebaseapp.com",
  projectId: "pertama-cd6c3",
  storageBucket: "pertama-cd6c3.appspot.com",
  messagingSenderId: "783751542197",
  appId: "1:783751542197:web:3234ad6f151b0fc4bdd5fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)




export {app, auth, firestore}
