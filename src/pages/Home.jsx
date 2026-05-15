import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 to-pink-100 text-center px-6">
      
      <h1 className="text-6xl font-bold text-slate-800 mb-6">
        Task Manager Dashboard
      </h1>

      <p className="text-gray-600 text-lg max-w-xl mb-8">
        Organize tasks, projects, and productivity workflows with Firebase-powered cloud storage.
      </p>

      <Link to="/login">
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl text-lg transition shadow-lg">
          Get Started
        </button>
      </Link>
    </div>
  );
}