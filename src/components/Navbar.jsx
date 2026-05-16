import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm">
      
      <h1 className="text-3xl font-bold text-slate-800">
        TaskFlow
      </h1>

      <div className="flex items-center gap-4">
        
        {user && (
          <>

            <button
              onClick={logout}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}