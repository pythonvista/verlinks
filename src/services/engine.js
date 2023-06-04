import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI7TR5U0jabjgMzbkHI_ZnWPdwZASv9jc",
  authDomain: "ubclick-46be6.firebaseapp.com",
  projectId: "ubclick-46be6",
  storageBucket: "ubclick-46be6.appspot.com",
  messagingSenderId: "183723543834",
  appId: "1:183723543834:web:f901b64f3f5a20163ef0a3"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
