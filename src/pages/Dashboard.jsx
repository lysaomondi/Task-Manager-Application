import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import Login from "../pages/Login";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const {
    tasks,
    addTask,
    toggleTask,
    toggleFavorite,
    deleteTask,
  } = useTasks();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [task, setTask] = useState("");

  // FIX: safe recent tasks sorting
  const recentTasks = [...tasks]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 3);

  // FIX: pass user.uid to Firestore
  const handleAddTask = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!task.trim()) return;

    await addTask(task, user.uid); 

    setTask("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-pink-100">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-10 text-pink-400">
          TaskFlow
        </h2>

        <ul className="space-y-6 text-lg">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/tasks">My Tasks</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <Navbar />

        {/* Add Task */}
        <div className="bg-white p-8 rounded-3xl shadow-sm mt-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            Add New Task
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={handleAddTask}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Recent Tasks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                toggleFavorite={toggleFavorite}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}