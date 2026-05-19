import {useTasks} from "../context/TaskContext";

export default function TaskCard({ task }) {
  const {updateStatus, deleteTask, toggleFavorite} = useTasks();

  return(
    <div 
    className={`bg-white p-5 rounded-2xl shadow-lg border-l-4
      ${
        task.status === "completed"
          ? "border-green-500"
          : task.status === "pending"
          ? "border-yellow-500"
          : "border-blue-500"
      }
    `}
    >
    <div className="flex justify-between items-center mb-4">
      <h2 
      className={`text-xl font-bold 
        ${
          task.status === "completed"
            ? "line-through text-gray-400"
            : "text-slate-800"
        }
      `}
      >
        {task.title}
      </h2>

      <button 
      onClick={() => toggleFavorite(task)}
      className="text-2xl"
      >
        {task.favorite ? "⭐" : "☆"}
      </button>
    </div>

    <span 
    className={`px-3 py-1 rounded-full text-sm font-semibold
      ${
        task.status === "completed"
          ? "bg-green-100 text-green-700"
          : task.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-blue-100 text-blue-700"
      }
    `}
    >
      {task.status}
    </span>

    <div className="mt-5 flex flex-wrap gap-2">
      <button 
      onClick={() => updateStatus(task.id, "pending")}
      className={`px-3 py-2 rounded-lg text-sm font-medium
        ${
          task.status === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-yellow-100 text-yellow-700"
            }
      `}
      >
         Pending
      </button> 

      <button
      onClick={() => updateStatus(task.id, "inprogress")}
      className={`px-3 py-2 rounded-lg text-sm font-medium
        ${
          task.status === "inprogress"
            ? "bg-blue-500 text-white"
            : "bg-blue-100 text-blue-700"
            }
      `}
      >
         In Progress
      </button>


      <button
      onClick={() => updateStatus(task.id, "completed")}
      className={`px-3 py-2 rounded-lg text-sm font-medium
        ${
          task.status === "completed"
            ? "bg-green-500 text-white"
            : "bg-green-100 text-green-700"
            }
      `}
      >
         Completed
      </button>
     </div>

      <button
      onClick={() => deleteTask(task.id)}
      className="mt-5 w-full py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 transition text-white"
      >
         Delete
      </button>
    </div>
   
          );
        }
    
  