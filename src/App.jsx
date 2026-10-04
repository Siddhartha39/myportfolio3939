import React, { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import InteractiveKeyboard from "./components/InteractiveKeyboard";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import SiddharthaAI from "./components/SiddharthaAI";
import FloatingDock from "./components/FloatingDock";

const App = () => {
  const [chatOpenTrigger, setChatOpenTrigger] = useState(0);

  const handleOpenChat = () => {
    // Dispatch an event or trigger chatbot open
    const chatBtn = document.querySelector('button[aria-label="Chat with Siddhartha AI"]');
    if (chatBtn) {
      chatBtn.click();
    } else {
      setChatOpenTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <InteractiveKeyboard />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </div>

      {/* Modern Floating Dock navigation inspired by shreyansh-portfolio */}
      <FloatingDock onOpenChat={handleOpenChat} />

      {/* AI Digital Twin Chatbot speaking on behalf of Siddhartha */}
      <SiddharthaAI key={chatOpenTrigger} />
    </div>
  );
};

export default App;
