import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLO4EcpPp8vtR980Zs8cGEs8K4xiPP43Y",
  authDomain: "task-manager-f2579.firebaseapp.com",
  projectId: "task-manager-f2579",
  storageBucket: "task-manager-f2579.firebasestorage.app",
  messagingSenderId: "760837546551",
  appId: "1:760837546551:web:c0f0e996c87513656b55b2",
  measurementId: "G-S1KKH6150X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);

// ✅ Firebase Auth
export const auth = getAuth(app);

// ✅ Google Provider
export const provider = new GoogleAuthProvider();

// ✅ Firestore Database
export const db = getFirestore(app);

// ✅ Export app if needed
export default app;