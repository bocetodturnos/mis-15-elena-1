import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfmBLV1TrxyWwNocPa7taRxIhDjUa4VcM",
  authDomain: "demos-15.firebaseapp.com",
  projectId: "demos-15",
  storageBucket: "demos-15.firebasestorage.app",
  messagingSenderId: "440246164237",
  appId: "1:440246164237:web:94b6ca3ea04cefbb8b6e44"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
