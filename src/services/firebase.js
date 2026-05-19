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

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export default app;