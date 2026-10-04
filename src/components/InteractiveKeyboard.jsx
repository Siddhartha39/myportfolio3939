import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal, Volume2, VolumeX, CheckCircle2, Cpu } from "lucide-react";

// Exact 24 keycaps matching media_1791098038278.png and shreyansh-portfolio
const KEYCAPS = [
  // Row 1
  {
    id: "js",
    label: "JavaScript",
    shortLabel: "JS",
    color: "#f7df1e",
    bg: "bg-[#f59e0b]",
    shadow: "shadow-[#b45309]",
    desc: "Asynchronous programming, event loops, DOM APIs, modern ES6+, and full-stack runtime.",
    category: "Languages",
    iconType: "text",
  },
  {
    id: "ts",
    label: "TypeScript",
    shortLabel: "TS",
    color: "#007acc",
    bg: "bg-[#0284c7]",
    shadow: "shadow-[#0369a1]",
    desc: "Static typing, interfaces, generics, and enterprise-grade maintainable JavaScript architectures.",
    category: "Languages",
    iconType: "text",
  },
  {
    id: "html",
    label: "HTML5",
    color: "#e34c26",
    bg: "bg-[#ea580c]",
    shadow: "shadow-[#c2410c]",
    desc: "Semantic structure, responsive web standards, accessibility, and modern web canvas elements.",
    category: "Frontend",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v14l9 3 9-3V5l-9-3zm6 6h-9l.3 3h8.4l-.8 7.5-4.9 1.4-4.9-1.4-.4-4.5h2.5l.2 2.2 2.6.7 2.6-.7.4-3.7H6.5L5.7 6h12.6l-.3 2z" />
      </svg>
    ),
  },
  {
    id: "css",
    label: "CSS3",
    color: "#563d7c",
    bg: "bg-[#7c3aed]",
    shadow: "shadow-[#6d28d9]",
    desc: "Modern layouts (Flexbox, CSS Grid), responsive design, keyframe animations, and 3D transforms.",
    category: "Frontend",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v14l9 3 9-3V5l-9-3zm6 6h-9l.3 3h8.4l-.8 7.5-4.9 1.4-4.9-1.4-.4-4.5h2.5l.2 2.2 2.6.7 2.6-.7.4-3.7H6.5L5.7 6h12.6l-.3 2z" />
      </svg>
    ),
  },
  {
    id: "react",
    label: "React.js",
    color: "#61dafb",
    bg: "bg-[#06b6d4]",
    shadow: "shadow-[#0891b2]",
    desc: "Component-driven reactive UIs, custom hooks, virtual DOM, and high-performance SPAs.",
    category: "Frontend",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
      </svg>
    ),
  },
  {
    id: "vue",
    label: "Vue.js",
    color: "#41b883",
    bg: "bg-[#10b981]",
    shadow: "shadow-[#059669]",
    desc: "Progressive JavaScript framework with reactive data binding and intuitive component composition.",
    category: "Frontend",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.5L3 3h4.5l4.5 7.8L16.5 3H21L12 17.5zm0-4.5L7.5 5H10l2 3.5L14 5h2.5L12 13z" />
      </svg>
    ),
  },

  // Row 2
  {
    id: "nextjs",
    label: "Next.js",
    shortLabel: "N",
    color: "#ffffff",
    bg: "bg-[#18181b]",
    shadow: "shadow-[#09090b]",
    desc: "Server-side rendering (SSR), static site generation, API routing, and hybrid React production.",
    category: "Full Stack",
    iconSvg: (
      <div className="w-7 h-7 rounded-full bg-black border border-white/20 flex items-center justify-center font-bold text-base">
        N
      </div>
    ),
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    color: "#38bdf8",
    bg: "bg-[#0284c7]",
    shadow: "shadow-[#0369a1]",
    desc: "Utility-first CSS framework for rapid UI styling, custom glassmorphism design, and animations.",
    category: "Frontend",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#6cc24a",
    bg: "bg-[#16a34a]",
    shadow: "shadow-[#15803d]",
    desc: "Asynchronous event-driven JavaScript backend runtime powering high-concurrency microservices.",
    category: "Backend",
    iconSvg: (
      <div className="w-7 h-7 rounded border border-white/30 flex items-center justify-center font-bold text-xs">
        JS
      </div>
    ),
  },
  {
    id: "express",
    label: "Express.js",
    shortLabel: "ex",
    color: "#ffffff",
    bg: "bg-[#27272a]",
    shadow: "shadow-[#18181b]",
    desc: "Fast, unopinionated, minimalist web framework for building RESTful APIs and middleware pipelines.",
    category: "Backend",
    iconType: "text",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    color: "#336791",
    bg: "bg-[#1e40af]",
    shadow: "shadow-[#1e3a8a]",
    desc: "Powerful open-source object-relational database system with complex query optimization.",
    category: "Databases",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 3.2 1.67 6.01 4.19 7.6L6 21l3.5-1.5C10.3 19.8 11.13 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    label: "MongoDB",
    color: "#47a248",
    bg: "bg-[#15803d]",
    shadow: "shadow-[#166534]",
    desc: "Scalable document-oriented NoSQL database with aggregation pipelines and Mongoose ORM.",
    category: "Databases",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 2 7 8 7 14c0 3.5 2.5 6 5 8 2.5-2 5-4.5 5-8 0-6-5-12-5-12zm0 18c-1.5-1.5-3-3.5-3-6 0-3 2-6.5 3-9 1 2.5 3 6 3 9 0 2.5-1.5 4.5-3 6z" />
      </svg>
    ),
  },

  // Row 3
  {
    id: "git",
    label: "Git",
    color: "#f1502f",
    bg: "bg-[#dc2626]",
    shadow: "shadow-[#b91c1c]",
    desc: "Distributed version control system, branching workflows, cherry-picking, and commit integrity.",
    category: "Tools",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.07 10.93l-6-6a2.003 2.003 0 0 0-2.83 0l-1.42 1.42 2.27 2.27a2.003 2.003 0 0 1 2.52 2.52l2.36 2.36a2 2 0 1 1-1.41 1.41l-2.22-2.22v4.44a2 2 0 1 1-2 0v-4.44a2.003 2.003 0 0 1-1.12-2.61l-2.2-2.2L3.5 10.51a2.003 2.003 0 0 0 0 2.83l6.59 6.59a2.003 2.003 0 0 0 2.83 0l6.15-6.17a2.003 2.003 0 0 0 0-2.83z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    color: "#ffffff",
    bg: "bg-[#18181b]",
    shadow: "shadow-[#09090b]",
    desc: "Open source collaboration, pull requests, GitHub Actions CI/CD pipelines, and project telemetry.",
    category: "Tools",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "prettier",
    label: "Prettier",
    color: "#f7b93a",
    bg: "bg-[#0f172a]",
    shadow: "shadow-[#020617]",
    desc: "Opinionated automated code formatter enforcing uniform code styling across multi-language projects.",
    category: "Tools",
    iconSvg: (
      <div className="font-mono font-black text-lg text-amber-400 tracking-tighter">
        P
      </div>
    ),
  },
  {
    id: "npm",
    label: "npm",
    shortLabel: "n",
    color: "#ffffff",
    bg: "bg-[#b91c1c]",
    shadow: "shadow-[#991b1b]",
    desc: "Node package ecosystem, dependency management, semantic versioning, and package publishing.",
    category: "Tools",
    iconSvg: (
      <div className="w-7 h-7 bg-white text-red-700 font-black rounded flex items-center justify-center text-xs">
        npm
      </div>
    ),
  },
  {
    id: "firebase",
    label: "Firebase",
    color: "#ffca28",
    bg: "bg-[#d97706]",
    shadow: "shadow-[#b45309]",
    desc: "Real-time Cloud Firestore, live database listeners, serverless functions, and authentication.",
    category: "Cloud",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 17.5L7 3l4.5 8.5L4.5 17.5zm15 0L17 7.5l-3 4.5 5.5 5.5zm-8.5-4.5l-3.5-3.5L4 18l7.5 4 7.5-4-8-5z" />
      </svg>
    ),
  },
  {
    id: "wordpress",
    label: "WordPress",
    shortLabel: "W",
    color: "#21759b",
    bg: "bg-[#0284c7]",
    shadow: "shadow-[#0369a1]",
    desc: "Enterprise content management architecture, REST API headless integrations, and custom plugins.",
    category: "CMS",
    iconSvg: (
      <div className="w-7 h-7 rounded-full bg-white text-sky-700 font-bold flex items-center justify-center text-sm">
        W
      </div>
    ),
  },

  // Row 4
  {
    id: "linux",
    label: "Linux",
    color: "#ffffff",
    bg: "bg-[#27272a]",
    shadow: "shadow-[#18181b]",
    desc: "UNIX systems administration, shell scripting, process management, permissions, and server hardening.",
    category: "OS",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7" r="4" fill="currentColor" />
        <ellipse cx="12" cy="16" rx="6" ry="5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "docker",
    label: "Docker",
    color: "#2496ed",
    bg: "bg-[#0284c7]",
    shadow: "shadow-[#0369a1]",
    desc: "Containerization, multi-stage Dockerfiles, Docker Compose, and reproducible deployments.",
    category: "DevOps",
    iconSvg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10.5V8.8h2.6v1.7H13zm-3.2 0V8.8h2.6v1.7H9.8zm-3.2 0V8.8h2.6v1.7H6.6zm6.4-2.4V6.4h2.6v1.7H13zm-3.2 0V6.4h2.6v1.7H9.8zm-3.2 0V6.4h2.6v1.7H6.6zm9.6 4.1c-.3-.2-.7-.3-1.1-.3H4.4c-.6 0-1.1.5-1.1 1.1 0 3.7 3 6.7 6.7 6.7 4.1 0 7.4-3.3 7.4-7.4 0-.4 0-.8-.1-1.1z" />
      </svg>
    ),
  },
  {
    id: "nginx",
    label: "NGINX",
    shortLabel: "N",
    color: "#009639",
    bg: "bg-[#16a34a]",
    shadow: "shadow-[#15803d]",
    desc: "High-performance reverse proxy, load balancer, HTTP cache, and SSL/TLS termination.",
    category: "DevOps",
    iconSvg: (
      <div className="w-7 h-7 rounded bg-white text-green-700 font-black flex items-center justify-center text-sm">
        N
      </div>
    ),
  },
  {
    id: "aws",
    label: "AWS",
    shortLabel: "aws",
    color: "#ff9900",
    bg: "bg-[#d97706]",
    shadow: "shadow-[#b45309]",
    desc: "Cloud infrastructure, EC2 instances, S3 object storage, Lambda serverless, and CloudFront CDN.",
    category: "Cloud",
    iconType: "text",
  },
  {
    id: "vim",
    label: "Vim",
    shortLabel: "V",
    color: "#019733",
    bg: "bg-[#15803d]",
    shadow: "shadow-[#166534]",
    desc: "Modal text editing, keystroke efficiency, buffer management, and rapid terminal development.",
    category: "Tools",
    iconSvg: (
      <div className="w-7 h-7 font-black text-white flex items-center justify-center text-base">
        V
      </div>
    ),
  },
  {
    id: "vercel",
    label: "Vercel",
    color: "#ffffff",
    bg: "bg-[#18181b]",
    shadow: "shadow-[#09090b]",
    desc: "Frontend cloud platform, edge functions, instantaneous previews, and automated git deployments.",
    category: "Cloud",
    iconSvg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
];

