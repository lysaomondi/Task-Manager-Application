import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const tasksRef = collection(db, "tasks");

  // ✅ REAL-TIME SYNC (MAIN FIX)
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const fetchedTasks = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // only this user's tasks
        .filter((task) => task.userId === user.uid);

      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ ADD TASK (NO MANUAL REFRESH NEEDED)
  const addTask = async (title) => {
    if (!title.trim() || !user) return;

    await addDoc(tasksRef, {
      title,
      userId: user.uid, // 🔥 IMPORTANT FIX
      completed: false,
      favorite: false,
      createdAt: new Date(),
    });
  };

  // TOGGLE COMPLETE
  const toggleTask = async (id, completed) => {
    const taskDoc = doc(db, "tasks", id);

    await updateDoc(taskDoc, {
      completed: !completed,
    });
  };

  // TOGGLE FAVORITE
  const toggleFavorite = async (id, favorite) => {
    const taskDoc = doc(db, "tasks", id);

    await updateDoc(taskDoc, {
      favorite: !favorite,
    });
  };

  // DELETE
  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);

    await deleteDoc(taskDoc);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        toggleFavorite,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);