import React from "react";
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
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <About />
      <InteractiveKeyboard />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
      <Footer />
      <FloatingDock />
      <SiddharthaAI />
    </div>
  );
};

export default App;
