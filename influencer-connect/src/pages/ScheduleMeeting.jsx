
import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";

export default function ScheduleMeeting() {
  const [form, setForm] = useState({
    brandEmail: "",
    influencerEmail: "",
    date: "",
    time: "",
    mode: "online",
    location: "",
    link: "",
  });
  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    const res = await API.get("/meetings/all");
    setMeetings(res.data);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.brandEmail || !form.influencerEmail) {
      return alert("Please add both emails");
    }
    await API.post("/meetings/schedule", form);
    fetchMeetings();
    alert("Meeting scheduled! Emails sent to both parties.");
  };

  const handleDelete = async (id) => {
    await API.delete(`/meetings/${id}`);
    fetchMeetings();
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-lime-400 mb-6">
          Schedule a Meeting
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="brandEmail"
            type="email"
            placeholder="Brand Email"
            className="p-2 bg-gray-800 rounded"
            onChange={handleChange}
          />
          <input
            name="influencerEmail"
            type="email"
            placeholder="Influencer Email"
            className="p-2 bg-gray-800 rounded"
            onChange={handleChange}
          />
          <input
            name="date"
            type="date"
            className="p-2 bg-gray-800 rounded"
            onChange={handleChange}
          />
          <input
            name="time"
            type="time"
            className="p-2 bg-gray-800 rounded"
            onChange={handleChange}
          />
          <select
            name="mode"
            className="p-2 bg-gray-800 rounded"
            onChange={handleChange}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {form.mode === "offline" ? (
            <input
              name="location"
              placeholder="Location details"
              className="p-2 bg-gray-800 rounded"
              onChange={handleChange}
            />
          ) : (
            <input
              name="link"
              placeholder="Zoom/Meet link"
              className="p-2 bg-gray-800 rounded"
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            className="col-span-full bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 rounded"
          >
            Schedule Meeting
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-lime-400 mt-10 mb-4">
          Scheduled Meetings
        </h2>

        <div className="space-y-4">
          {meetings.map((m) => (
            <div
              key={m._id}
              className="bg-gray-900 p-4 rounded-xl border border-lime-500 shadow-lg flex justify-between"
            >
              <div>
                <p>
                  <strong>Brand:</strong> {m.brandEmail}
                </p>
                <p>
                  <strong>Influencer:</strong> {m.influencerEmail}
                </p>
                <p>
                  <strong>Date:</strong> {m.date}
                </p>
                <p>
                  <strong>Time:</strong> {m.time}
                </p>
                <p>
                  <strong>Mode:</strong> {m.mode}
                </p>
                <p>
                  <strong>Details:</strong>{" "}
                  {m.mode === "offline" ? (
                    m.location
                  ) : (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Join
                    </a>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleDelete(m._id)}
                className="bg-lime-400 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919601675408" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      <Footer />
    </div>
  );
}
