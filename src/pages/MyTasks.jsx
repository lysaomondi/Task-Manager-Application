import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export default function MyTasks() {
  const { user } = useAuth();

  const {
    subscribeToTasks,
    updateStatus,
    toggleFavorite,
    deleteTask,
  } = useTasks();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔥 REAL-TIME FIREBASE SYNC
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToTasks(user.uid, setTasks);

    return () => unsubscribe();
  }, [user]);

  // 🔍 FILTER TASKS (search + status)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-pink-100">

      <div className="hidden md:flex flex-col w-64 bg-[#120329] text-white p-6">
        <h2 className="text-3xl font-bold mb-10 text-pink-500">
          Task-Manager
        </h2>

        <ul className="space-y-6 text-lg">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/tasks">My Tasks</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <Navbar />

        <h1 className="text-4xl font-bold text-slate-800 mt-8 mb-6 text-center">
          My Tasks
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap mb-10">

          <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-lg font-semibold
            ${
              filter === "all"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700"
            }
            `}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-2 rounded-lg font-semibold
              ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700"
              }
              `}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("inprogress")}
            className={`px-5 py-2 rounded-lg font-semibold
              ${
                filter === "inprogress"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }
              `}
          >
            In Progress
          </button>
      
      <button
        onClick={() => setFilter("completed")}
        className={`px-5 py-2 rounded-lg font-semibold
          ${
            filter === "completed"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700"
          }
          `}
      >
        Completed
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {filteredTasks.length >0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateStatus={updateStatus}
            toggleFavorite={toggleFavorite}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No tasks found
        </p>
      )}
    </div>
  </div>
</div>
  );
} 
        