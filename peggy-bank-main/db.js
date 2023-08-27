// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5ppI0Uuce1ryFqo-cD4t9OV1Bb-SgQ94",
  authDomain: "web-test-323f9.firebaseapp.com",
  projectId: "web-test-323f9",
  storageBucket: "web-test-323f9.appspot.com",
  messagingSenderId: "64273718187",
  appId: "1:64273718187:web:f30761dc82a67eb277d0ee",
  measurementId: "G-SDXVFMPCVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
