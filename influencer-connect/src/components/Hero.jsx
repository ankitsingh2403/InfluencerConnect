// src/components/Hero.jsx
import React from "react";
import img1 from "../assets/img1.png"; // Adjust the import path as necessary
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-16 max-w-7xl mx-auto">
      {/* Left Content: Text Section */}
      <div className="flex-1 text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Influencer <span className="text-lime-400">Success</span>
          <br /> Starts Here
        </h1>
        <p className="text-gray-300 mt-6 max-w-md text-lg">
          Discover top influencers and create high-converting collaborations.
          Join thousands of brands & influencers to amplify your campaigns
          effortlessly.
        </p>

        {/* Button wrapped in div to separate it from the paragraph */}
        <div className="mt-8">
          <Link
            to="/campaigns"
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-lg transition duration-200 inline-block"
          >
            Get Started Now →
          </Link>
        </div>
      </div>
      {/* Right Content: Placeholder Graphic */}
      <div className="flex-1 mt-12 md:mt-0 md:ml-12 w-full flex justify-center">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gray-800 rounded-2xl" />

        <img
          src={img1}
          alt="Hero Graphic"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
