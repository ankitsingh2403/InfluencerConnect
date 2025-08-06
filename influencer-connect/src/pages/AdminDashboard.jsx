
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (!userString || userString === "undefined" || userString === "null") {
      console.warn("User not found or invalid");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userString);
      if (user && user.email) {
        setAdmin(user);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!admin) return null;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-lime-400">
            Welcome, {admin.name || "Admin"}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-lime-500 shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2 text-lime-400">Manage Influencers</h2>
            <p className="text-gray-300">View, approve, or remove influencer profiles.</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-lime-500 shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2 text-lime-400">Brand Collaborations</h2>
            <p className="text-gray-300">Track and approve brand-influencer campaigns.</p>
          </div>

          <div
            onClick={() => {
              console.log("Navigating to schedule meeting");
              navigate("/admin/schedule-meeting");
            }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-lime-500 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 text-lime-400">Schedule Meetings</h2>
            <p className="text-gray-300">Book calls or appointments between influencers and brands.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


