import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { useTasks } from "../context/TaskContext";

export default function Favorites() {
  const {
    tasks,
    toggleTask,
    toggleFavorite,
    deleteTask,
  } = useTasks();

  const favoriteTasks = tasks.filter(
    (task) => task.favorite
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-pink-100">
      
      <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6">
        
        <h2 className="text-3xl font-bold mb-10 text-pink-400">
          TaskFlow
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
           <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        
        <Navbar />

        <h1 className="text-4xl font-bold text-slate-800 mt-8 mb-8 text-center">
          Favorite Tasks
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {favoriteTasks.map((task) => (
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
  );
}