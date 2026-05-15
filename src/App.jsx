import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/tasks"
        element={<MyTasks />}
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />
    </Routes>
  );
}