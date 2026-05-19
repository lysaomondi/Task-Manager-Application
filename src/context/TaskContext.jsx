import { createContext, useContext, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const subscribeToTasks = (userId, callback) => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(data);

      if (callback) {
        callback(data);
      }
    });
  
    return unsubscribe;
  };

  const addTask = async (task) => {
    if (!task.title.trim()) return;

    await addDoc(collection(db, "tasks"), {
      title: task.title.trim(),
      status: "pending",
      favorite: false,
      userId: task.userId,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };
  
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "tasks", id), { status });
  };  

  const toggleFavorite = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      favorite: !task.favorite,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        subscribeToTasks,
        addTask,
        deleteTask,
        updateStatus,
        toggleFavorite,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
