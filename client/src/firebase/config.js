// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyqeNTRuJpNReQUlV1zWj_WdnmzgIADnc",
  authDomain: "travel-45227.firebaseapp.com",
  projectId: "travel-45227",
  storageBucket: "travel-45227.appspot.com",
  messagingSenderId: "375040635563",
  appId: "1:375040635563:web:05696cab9ff29bdcd17dee",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
