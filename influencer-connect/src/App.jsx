import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Influencers from "./pages/Influencers";
import Campaigns from "./pages/Campaigns";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/influencers" element={<Influencers />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
      />
      
      {/* Fallback Route */}
      <Route path="*" element={<div className="text-white p-10">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
