import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-lime-400">
          InfluencerConnect
        </Link>
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <Link to="/influencers" className="hover:text-lime-400">Influencers</Link>
          <Link to="/campaigns" className="hover:text-lime-400">Campaigns</Link>
        </nav>
        <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 text-sm">
          Login
        </button>
      </div>
    </header>
  );
}
