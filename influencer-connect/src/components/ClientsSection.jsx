// src/components/ClientsSection.jsx
import { useEffect, useState } from "react";

const testimonials = [
  { quote: "Influencer Connect helped me land amazing brand deals!", author: "— Riya, Fashion Blogger" },
  { quote: "We scaled our influencer reach by 3x in a month.", author: "— Aman, Marketing Head" },
  { quote: "Seamless experience, excellent support.", author: "— Kunal, Tech Reviewer" },
  { quote: "Collaborations were easy and fast!", author: "— Shruti, Lifestyle Influencer" },
  { quote: "The UI is intuitive and easy to use.", author: "— Aarav, Content Creator" },
  { quote: "Connected with brands I'd never reach before!", author: "— Neha, Beauty Influencer" },
  { quote: "The platform is a game-changer for influencer marketing.", author: "— Dev, Growth Marketer" },
  { quote: "A must-have tool for any serious content creator.", author: "— Isha, Fitness Influencer" },
  { quote: "Super smooth onboarding and campaign setup!", author: "— Rohan, Startup Founder" },
  { quote: "The quality of leads improved significantly.", author: "— Kavya, Brand Strategist" },
  { quote: "Brilliant support and seamless integrations.", author: "— Mehul, eCom Brand Owner" },
  { quote: "Got my first paid collab within days!", author: "— Tanya, Micro Influencer" },
];

export default function ClientsSection() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 6) % testimonials.length);
    }, 6000); // change batch every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Get next 6 testimonials, wrap around if needed
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 6).length === 6
    ? testimonials.slice(startIndex, startIndex + 6)
    : [...testimonials.slice(startIndex), ...testimonials.slice(0, 6 - (testimonials.length - startIndex))];

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/40?img=${i}`}
            className="w-10 h-10 rounded-full"
            alt={`user-${i}`}
          />
        ))}
      </div>
      <p className="text-white font-semibold text-lg">15k+ Happy Collaborations</p>
      <p className="text-gray-400 text-sm mb-4">
        Join creators and brands scaling to new heights with Influencer Connect.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white transition-all duration-500 ease-in-out">
        {visibleTestimonials.map((t, idx) => (
          <div key={idx} className="bg-gray-800 p-3 rounded-lg">
            <p className="italic">"{t.quote}"</p>
            <p className="text-gray-400 text-xs mt-1">{t.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}