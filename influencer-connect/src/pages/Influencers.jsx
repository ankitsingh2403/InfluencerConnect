// src/pages/Influencers.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";

export default function Influencers() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    instagram: "",
    followers: "",
    location: "",
  });
  const [influencers, setInfluencers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    axios.get("https://influencerconnect1.onrender.com/api/influencers").then((res) => {
      setInfluencers(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      influencers.filter((inf) =>
        inf.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setPage(1);
  }, [search, influencers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = form.instagram.trim().replace(/^@/, "");
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      alert("Enter valid Instagram username");
      return;
    }
    const payload = {
      ...form,
      instagram: `https://instagram.com/${username}`,
      profilePic: `https://unavatar.io/instagram/${username}`,
    };
    await axios.post("https://influencerconnect1.onrender.com/api/influencers", payload);
    const res = await axios.get("https://influencerconnect1.onrender.com/api/influencers");
    setInfluencers(res.data);
    setForm({ name: "", category: "", instagram: "", followers: "", location: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://influencerconnect1.onrender.com/api/influencers/${id}`);
    setInfluencers(influencers.filter((i) => i._id !== id));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-lime-400 mb-6">Influencer Dashboard</h1>

        {/* Registration Count */}
        <div className="mb-6 animate-bounce">
          <div className="bg-gray-900 rounded-xl p-4 border border-lime-500 w-fit shadow-xl hover:scale-105 transition-transform">
            <p className="text-xl font-semibold">Total Registered: {influencers.length}</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-900 p-6 rounded-xl border border-gray-700 mb-10"
        >
          <input
            required
            type="text"
            placeholder="Name"
            className="bg-gray-800 p-2 rounded text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Category"
            className="bg-gray-800 p-2 rounded text-white"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Instagram Username"
            className="bg-gray-800 p-2 rounded text-white"
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />
          <input
            required
            type="number"
            placeholder="Followers"
            className="bg-gray-800 p-2 rounded text-white"
            value={form.followers}
            onChange={(e) => setForm({ ...form, followers: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Location"
            className="bg-gray-800 p-2 rounded text-white"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <button type="submit" className="bg-lime-500 text-black rounded p-2 font-bold">
            Add Influencer
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="Search influencers..."
          className="bg-gray-800 p-2 rounded text-white mb-4 w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Influencer Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.slice((page - 1) * perPage, page * perPage).map((i) => (
            <div
              key={i._id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-lime-500 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:z-10 group relative"
              onClick={() => setSelectedProfile(i)}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={i.profilePic || "https://i.pravatar.cc/100"}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-lime-400 shadow group-hover:animate-spin"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-lime-400">{i.name}</p>
                  <p className="text-yellow-400 text-sm">👥 {i.followers.toLocaleString()} followers</p>
                  <p className="text-gray-300 text-sm">{i.category}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <a
                  href={i.instagram}
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {i.instagram.replace("https://instagram.com/", "@")} 
                </a>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white text-black px-2 py-1 rounded shadow">
                  View Instagram
                </div>
                <p className="text-gray-400">📍 {i.location}</p>
              </div>
              <button
                onClick={() => handleDelete(i._id)}
                className="text-red-400 mt-3 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Profile Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl border border-lime-500 max-w-md w-full relative">
              <button onClick={() => setSelectedProfile(null)} className="absolute top-2 right-4 text-white text-xl">&times;</button>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedProfile.profilePic}
                  className="w-20 h-20 rounded-full border-2 border-lime-400"
                  alt="profile"
                />
                <div>
                  <p className="text-xl font-bold text-lime-400">{selectedProfile.name}</p>
                  <p className="text-gray-400">{selectedProfile.category}</p>
                </div>
              </div>
              <p className="text-yellow-400 mb-2">👥 {selectedProfile.followers.toLocaleString()} followers</p>
              <p className="text-gray-300 mb-2">📍 {selectedProfile.location}</p>
              <a
                href={selectedProfile.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Visit Instagram Profile
              </a>
              <div className="mt-4">
                <p className="text-sm text-gray-400 italic">[Placeholder for follower trend/engagement chart]</p>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-4">
          {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded text-sm ${
                page === i + 1 ? "bg-lime-500 text-black" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="mt-20 relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">What Influencers Say</h2>
          <div className="flex space-x-6 animate-marqueeSlow relative">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="bg-gray-800 w-72 p-4 rounded-xl border border-gray-700 transform transition-transform hover:scale-105 relative shadow-xl"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="animate-ping w-4 h-4 bg-lime-400 rounded-full absolute top-0 left-0"></div>
                  <div className="animate-ping w-4 h-4 bg-pink-400 rounded-full absolute bottom-0 right-0"></div>
                </div>
                <img
                  src={`https://i.pravatar.cc/100?img=${id}`}
                  alt="avatar"
                  className="w-16 h-16 rounded-full mb-3 mx-auto"
                />
                <p className="text-gray-300 text-center text-sm">
                  "Influencer Connect helped me grow massively in my niche. Great support and brand deals!"
                </p>
                <p className="text-lime-400 mt-2 font-semibold text-center">@creator{id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
