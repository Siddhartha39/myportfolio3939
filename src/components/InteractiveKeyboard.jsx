import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { keyboardSkills } from "../constants";
import {
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  Keyboard,
  Cpu,
  Layers,
  CheckCircle2,
  Code2,
} from "lucide-react";

export const InteractiveKeyboard = () => {
  const [activeSkill, setActiveSkill] = useState(keyboardSkills[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pressedKey, setPressedKey] = useState(null);
  const [typedChars, setTypedChars] = useState(["J", "S"]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Synthesize realistic mechanical keyboard click
  const playMechanicalClick = (freq = 420) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio playback blocked
    }
  };

  const handleSelectSkill = (skill, keyLabel = null) => {
    setActiveSkill(skill);
    setPressedKey(keyLabel || skill.id);
    playMechanicalClick(380 + Math.random() * 140);

    setTypedChars((prev) => {
      const char = (keyLabel || skill.id).slice(0, 3).toUpperCase();
      return [...prev.slice(-14), char];
    });

    setTimeout(() => setPressedKey(null), 250);
  };

  // Listen to physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      const key = e.key.toLowerCase();
      // Match with a skill or trigger active
      const matched = keyboardSkills.find(
        (s) =>
          s.id.toLowerCase() === key ||
          s.name.toLowerCase().startsWith(key)
      );

      if (matched) {
        handleSelectSkill(matched, e.key.toUpperCase());
      } else if (e.key.length === 1) {
        setPressedKey(e.key.toUpperCase());
        playMechanicalClick(440);
        setTypedChars((prev) => [...prev.slice(-14), e.key.toUpperCase()]);
        setTimeout(() => setPressedKey(null), 250);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [soundEnabled]);

  // 3D Mouse Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Keyboard Rows layout with real mechanical keys & skill mappings
  const keyboardRows = [
    [
      { label: "ESC", width: "w-10", special: true },
      { label: "F1", width: "w-9" },
      { label: "F2", width: "w-9" },
      { label: "F3", width: "w-9" },
      { label: "F4", width: "w-9" },
      { label: "F5", width: "w-9" },
      { label: "F6", width: "w-9" },
      { label: "F7", width: "w-9" },
      { label: "F8", width: "w-9" },
      { label: "F9", width: "w-9" },
      { label: "F10", width: "w-9" },
      { label: "F11", width: "w-9" },
      { label: "F12", width: "w-9" },
      { label: "DEL", width: "w-10", special: true },
    ],
    [
      { label: "`", width: "w-9" },
      { label: "1", skillId: "js", width: "w-9" },
      { label: "2", skillId: "react", width: "w-9" },
      { label: "3", skillId: "nodejs", width: "w-9" },
      { label: "4", skillId: "express", width: "w-9" },
      { label: "5", skillId: "mongodb", width: "w-9" },
      { label: "6", skillId: "tailwind", width: "w-9" },
      { label: "7", skillId: "python", width: "w-9" },
      { label: "8", skillId: "cpp", width: "w-9" },
      { label: "9", skillId: "docker", width: "w-9" },
      { label: "0", skillId: "firebase", width: "w-9" },
      { label: "-", width: "w-9" },
      { label: "=", width: "w-9" },
      { label: "BACKSPACE", width: "w-16 sm:w-20", special: true },
    ],
    [
      { label: "TAB", width: "w-14 sm:w-16", special: true },
      { label: "Q", width: "w-9" },
      { label: "W", skillId: "tailwind", width: "w-9", glow: "#38bdf8" },
      { label: "E", skillId: "express", width: "w-9", glow: "#ffffff" },
      { label: "R", skillId: "react", width: "w-9", glow: "#61dafb" },
      { label: "T", width: "w-9" },
      { label: "Y", skillId: "python", width: "w-9", glow: "#3776ab" },
      { label: "U", width: "w-9" },
      { label: "I", width: "w-9" },
      { label: "O", width: "w-9" },
      { label: "P", width: "w-9" },
      { label: "[", width: "w-9" },
      { label: "]", width: "w-9" },
      { label: "\\", width: "w-10 sm:w-12" },
    ],
    [
      { label: "CAPS", width: "w-16 sm:w-18", special: true },
      { label: "A", width: "w-9" },
      { label: "S", width: "w-9" },
      { label: "D", skillId: "docker", width: "w-9", glow: "#2496ed" },
      { label: "F", skillId: "firebase", width: "w-9", glow: "#ffca28" },
      { label: "G", skillId: "git", width: "w-9", glow: "#f05032" },
      { label: "H", skillId: "html", width: "w-9", glow: "#e34f26" },
      { label: "J", skillId: "js", width: "w-9", glow: "#f7df1e" },
      { label: "K", width: "w-9" },
      { label: "L", width: "w-9" },
      { label: ";", width: "w-9" },
      { label: "'", width: "w-9" },
      { label: "ENTER", width: "w-16 sm:w-22", special: true, accent: true },
    ],
    [
      { label: "SHIFT", width: "w-20 sm:w-24", special: true },
      { label: "Z", width: "w-9" },
      { label: "X", width: "w-9" },
      { label: "C", skillId: "cpp", width: "w-9", glow: "#00599c" },
      { label: "V", width: "w-9" },
      { label: "B", width: "w-9" },
      { label: "N", skillId: "nodejs", width: "w-9", glow: "#43853d" },
      { label: "M", skillId: "mongodb", width: "w-9", glow: "#4ea94b" },
      { label: ",", width: "w-9" },
      { label: ".", width: "w-9" },
      { label: "/", width: "w-9" },
      { label: "SHIFT", width: "w-20 sm:w-24", special: true },
    ],
    [
      { label: "CTRL", width: "w-12", special: true },
      { label: "WIN", width: "w-10", special: true },
      { label: "ALT", width: "w-10", special: true },
      { label: "SPACE (SIDDHARTHA SINGH)", skillId: "js", width: "flex-1 min-w-[140px]", space: true },
      { label: "ALT", width: "w-10", special: true },
      { label: "FN", width: "w-10", special: true },
      { label: "CTRL", width: "w-12", special: true },
    ],
  ];

  return (
    <section id="skills" className="relative c-space section-spacing scroll-mt-20">
      {/* Title Header with Animated Glow */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 3D Experience
        </div>
        <h2 className="text-heading text-white">Interactive Skills Keyboard</h2>
        <p className="subtext max-w-2xl mt-2 text-neutral-400">
          (hint: click any mechanical keycap or type on your physical keyboard to explore my tech stack)
        </p>

        {/* Audio Toggle & Typed Terminal Stream */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Output:</span>
            <span className="text-cyan-400 font-bold tracking-widest">
              {typedChars.slice(-8).join(" ")}
            </span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
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

      {/* Main 3D Keyboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D Mechanical Keyboard Deck */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-8 relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#111424] via-[#090b16] to-[#04060e] p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-transform duration-300 ease-out overflow-x-auto"
          style={{
            perspective: "1200px",
            transform: `rotateX(${12 - mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg)`,
          }}
        >
          {/* Subtle Cyber RGB Glow under the deck */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-40 blur-xl pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeSkill.color || "#00F2FE"}44, transparent 70%)`,
            }}
          />

          {/* Keyboard Header / Logo Plate */}
          <div className="relative z-10 flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-neutral-400">
                MODEL: <b className="text-white">SIDDHARTHA-65</b> MECHANICAL
              </span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-mono">
              <span>RGB: SYNC</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>POLLING: 1000Hz</span>
            </div>
          </div>

          {/* Keycap Matrix */}
          <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2 min-w-[560px]">
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center">
                {row.map((key, keyIdx) => {
                  const skill = key.skillId
                    ? keyboardSkills.find((s) => s.id === key.skillId)
                    : null;
                  const isKeyActive =
                    activeSkill.id === key.skillId ||
                    pressedKey === key.label;

                  return (
                    <button
                      key={keyIdx}
                      onClick={() => {
                        if (skill) {
                          handleSelectSkill(skill, key.label);
                        } else {
                          handleSelectSkill(activeSkill, key.label);
                        }
                      }}
                      className={`relative select-none h-8 sm:h-11 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all duration-150 cursor-pointer flex items-center justify-center border shadow-md active:translate-y-1 ${
                        key.width
                      } ${
                        isKeyActive
                          ? "bg-cyan-400 text-black border-white translate-y-0.5 shadow-[0_0_15px_rgba(0,242,254,0.6)]"
                          : key.special
                          ? "bg-[#181b2e] hover:bg-[#20253d] text-neutral-400 border-white/10"
                          : key.accent
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/50"
                          : "bg-[#1f233a] hover:bg-[#2a2f4c] text-neutral-200 border-white/10"
                      }`}
                      style={{
                        boxShadow: isKeyActive
                          ? `0 0 16px ${key.glow || activeSkill.color || "#00F2FE"}aa`
                          : undefined,
                      }}
                    >
                      <span className="truncate px-1">{key.label}</span>
                      {skill && (
                        <span
                          className="absolute bottom-0.5 right-1 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[10px] font-mono text-neutral-500">
            <span>PRESS PHYSICAL KEY OR CLICK KEYCAP</span>
            <span>CUSTOM SWITCHES • 45g ACTUATION</span>
          </div>
        </div>

        {/* Right: Active Skill Inspector Card */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-white/15 bg-gradient-to-br from-neutral-900 via-neutral-950 to-[#0b0e1d] shadow-2xl relative overflow-hidden"
            >
              {/* Glowing Top Indicator */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                style={{ backgroundColor: activeSkill.color || "#00F2FE" }}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-0.5 rounded-full">
                  {activeSkill.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  KEY: <b className="text-white uppercase">{activeSkill.id}</b>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Cpu
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: activeSkill.color || "#00F2FE" }}
                />
                {activeSkill.name}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans min-h-[75px]">
                {activeSkill.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeSkill.color || "#00F2FE" }}
                  />
                  Production Architecture
                </span>
                <span className="font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Skill Badges Palette */}
          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Quick Skill Palette
            </p>
            <div className="grid grid-cols-3 gap-2">
              {keyboardSkills.map((skill) => {
                const isSelected = activeSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill, skill.id.toUpperCase())}
                    className={`px-2.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer text-center truncate border ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md scale-102"
                        : "bg-neutral-800/80 hover:bg-neutral-700/80 border-white/5 text-neutral-300 hover:text-white"
                    }`}
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
