// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoO05OO6Z08NulFAmhLn52soS7Oovl-P8",
  authDomain: "healthbotplus.firebaseapp.com",
  projectId: "healthbotplus",
  storageBucket: "healthbotplus.appspot.com",
  messagingSenderId: "842210988630",
  appId: "1:842210988630:web:cc5a325e19a535d4cca1f7",
  measurementId: "G-3B1GHQM41E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);