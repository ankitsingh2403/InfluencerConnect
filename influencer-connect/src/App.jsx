// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Influencers from "./pages/Influencers";
import Campaigns from "./pages/Campaigns";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/influencers" element={<Influencers />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="*" element={<div className="text-white p-10">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
