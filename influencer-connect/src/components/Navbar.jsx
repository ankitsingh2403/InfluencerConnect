import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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

        {/* Login Button (always visible) */}
        <div className="hidden md:block">
          <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 text-sm">
            Login
          </button>
        </div>

        {/* Hamburger Icon for mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4 pt-2 space-y-3">
          <Link to="/" onClick={toggleMenu} className="block hover:text-lime-400">
            Home
          </Link>
          <Link to="/influencers" onClick={toggleMenu} className="block hover:text-lime-400">
            Influencers
          </Link>
          <Link to="/campaigns" onClick={toggleMenu} className="block hover:text-lime-400">
            Campaigns
          </Link>
          <button
            onClick={toggleMenu}
            className="w-full mt-2 bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 text-sm"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