export const InteractiveKeyboard = () => {
  const [activeSkill, setActiveSkill] = useState(KEYCAPS[0]);
  const [pressedId, setPressedId] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });
  const deckRef = useRef(null);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(450 + Math.random() * 150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio playback blocked
    }
  };

  const handleKeyClick = (skill) => {
    setActiveSkill(skill);
    setPressedId(skill.id);
    playClick();
    setTimeout(() => setPressedId(null), 200);
  };

  const handleMouseMove = (e) => {
    if (!deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseRot({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseRot({ x: 0, y: 0 });
  };

  return (
    <section id="skills" className="relative c-space section-spacing scroll-mt-20">
      {/* Title Header */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 3D Mechanical Macropad
        </div>
        <h2 className="text-heading text-white">Skills Keyboard</h2>
        <p className="subtext max-w-2xl mt-2 text-neutral-400">
          (hint: click any mechanical keycap below to explore the stack and trigger keypress animations)
        </p>

        {/* Audio Toggle */}
        <div className="mt-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
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

      {/* 3D Showcase Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Exact 3D Mechanical Keyboard Deck */}
        <div
          ref={deckRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-8 flex items-center justify-center p-4 sm:p-10 min-h-[460px] relative overflow-hidden"
          style={{ perspective: "1100px" }}
        >
          {/* Subtle Starry Ambient Space */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full" />
          </div>

          {/* 3D Macropad Chassis tilted in perspective matching screenshot */}
          <motion.div
            className="relative rounded-[32px] p-5 sm:p-7 bg-gradient-to-b from-[#1c1f2b] to-[#0c0e17] border-4 border-[#2b3046] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_10px_20px_rgba(0,0,0,0.8)] select-none"
            animate={{
              rotateX: 34 - mouseRot.y * 12,
              rotateZ: -10 + mouseRot.x * 10,
              rotateY: 14 + mouseRot.x * 12,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D Chassis Lip Shadow */}
            <div className="absolute -inset-2 rounded-[36px] bg-black/60 -z-10 blur-sm transform translate-y-4" />

            {/* 4x6 Keycap Matrix */}
            <div className="grid grid-cols-6 gap-2.5 sm:gap-3.5">
              {KEYCAPS.map((skill) => {
                const isSelected = activeSkill.id === skill.id;
                const isPressed = pressedId === skill.id;

                return (
                  <button
                    key={skill.id}
                    onClick={() => handleKeyClick(skill)}
                    onMouseEnter={() => {
                      if (!isPressed) playClick();
                    }}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-white text-sm sm:text-base cursor-pointer transition-all duration-150 transform ${
                      skill.bg
                    } ${skill.shadow} border-t border-l border-white/40 border-b-4 border-r-2 ${
                      isPressed
                        ? "translate-y-2.5 shadow-none brightness-110"
                        : isSelected
                        ? "translate-y-1 shadow-[0_4px_0_rgba(0,0,0,0.7)] ring-2 ring-white scale-102"
                        : "hover:-translate-y-1 shadow-[0_8px_0_rgba(0,0,0,0.8)] hover:brightness-110 active:translate-y-2 active:shadow-none"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    title={skill.label}
                  >
                    {/* Keycap Bevel / Specular Highlight */}
                    <div className="absolute inset-1 rounded-lg sm:rounded-xl bg-gradient-to-t from-black/20 via-transparent to-white/30 pointer-events-none" />

                    {/* Key Icon / Label */}
                    <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      {skill.iconSvg ? (
                        skill.iconSvg
                      ) : (
                        <span className="font-extrabold tracking-tight">
                          {skill.shortLabel || skill.label}
                        </span>
                      )}
                    </div>

                    {/* Active Glow Ring */}
                    {isSelected && (
                      <span className="absolute -bottom-1 w-2.5 h-1 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
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
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                style={{ backgroundColor: activeSkill.color }}
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
                  style={{ color: activeSkill.color }}
                />
                {activeSkill.label}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans min-h-[75px]">
                {activeSkill.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeSkill.color }}
                  />
                  Production Architecture
                </span>
                <span className="font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Keycap Grid Selector */}
          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Quick Key Selection ({KEYCAPS.length} Keys)
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-1.5">
              {KEYCAPS.map((skill) => {
                const isSelected = activeSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => handleKeyClick(skill)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 cursor-pointer text-center truncate border ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md scale-105"
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
