import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR8o0KKt2miFp6LwLL-eiJZYigYlZ2tQ4",
  authDomain: "rydigo-project.firebaseapp.com",
  projectId: "rydigo-project",
  storageBucket: "rydigo-project.firebasestorage.app",
  messagingSenderId: "244582727847",
  appId: "1:244582727847:web:63d9237b425eb958071b82",
  measurementId: "G-9Q2VKQDECZ"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR8o0KKt2miFp6LwLL-eiJZYigYlZ2tQ4",
//   authDomain: "rydigo-project.firebaseapp.com",
//   projectId: "rydigo-project",
//   storageBucket: "rydigo-project.firebasestorage.app",
//   messagingSenderId: "244582727847",
//   appId: "1:244582727847:web:63d9237b425eb958071b82",
//   measurementId: "G-9Q2VKQDECZ"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);