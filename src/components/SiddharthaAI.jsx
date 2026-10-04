import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  Code,
  Briefcase,
  Award,
  GraduationCap,
  Mail,
} from "lucide-react";

export const SiddharthaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialGreeting = {
    id: "init",
    sender: "bot",
    text: "Hey! 👋 I'm **Siddhartha Singh** (well, my AI digital twin speaking directly on my behalf!). \n\nI can answer anything about my **projects**, **tech stack**, **patent**, **hackathon wins**, or how we can collaborate. What would you like to know?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    quickReplies: [
      "🚀 What are your top projects?",
      "🛡️ Tell me about CyberGuard AI",
      "🌊 How does Pravah AI work?",
      "⚡ What is Waste2Watt?",
      "📜 Tell me about your Patent",
      "🛠️ What is your tech stack?",
      "📫 How can I hire or contact you?",
    ],
  };

  const [messages, setMessages] = useState([initialGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio playback blocked or unsupported
    }
  };

  // Siddhartha's intelligent first-person response engine
  const generateSiddharthaResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Specific Project: CyberGuard AI
    if (q.includes("cyberguard") || q.includes("cyber") || q.includes("phishing") || q.includes("soc")) {
      return {
        text: "🛡️ **CyberGuard AI** is one of my flagship cybersecurity systems! \n\nHere is how I built it:\n• **Autonomous Threat Detection**: It scans malicious URLs, detects lookalike phishing domains, and audits credential harvesting portals in real time.\n• **Sub-25ms Fast Triage**: I built a 24-dimensional classifier that triages domains locally before launching headless Chromium via Playwright for deep forensic dossiers.\n• **Manifest V3 Chrome Extension**: Includes an autonomous edge DNS shield with zero backend dependency and OS-level instant threat alerts!\n\nCheck out the live web console or review my source code:",
        links: [
          { label: "🌐 Visit CyberGuard AI Live", url: "https://cyberguard-ai-one.vercel.app/" },
          { label: "💻 GitHub Repository", url: "https://github.com/Siddhartha39/Cyberguard-AI" },
        ],
        quickReplies: ["🌊 Tell me about Pravah AI", "⚡ What is Waste2Watt?", "📜 Tell me about CampusKart"],
      };
    }

    // Specific Project: Pravah AI
    if (q.includes("pravah") || q.includes("disaster") || q.includes("flood") || q.includes("geofence") || q.includes("avinya")) {
      return {
        text: "🌊 **PRAVAH AI** is my autonomous disaster intelligence and evacuation routing platform, and an **AVINYA 2026 Finalist**!\n\n• **Solves Disaster Fog**: Converts chaotic citizen SOS beacons and ultrasonic sensor feeds into verified hazard polygons.\n• **Live Hazard Geofencing**: Broadcasts dynamic peril perimeters across devices in real time via Firebase Cloud with sub-second sync.\n• **Safe Detour Routing**: Automatically calculates safe, risk-aware detours with voice radar warnings so citizens don't get routed into submerged roads.\n\nTake a look at the live app:",
        links: [
          { label: "🌐 Visit PRAVAH AI Live", url: "https://pravah-ai-kappa.vercel.app/" },
          { label: "💻 GitHub Repository", url: "https://github.com/Siddhartha39/Pravah-AI" },
        ],
        quickReplies: ["⚡ Tell me about Waste2Watt", "🛡️ What is CyberGuard AI?", "🚀 List all your projects"],
      };
    }

    // Specific Project: Waste2Watt
    if (q.includes("waste2watt") || q.includes("waste") || q.includes("energy") || q.includes("watt") || q.includes("microgrid")) {
      return {
        text: "⚡ **Waste2Watt** is my decentralized smart waste-to-energy network designed for campuses and smart cities!\n\n• **Circular Energy Microgrid**: Seamlessly routes organic waste from canteens and households to anaerobic bio-methanation digesters to generate electricity.\n• **Edge Computer Vision**: Scans and classifies organic waste on the spot.\n• **Dynamic Fleet Routing (TSP)**: Optimizes electric collection vehicle paths.\n• **IoT Telemetry**: Monitors digester methane levels to directly power streetlights and EV charging stations!\n\nExplore the project on GitHub:",
        links: [
          { label: "💻 GitHub: Waste2Watt", url: "https://github.com/Siddhartha39/Waste2watt" },
        ],
        quickReplies: ["🛡️ Tell me about CyberGuard AI", "🌊 What is Pravah AI?", "📜 Tell me about your Patent"],
      };
    }

    // Specific Project: CampusKart & Patent
    if (q.includes("campuskart") || q.includes("patent") || q.includes("marketplace")) {
      return {
        text: "📜 **CampusKart** is very close to my heart because I was granted an official **Patent Certificate** for it!\n\n• **What it is**: An all-in-one campus ecosystem combining peer-to-peer student marketplace commerce with social networking.\n• **Real-Time Features**: Live WebSocket chat, image posts, comments, reviews, and transaction flows.\n• **Opportunity Hub**: Dedicated discovery portals for student internships, placements, hackathons, and campus events.\n• **Performance**: Reduced latency by 35% through custom MongoDB indexing and boosted platform engagement by 40%!",
        links: [
          { label: "🌐 Visit CampusKart Live", url: "https://www.campuskart.shop/" },
          { label: "📜 View Patent Certificate", url: "https://ibb.co/Q3wggwDK" },
          { label: "💻 GitHub Repository", url: "https://github.com/Siddhartha39/campuskart" },
        ],
        quickReplies: ["🛡️ Tell me about CyberGuard AI", "🌊 Tell me about Pravah AI", "🏆 What are your other awards?"],
      };
    }

    // General Projects query
    if (q.includes("project") || q.includes("portfolio") || q.includes("build") || q.includes("work")) {
      return {
        text: "🚀 Here are my key full-stack and AI projects:\n\n1. **CampusKart** (📜 *Patented*): Full-stack campus marketplace & student social hub with real-time WebSockets.\n2. **CyberGuard AI** (🛡️ *Live*): Autonomous phishing detection, brand impersonation auditing & Chrome Extension.\n3. **PRAVAH AI** (🌊 *AVINYA 2026 Finalist*): Real-time disaster intelligence, live hazard geofencing & evacuation routing.\n4. **Waste2Watt** (⚡): Decentralized waste-to-energy circular microgrid with Edge Computer Vision & IoT telemetry.\n5. **Safepath** (🚦): Road safety app with live GPS hazard reporting and WebSockets (-35% latency).\n6. **SwasthFarm** (🌱 *Live*): AI poultry farm management app monitoring 10,000+ birds with predictive weather alerts.\n\nWhich one would you like to explore deeper?",
        quickReplies: [
          "🛡️ CyberGuard AI",
          "🌊 Pravah AI",
          "⚡ Waste2Watt",
          "📜 CampusKart (Patent)",
        ],
      };
    }

    // Tech Stack & Skills
    if (q.includes("skill") || q.includes("stack") || q.includes("language") || q.includes("tech") || q.includes("tools")) {
      return {
        text: "🛠️ Here is my core engineering toolbelt:\n\n• **Frontend**: React.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3, Responsive UI\n• **Backend & Real-Time**: Node.js, Express.js, WebSockets, Socket.IO, FastAPI (Python), REST APIs\n• **Databases**: MongoDB (Mongoose), MySQL, Firebase Cloud Firestore\n• **Languages**: C, C++ (STL & Algorithms), JavaScript, Python\n• **DevOps & Tools**: Docker, Git & GitHub, Google Cloud Platform, Postman, Vercel, Netlify\n• **Core CS**: Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Computer Networks\n\nYou can also play with my **Interactive 3D Skills Keyboard** right on this page!",
        quickReplies: ["🚀 What are your top projects?", "💼 Are you available for work?", "📫 How can I contact you?"],
      };
    }

    // Achievements & Hackathons
    if (q.includes("achievement") || q.includes("award") || q.includes("hackathon") || q.includes("sih") || q.includes("expo") || q.includes("win")) {
      return {
        text: "🏆 Here are some of my top milestones and awards:\n\n1. 📜 **Granted Patent Certificate**: Awarded for innovating **CampusKart**, an integrated student marketplace.\n2. 🇮🇳 **Smart India Hackathon (SIH 2025)**: Ranked **13th out of 500+ teams** in the internal hackathon.\n3. 🥇 **Tech Expo Winner**: 1st Place at PSIT for innovative technology architecture.\n4. 🏅 **2-Time Protech Winner**: Double award recipient for technical problem-solving and software execution.\n5. 🌊 **AVINYA 2026 Finalist**: Recognized for PRAVAH AI in addressing disaster information fog.",
        links: [
          { label: "📜 View Patent Document", url: "https://ibb.co/Q3wggwDK" },
        ],
        quickReplies: ["🚀 Tell me about your projects", "🛠️ What is your tech stack?", "📫 How to get in touch?"],
      };
    }

    // About Me & Education
    if (q.includes("who are you") || q.includes("about") || q.includes("yourself") || q.includes("education") || q.includes("college") || q.includes("psit")) {
      return {
        text: "👨‍💻 **Hi! I'm Siddhartha Singh.**\n\n• **Education**: B.Tech in Computer Science Engineering at **Pranveer Singh Institute of Technology (PSIT), Kanpur** (2024–2028).\n• **Focus**: Full-stack web engineering (MERN), real-time distributed communication (WebSockets), and AI-driven platforms.\n• **Background**: Patent holder, hackathon winner, and freelance web engineer who has built production portals for real-world clients like *Renuvia Recycling* and *Galaxy Computers*.\n\nI love turning complex systems into clean, fast, reliable products.",
        quickReplies: ["🚀 What are your projects?", "🛠️ What is your tech stack?", "📫 How can I contact you?"],
      };
    }

    // Contact & Hiring
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("linkedin") || q.includes("job") || q.includes("internship") || q.includes("freelance")) {
      return {
        text: "📬 I am actively open to **full-stack engineering roles**, **software internships**, **freelance projects**, and **technical collaborations**!\n\nHere is how you can reach me directly:\n\n• 📧 **Email**: [6387siddhartha@gmail.com](mailto:6387siddhartha@gmail.com)\n• 💼 **LinkedIn**: [linkedin.com/in/siddhartha-singh-3939s](https://www.linkedin.com/in/siddhartha-singh-3939s)\n• 💻 **GitHub**: [github.com/Siddhartha39](https://github.com/Siddhartha39)\n• 📱 **Phone**: +91 9335692970\n\nFeel free to shoot me an email or connect on LinkedIn!",
        links: [
          { label: "📧 Send Email", url: "mailto:6387siddhartha@gmail.com" },
          { label: "💼 Open LinkedIn", url: "https://www.linkedin.com/in/siddhartha-singh-3939s" },
          { label: "🐙 Open GitHub", url: "https://github.com/Siddhartha39" },
        ],
        quickReplies: ["🚀 What are your top projects?", "🛠️ What is your tech stack?"],
      };
    }

    // Greetings & Casual
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("sup") || q.includes("how are you")) {
      return {
        text: "Hey there! Great to meet you! 😊 I'm doing fantastic, always working on cool projects and writing clean code.\n\nFeel free to ask me anything about my **projects** (CyberGuard AI, Pravah AI, Waste2Watt, CampusKart), my **tech stack**, or **how to collaborate**!",
        quickReplies: ["🚀 What are your top projects?", "🛡️ Tell me about CyberGuard AI", "📫 How can I hire you?"],
      };
    }

    // Fallback for anything else
    return {
      text: `Thanks for asking! As Siddhartha, I'm passionate about engineering scalable web platforms, real-time WebSocket systems, and AI security tools.\n\nCould you clarify if you'd like to hear about:\n• My **Projects** (CyberGuard AI, Pravah AI, Waste2Watt, CampusKart)\n• My **Skills & Tech Stack** (React, Node, Python, C++, MongoDB)\n• My **Patent & Achievements**\n• How to **hire or collaborate** with me?`,
      quickReplies: [
        "🚀 What are your top projects?",
        "🛡️ Tell me about CyberGuard AI",
        "🌊 Tell me about Pravah AI",
        "📫 How can I contact you?",
      ],
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const responseData = generateSiddharthaResponse(text);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseData.text,
        links: responseData.links,
        quickReplies: responseData.quickReplies,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playNotificationSound();
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Pulsing glow ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 opacity-75 blur-sm animate-pulse" />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-950 border border-cyan-400/40 text-white shadow-2xl hover:border-cyan-400 transition-all duration-300 cursor-pointer group"
              aria-label="Chat with Siddhartha AI"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-inner">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  Chat with Siddhartha <Sparkles className="w-3 h-3 text-cyan-400" />
                </span>
                <span className="text-[10px] text-neutral-400">Ask about projects & skills</span>
              </div>
            </button>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 text-[8px] font-bold text-black items-center justify-center">
                  1
                </span>
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl border border-white/15 bg-neutral-950/95 shadow-2xl backdrop-blur-2xl overflow-hidden font-sans text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-950">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-950" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Siddhartha AI <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-mono">Speaks on behalf of Siddhartha</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? "Mute audio" : "Enable audio"}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
                </button>
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%]">
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex-shrink-0 flex items-center justify-center text-cyan-300 text-xs mb-1">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? "bg-cyan-500 text-black font-medium rounded-br-none shadow-md shadow-cyan-500/20"
                            : "bg-neutral-900 border border-white/10 text-neutral-200 rounded-bl-none shadow-lg whitespace-pre-line"
                        }`}
                      >
                        {msg.text}

                        {/* Interactive links if provided */}
                        {msg.links && msg.links.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                            {msg.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-cyan-500 hover:text-black border border-white/10 text-cyan-300 transition-all duration-200"
                              >
                                {link.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>

                    {/* Quick reply suggestions from bot */}
                    {!isUser && msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 ml-8">
                        {msg.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(qr)}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-cyan-500/20 hover:border-cyan-400/50 border border-white/10 text-cyan-300 transition-colors cursor-pointer text-left"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs ml-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1 bg-neutral-900 px-3 py-2 rounded-xl border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
                    <span className="text-[11px] text-neutral-400 ml-1.5 font-mono">Siddhartha is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-neutral-900/90 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about my projects or skills..."
                className="flex-1 bg-neutral-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black font-bold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiddharthaAI;
