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
    setForm({
      brandEmail: "",
      influencerEmail: "",
      date: "",
      time: "",
      mode: "online",
      location: "",
      link: "",
    });
    alert("Meeting scheduled! Emails sent to both parties.");
  };

  const handleDelete = async (id) => {
    await API.delete(`/meetings/${id}`);
    fetchMeetings();
  };

  const updateStatus = async (id, newStatus) => {
    await API.patch(`/meetings/${id}/status`, { status: newStatus });
    fetchMeetings();
  };

  const renderStatusSeal = (status) => {
    if (status === "successful") {
      return (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-bold rounded-full">
          Successful Deal
        </div>
      );
    } else if (status === "cancelled") {
      return (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
          Cancelled Deal
        </div>
      );
    } else {
      return (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded-full">
          Pending
        </div>
      );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-lime-400 mb-6">
          Schedule a Meeting
        </h1>

        {/* Updated Layout: Form + Image Card Side-by-Side */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl md:flex gap-6">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 grid grid-cols-1 gap-4"
          >
            <input
              name="brandEmail"
              type="email"
              value={form.brandEmail}
              placeholder="Brand Email"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}
            />
            <input
              name="influencerEmail"
              type="email"
              value={form.influencerEmail}
              placeholder="Influencer Email"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}
            />
            <input
              name="date"
              type="date"
              value={form.date}
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}
            />
            <input
              name="time"
              type="time"
              value={form.time}
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}
            />
            <select
              name="mode"
              value={form.mode}
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            {form.mode === "offline" ? (
              <input
                name="location"
                value={form.location}
                placeholder="Location details"
                className="p-3 bg-gray-800 rounded"
                onChange={handleChange}
              />
            ) : (
              <input
                name="link"
                value={form.link}
                placeholder="Zoom/Meet link"
                className="p-3 bg-gray-800 rounded"
                onChange={handleChange}
              />
            )}

            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 rounded"
            >
              Schedule Meeting
            </button>
          </form>

          {/* Right Side Image Card (only visible on md+) */}
          <div className="hidden md:grid grid-cols-2 gap-4 w-80">
            <img
              src="https://www.influencer.in/wp-content/themes/influencer-2022/images/livecampaigns-banner.png"
              alt="Meeting"
              className="rounded-lg w-full h-40 object-cover"
            />
            <img
              src="https://openinfluence.com/wp-content/uploads/Fashion-Header-Image.jpg"
              alt="Business"
              className="rounded-lg w-full h-40 object-cover"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/007/938/818/non_2x/concept-illustration-of-two-business-partners-handshaking-meeting-partnership-business-deal-agreement-signing-a-contract-flat-cartoon-style-free-vector.jpg"
              alt="Influencer"
              className="rounded-lg w-full h-40 object-cover"
            />
            <img
              src="https://i.pinimg.com/736x/67/2b/80/672b8012fc8b3727e98ecce3152ab127.jpg"
              alt="Deal"
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-lime-400 mt-10 mb-4">
          Scheduled Meetings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((m) => (
            <div
              key={m._id}
              className="relative bg-gray-800 border border-lime-500 p-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700"
            >
              {renderStatusSeal(m.status)}

              <div className="space-y-1">
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

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus(m._id, "successful")}
                  className="bg-lime-400 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Mark as Successful
                </button>
                <button
                  onClick={() => updateStatus(m._id, "cancelled")}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Cancel Deal
                </button>
                <button
                  onClick={() => updateStatus(m._id, "pending")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919601675408"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg z-50 animate-bounce-slow"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="hidden sm:inline font-medium">Let's Chat</span>
      </a>

      <Footer />
    </div>
  );
}
