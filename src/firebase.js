// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrs90AZW9e8hXLeA8LZvZBp1isFqbxIws",
  authDomain: "ride-project-87e06.firebaseapp.com",
  projectId: "ride-project-87e06",
  storageBucket: "ride-project-87e06.firebasestorage.app",
  messagingSenderId: "991986435149",
  appId: "1:991986435149:web:12774951128dc773d74804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db = getFirestore(app)
export default firebaseConfig