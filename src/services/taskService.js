import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";


// =======================
// ADD TASK
// =======================
export const addTask = async (title, userId) => {
  try {
    return await addDoc(collection(db, "tasks"), {
      title,
      completed: false,
      favorite: false,
      userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log("Error adding task:", error);
  }
};


// =======================
// REAL-TIME TASKS (FIX)
// =======================
export const subscribeToTasks = (userId, callback) => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(tasks);
  });
};


// =======================
// GET TASKS (ONE-TIME FETCH - OPTIONAL)
// =======================
export const getTasks = async (userId) => {
  try {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return [];
  }
};


// =======================
// TOGGLE DONE
// =======================
export const toggleTask = async (task) => {
  const ref = doc(db, "tasks", task.id);

  return await updateDoc(ref, {
    completed: !task.completed,
  });
};


// =======================
// TOGGLE FAVORITE
// =======================
export const toggleFavorite = async (task) => {
  const ref = doc(db, "tasks", task.id);

  return await updateDoc(ref, {
    favorite: !task.favorite,
  });
};


// =======================
// DELETE TASK
// =======================
export const deleteTask = async (id) => {
  const ref = doc(db, "tasks", id);
  return await deleteDoc(ref);
};