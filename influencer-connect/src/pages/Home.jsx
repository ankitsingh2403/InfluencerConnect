// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ClientsSection from '../components/ClientsSection';
import ImageGrid from '../components/ImageGrid';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div className="w-screen min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <section className="w-full px-4 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <ClientsSection />
          <ImageGrid />
        </section>
         <Footer />
      </main>
    </div>
  );
};

export default Home;
