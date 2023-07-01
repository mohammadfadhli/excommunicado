// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi8gvLq24AoPo1Y1MFOrO-h2FXAjoNelY",
  authDomain: "excommunicado-f438a.firebaseapp.com",
  projectId: "excommunicado-f438a",
  storageBucket: "excommunicado-f438a.appspot.com",
  messagingSenderId: "396875965653",
  appId: "1:396875965653:web:305e89774234c0f8c9ae5c",
  measurementId: "G-9VXY0BGRV5"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore()

export { app, db };
