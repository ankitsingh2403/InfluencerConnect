import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-lime-400">
          InfluencerConnect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <Link to="/influencers" className="hover:text-lime-400">Influencers</Link>
          <Link to="/campaigns" className="hover:text-lime-400">Campaigns</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <button
              onClick={handleProfileClick}
              className="text-white text-2xl hover:text-lime-400"
              title="Admin Dashboard"
            >
              <FaUserCircle />
            </button>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-lime-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-black text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4 pt-2 space-y-3">
          <Link to="/" onClick={toggleMenu} className="block hover:text-lime-400">Home</Link>
          <Link to="/influencers" onClick={toggleMenu} className="block hover:text-lime-400">Influencers</Link>
          <Link to="/campaigns" onClick={toggleMenu} className="block hover:text-lime-400">Campaigns</Link>

          {isLoggedIn && (
            <button
              onClick={() => {
                toggleMenu();
                handleProfileClick();
              }}
              className="w-full flex items-center justify-center text-white text-lg gap-2"
            >
              <FaUserCircle className="text-2xl" /> Dashboard
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="block w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 text-sm text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block w-full mt-2 bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 text-sm text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block w-full border border-white text-white py-2 rounded-md font-semibold hover:bg-white hover:text-black text-sm text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
