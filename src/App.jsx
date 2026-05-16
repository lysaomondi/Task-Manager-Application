import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Favorites from "./pages/Favorites";


function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {children}
    </div>
  );
}


export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />

      
      <Route
        path="/tasks"
        element={
          <AppLayout>
            <MyTasks />
          </AppLayout>
        }
      />

      
      <Route
        path="/favorites"
        element={
          <AppLayout>
            <Favorites />
          </AppLayout>
        }
      />

      
      <Route
        path="*"
        element={<Navigate to="/dashboard" />}
      />

    </Routes>
  );
}