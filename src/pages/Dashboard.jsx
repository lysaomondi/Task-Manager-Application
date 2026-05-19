import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    subscribeToTasks,
    addTask,
    updateStatus,
    deleteTask,
    toggleFavorite,
  } = useTasks();

  const [task, setTask] = useState("");
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = subscribeToTasks(user.uid, setUserTasks);

    return () => unsubscribe();
  }, [user]);

  const recentTasks = [...userTasks]
    .filter(Boolean)
    .sort((a, b) => {
      const aTime = a.createdAt?.seconds || a.createdAt || 0;
      const bTime = b.createdAt?.seconds || b.createdAt || 0;
      return bTime - aTime;
    })
    .slice(0, 6);

  
  const handleAddTask = () => {
    if (!user?.uid) {
      navigate("/login");
      return;
    }

    if (!task.trim()) return;

    addTask({
      title: task,
      userId: user.uid,
    });

    setTask("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-pink-100">
      <div className="hidden md:flex flex-col w-64 bg-[#120329] text-white p-6">
        <h2 className="text-3xl font-bold mb-10 text-pink-500">
          Task-Manager
        </h2>

        <ul className="space-y-6 text-lg">
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/tasks">
              My Tasks
            </Link>
          </li>

          <li>
            <Link to="/favorites">
               Favorites
            </Link>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        <Navbar />

        {/* ADD TASK */}
        <div className="bg-white p-8 rounded-3xl shadow-sm mt-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            Add New Task
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 p-4 rounded-2xl border"
            />

            <button
              onClick={handleAddTask}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* RECENT TASKS */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Recent Tasks
          </h2>

          {recentTasks.length === 0 ? (
            <p className="text-center text-gray-500">
              No tasks yet
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  updateStatus={updateStatus}
                  toggleFavorite={toggleFavorite}
                  deleteTask={deleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}