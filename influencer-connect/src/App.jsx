// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Influencers from './pages/Influencers';
import Campaigns from './pages/Campaigns';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ScheduleMeeting from './pages/ScheduleMeeting'; // 👈 NEW

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/influencers" element={<Influencers />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      {/* Protected Admin Routes */}
      <Route
        path="/dashboard"
        element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin/schedule-meeting"
        element={token ? <ScheduleMeeting /> : <Navigate to="/login" replace />}
      />

      <Route path="*" element={<div className="text-white p-10">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
