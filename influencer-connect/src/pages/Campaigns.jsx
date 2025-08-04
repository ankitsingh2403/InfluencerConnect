// src/pages/Campaigns.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../components/Footer";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [formData, setFormData] = useState({
    brandName: "",
    objective: "",
    budget: "",
    startDate: "",
    endDate: ""
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalInfluencers, setModalInfluencers] = useState([]);

  useEffect(() => {
    fetchCampaigns();
    fetchInfluencers();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("https://influencerconnect1.onrender.com/api/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("https://influencerconnect1.onrender.com/api/influencers");
      setInfluencers(res.data);
    } catch (err) {
      console.error("Error fetching influencers:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCampaign = {
      ...formData,
      influencers: selectedInfluencers.map((inf) => inf.value)
    };

    try {
      await axios.post("https://influencerconnect1.onrender.com/api/campaigns", newCampaign);
      fetchCampaigns();
      setFormData({ brandName: "", objective: "", budget: "", startDate: "", endDate: "" });
      setSelectedInfluencers([]);
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await axios.delete(`https://influencerconnect1.onrender.com/api/campaigns/${id}`);
        fetchCampaigns();
      } catch (err) {
        console.error("Error deleting campaign:", err);
      }
    }
  };

  const testimonials = [
    { image: "https://cdn.dribbble.com/userupload/33247681/file/original-de62d39721a6d66beb38865efc10a186.gif", name: "Nike", tagline: "Just Do It" },
    { image: "https://i.pinimg.com/originals/be/cb/ca/becbca09cc81c9ecd1ce133c836b3f25.gif", name: "Apple", tagline: "Think Different" },
    { image: "https://cdn.dribbble.com/userupload/34378341/file/original-e9e9ae1ec33ec8eee369b1c353b5d4dc.gif", name: "Coca-Cola", tagline: "Taste the Feeling" },
    { image: "https://cdn.dribbble.com/userupload/32336676/file/original-2c8c2bad74bc2f35e1b078023fa74f30.gif", name: "Adidas", tagline: "Impossible is Nothing" },
    { image: "https://cdn.dribbble.com/userupload/40918746/file/original-b87776986e2024ab6bb7439e37c342c6.gif", name: "Samsung", tagline: "Inspire the World, Create the Future" },
    { image: "https://cdn.dribbble.com/userupload/23631797/file/original-7a2b31fe0a593a8525050464ab3b2d98.gif", name: "Microsoft", tagline: "Empower Every Person and Every Organization" },
    { image: "https://cdn.dribbble.com/userupload/23828810/file/original-e4b24bda6966fe3e908d1a1aaf0ba138.gif", name: "Amazon", tagline: "Work Hard, Have Fun, Make History" },
    { image: "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyNW1hZjQwajF2cnZmcXBuZHYzYTdyZGVvdHI0YzRwYzlocHFsdzhmNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5NPhdqmyRxn8I/source.gif", name: "Google", tagline: "Organize the World's Information" },
    { image: "https://cdn.dribbble.com/userupload/35193119/file/original-5b3017646682be495861ba95227c6985.gif", name: "Facebook", tagline: "Connect with Friends and the World Around You" },
    { image: "https://cdn.dribbble.com/userupload/42262899/file/original-aa38bfe6376d3f01f775f6ee71fe94c7.gif", name: "Twitter", tagline: "What's Happening" }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-lime-400 mb-6">Manage Campaigns</h1>

        {/* Campaign Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-8 rounded-2xl shadow-xl">
          <input name="brandName" value={formData.brandName} onChange={handleInputChange} placeholder="Brand Name" className="p-3 rounded bg-gray-800 text-white" required />
          <input name="objective" value={formData.objective} onChange={handleInputChange} placeholder="Objective" className="p-3 rounded bg-gray-800 text-white" required />
          <input name="budget" value={formData.budget} onChange={handleInputChange} placeholder="Budget" className="p-3 rounded bg-gray-800 text-white" required />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="p-3 rounded bg-gray-800 text-white" required />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="p-3 rounded bg-gray-800 text-white" required />

          <div className="md:col-span-2">
            <Select
              isMulti
              options={influencers.map((inf) => ({ value: inf._id, label: inf.name }))}
              value={selectedInfluencers}
              onChange={setSelectedInfluencers}
              placeholder="Select Influencers"
              className="text-black"
            />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full p-3 bg-lime-500 hover:bg-lime-600 text-black font-bold rounded-xl transition-all">
              Add Campaign
            </button>
          </div>
        </form>

        {/* Campaigns List */}
        <h2 className="text-2xl mt-16 mb-6 font-semibold">Registered Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp._id}
              className="bg-gray-800 p-6 rounded-xl shadow-md relative group"
            >
              <button
                onClick={() => handleDelete(camp._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold hidden group-hover:block"
              >
                ×
              </button>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setModalInfluencers(camp.influencers);
                  setOpenModal(true);
                }}
              >
                <h3 className="text-xl font-bold text-lime-400 mb-2">{camp.brandName}</h3>
                <p className="text-sm text-gray-300">{camp.objective}</p>
                <p className="mt-2 text-sm">Budget: ₹{camp.budget}</p>
                <p className="text-sm">Duration: {camp.startDate?.slice(0, 10)} to {camp.endDate?.slice(0, 10)}</p>
                <p className="text-sm mt-2">Influencers Assigned: {camp.influencers?.length || 0}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Assigned Influencers */}
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white text-black w-full max-w-lg p-6 rounded-2xl relative">
              <button
                className="absolute top-2 right-3 text-black text-lg font-bold"
                onClick={() => setOpenModal(false)}
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4">Assigned Influencers</h3>
              <ul className="space-y-2">
                {modalInfluencers.map((inf, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-lg">{inf.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        <h2 className="text-3xl font-bold mt-20 mb-8 text-center text-lime-400">Trusted by Top Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {testimonials.map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-lime-500/50 transition-all"
            >
              <img src={brand.image} alt={brand.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-lime-400" />
              <h4 className="text-xl font-bold text-lime-300">{brand.name}</h4>
              <p className="text-gray-300 text-sm italic">"{brand.tagline}"</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
