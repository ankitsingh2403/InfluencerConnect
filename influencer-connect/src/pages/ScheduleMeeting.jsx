// src/pages/ScheduleMeeting.jsx
import { useState, useEffect } from "react";
import API from "../services/api";
import WhatsAppChatBot from "../components/WhatsAppChatBot";

export default function ScheduleMeeting() {
  const [form, setForm] = useState({
    brandEmail: "",
    influencerEmail: "",
    date: "",
    time: "",
    mode: "online",
    location: "",
    link: ""
  });
  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    const res = await API.get("/api/meetings/all");
    setMeetings(res.data);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/api/meetings/schedule", form);
    fetchMeetings();
    alert("Meeting scheduled and notifications sent!");
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/meetings/${id}`);
    fetchMeetings();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-lime-400 mb-4">Schedule a Meeting</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input className="p-2 bg-gray-800 rounded" placeholder="Brand Email" onChange={(e) => setForm({ ...form, brandEmail: e.target.value })} />
        <input className="p-2 bg-gray-800 rounded" placeholder="Influencer Email" onChange={(e) => setForm({ ...form, influencerEmail: e.target.value })} />
        <input type="date" className="p-2 bg-gray-800 rounded" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input type="time" className="p-2 bg-gray-800 rounded" onChange={(e) => setForm({ ...form, time: e.target.value })} />

        <select className="p-2 bg-gray-800 rounded" onChange={(e) => setForm({ ...form, mode: e.target.value })}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        {form.mode === "offline" ? (
          <input className="p-2 bg-gray-800 rounded" placeholder="Location Details" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        ) : (
          <input className="p-2 bg-gray-800 rounded" placeholder="Meeting/Zoom Link" onChange={(e) => setForm({ ...form, link: e.target.value })} />
        )}

        <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded col-span-full">
          Schedule
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-lime-400 mt-10 mb-4">Upcoming Meetings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-lime-500 rounded-xl">
          <thead>
            <tr className="text-left text-lime-300">
              <th className="p-3 border-b border-lime-500">Brand</th>
              <th className="p-3 border-b border-lime-500">Influencer</th>
              <th className="p-3 border-b border-lime-500">Date</th>
              <th className="p-3 border-b border-lime-500">Time</th>
              <th className="p-3 border-b border-lime-500">Mode</th>
              <th className="p-3 border-b border-lime-500">Details</th>
              <th className="p-3 border-b border-lime-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((m, idx) => (
              <tr key={idx} className="text-gray-300 hover:bg-gray-800">
                <td className="p-3">{m.brandEmail}</td>
                <td className="p-3">{m.influencerEmail}</td>
                <td className="p-3">{m.date}</td>
                <td className="p-3">{m.time}</td>
                <td className="p-3 capitalize">{m.mode}</td>
                <td className="p-3">
                  {m.mode === "offline" ? (
                    <span>{m.location}</span>
                  ) : (
                    <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Join</a>
                  )}
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(m._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WhatsAppChatBot />
    </div>
  );
}