import React from "react";
import { motion } from "motion/react";
import { Home, User, Keyboard, FolderGit2, Mail, MessageCircleCode } from "lucide-react";

export const FloatingDock = ({ onOpenChat }) => {
  const dockItems = [
    { label: "Home", href: "#home", icon: Home },
    { label: "About", href: "#about", icon: User },
    { label: "3D Keyboard", href: "#skills", icon: Keyboard },
    { label: "Projects", href: "#work", icon: FolderGit2 },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-neutral-950/80 backdrop-blur-xl shadow-2xl"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="relative p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 group flex items-center justify-center cursor-pointer"
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-115 text-neutral-300 group-hover:text-cyan-400" />
              {/* Tooltip */}
              <span className="absolute -top-9 px-2 py-1 rounded-md bg-neutral-900 border border-white/10 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="w-[1px] h-5 bg-white/15 mx-1" />

        <button
          onClick={onOpenChat}
          className="relative p-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-200 group flex items-center justify-center cursor-pointer"
          title="Open AI Chatbot"
        >
          <MessageCircleCode className="w-4 h-4 text-cyan-400 transition-transform group-hover:scale-115" />
          <span className="absolute -top-9 px-2 py-1 rounded-md bg-neutral-900 border border-cyan-500/30 text-[11px] font-medium text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            Ask Siddhartha AI
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default FloatingDock;
