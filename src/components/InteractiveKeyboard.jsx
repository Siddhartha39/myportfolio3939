import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { keyboardSkills } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal, Cpu, RotateCcw, Volume2, VolumeX } from "lucide-react";

export const InteractiveKeyboard = () => {
  const canvasRef = useRef(null);
  const splineAppRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState(keyboardSkills[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [keyPressCount, setKeyPressCount] = useState(0);

  // Play a soft mechanical keyboard click using Web Audio API
  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(380 + Math.random() * 120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore audio context autoplay warnings
    }
  };

  const handleSelectSkill = (skill) => {
    setActiveSkill(skill);
    setKeyPressCount((prev) => prev + 1);
    playKeySound();

    if (splineAppRef.current) {
      try {
        splineAppRef.current.setVariable("heading", skill.name);
        splineAppRef.current.setVariable("desc", skill.desc);
      } catch {
        // Spline variable may be optional
      }
    }
  };

  useEffect(() => {
    let appInstance = null;
    let isMounted = true;

    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      appInstance = app;
      splineAppRef.current = app;

      app
        .load("/assets/skills-keyboard.spline")
        .then(() => {
          if (!isMounted) return;
          setIsLoading(false);

          app.addEventListener("mouseHover", (e) => {
            if (!e.target?.name) return;
            const targetName = e.target.name.toLowerCase();
            const matched = keyboardSkills.find(
              (s) =>
                targetName.includes(s.id) ||
                s.id.includes(targetName) ||
                targetName.includes(s.name.toLowerCase())
            );
            if (matched) {
              setActiveSkill(matched);
            }
          });

          app.addEventListener("mouseDown", (e) => {
            if (!e.target?.name) return;
            playKeySound();
            setKeyPressCount((prev) => prev + 1);
            const targetName = e.target.name.toLowerCase();
            const matched = keyboardSkills.find(
              (s) =>
                targetName.includes(s.id) ||
                s.id.includes(targetName) ||
                targetName.includes(s.name.toLowerCase())
            );
            if (matched) {
              setActiveSkill(matched);
            }
          });
        })
        .catch((err) => {
          console.warn("Spline keyboard loaded with fallback:", err);
          if (isMounted) setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
      if (appInstance) {
        try {
          appInstance.dispose();
        } catch {
          // Cleanup
        }
      }
    };
  }, []);

  return (
    <section id="skills" className="relative c-space section-spacing overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 3D Experience
        </div>
        <h2 className="text-heading text-white">Interactive 3D Skills Keyboard</h2>
        <p className="subtext max-w-2xl mt-3 text-neutral-400">
          Built with custom 3D Spline physics & GSAP. Orbit, drag to inspect, or click any mechanical keycap below to trigger real-time skill insights.
        </p>

        {/* Quick controls bar */}
        <div className="flex items-center gap-4 mt-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1 rounded-full border border-white/10">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Keys Clicked: <b className="text-white">{keyPressCount}</b>
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 bg-neutral-900/80 hover:bg-neutral-800 px-3 py-1 rounded-full border border-white/10 transition-colors cursor-pointer text-white"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Key Sounds: ON
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" /> Key Sounds: MUTE
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas & Interactive Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 3D Spline Interactive Canvas Container */}
        <div className="lg:col-span-8 relative h-[360px] sm:h-[440px] md:h-[500px] rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/90 via-black/80 to-neutral-950/90 overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Subtle Top status banner inside 3D frame */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-neutral-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D Spline Engine Live • Drag to Rotate</span>
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-black/80 backdrop-blur-md">
              <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-neutral-300">Initializing 3D Mechanical Keyboard...</p>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{ outline: "none" }}
          />

          <div className="absolute bottom-3 right-4 z-10 text-[11px] text-neutral-500 pointer-events-none">
            3D Model • Spline Runtime
          </div>
        </div>

        {/* Right: Active Skill Card & Live Terminal Specs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl border border-white/15 bg-gradient-to-br from-neutral-900/95 via-neutral-950 to-black/90 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              {/* Top Accent line with active color */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: activeSkill.color || "#00F2FE" }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  {activeSkill.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  KEY: <b className="text-white uppercase font-bold">{activeSkill.id}</b>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-6 h-6" style={{ color: activeSkill.color || "#00F2FE" }} />
                {activeSkill.name}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans min-h-[70px]">
                {activeSkill.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeSkill.color || "#00F2FE" }}
                  />
                  Proficiency: Production Ready
                </span>
                <span className="font-mono text-cyan-400">Status: Active</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Virtual Keycap Palette */}
          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Quick Keycap Selector (Click any key)
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
              {keyboardSkills.map((skill) => {
                const isSelected = activeSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer text-center truncate border ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20 scale-105"
                        : "bg-neutral-800/80 hover:bg-neutral-700/80 border-white/5 text-neutral-300 hover:text-white"
                    }`}
                    title={skill.name}
                  >
                    {skill.id.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveKeyboard;
