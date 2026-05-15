import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function TaskCard({
  task,
  toggleTask,
  toggleFavorite,
  deleteTask,
}) {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-slate-100">
      
      <div className="flex justify-between items-start mb-4">
        
        <h3
          className={`text-xl font-semibold ${
            task.completed
              ? "line-through text-gray-400"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </h3>

        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            toggleFavorite(
              task.id,
              task.favorite
            );
          }}
          className="text-2xl"
        >
          {task.favorite ? "⭐" : "☆"}
        </button>
      </div>

      <p className="text-gray-500 mb-6">
        {task.completed
          ? "Completed"
          : "Pending"}
      </p>

      <div className="flex gap-3">
        
        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            toggleTask(
              task.id,
              task.completed
            );
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
        >
          Done
        </button>

        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
              return;
            }

            deleteTask(task.id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}