// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA3heW9H5OdHNsACsqrsojZijPazhmM88",
  authDomain: "shop-5f167.firebaseapp.com",
  projectId: "shop-5f167",
  storageBucket: "shop-5f167.appspot.com",
  messagingSenderId: "371685211500",
  appId: "1:371685211500:web:d73697b9b9f684f5f94749",
  measurementId: "G-HJ0SH6PP23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app