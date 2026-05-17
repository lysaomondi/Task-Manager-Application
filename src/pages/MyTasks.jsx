import { Link } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { useTasks } from "../context/TaskContext";

export default function MyTasks() {
  const { tasks, toggleTask, toggleFavorite, deleteTask } = useTasks();


  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-pink-100">
      
      {/* SIDEBAR */}
      <div className="hidden md:flex flex-col w-64 bg-[#120329] text-white p-6">
        <h2 className="text-3xl font-bold mb-10 text-pink-500">
          Task-Manager
        </h2>

        <ul className="space-y-6 text-lg">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/tasks">My Tasks</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
         <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <Navbar />

        <h1 className="text-4xl font-bold text-slate-800 mt-8 mb-6 text-center">
          My Tasks
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* TASK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                toggleTask={toggleTask}
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