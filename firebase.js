import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvCktld-m6BLA_RkAy3pFojt1Z0o6y60s",
  authDomain: "whatsapp-ali-edition.firebaseapp.com",
  projectId: "whatsapp-ali-edition",
  storageBucket: "whatsapp-ali-edition.appspot.com",
  messagingSenderId: "530100303206",
  appId: "1:530100303206:web:af46b54ec92b56728404a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const app = !firebase.apps.length
//   ? initializeApp(firebaseConfig)
//   : firebase.app();
const auth = getAuth(app);
const db = getFirestore(app);
// const db = app.firestore();
// const auth = app.auth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
