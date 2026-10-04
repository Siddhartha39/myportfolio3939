import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Code2, Award, X } from "lucide-react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  github,
  patent,
  badge,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-y-auto backdrop-blur-md bg-black/70">
      <motion.div
        className="relative max-w-2xl w-full border shadow-2xl rounded-2xl bg-neutral-950 border-white/15 overflow-hidden my-8"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          onClick={closeModal}
          className="absolute z-20 p-2 rounded-full top-4 right-4 bg-black/60 hover:bg-neutral-800 text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-neutral-900">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          {badge && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              {badge}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-2xl font-bold text-white flex items-center gap-2">
            {title}
          </h3>
          <p className="mb-4 text-sm font-normal text-neutral-300 leading-relaxed">
            {description}
          </p>

          <div className="space-y-2 mb-6">
            {subDescription &&
              subDescription.map((subDesc, index) => (
                <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-400">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{subDesc}</span>
                </div>
              ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {tags &&
                tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-900 border border-white/10 text-neutral-300"
                  >
                    {tag.path && (
                      <img src={tag.path} alt={tag.name} className="w-3.5 h-3.5 object-contain" />
                    )}
                    {tag.name}
                  </span>
                ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {patent && (
                <a
                  href={patent}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500 hover:text-black border border-amber-500/40 text-amber-300 transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  Patent
                </a>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white transition-all cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}

              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  Live Demo
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
