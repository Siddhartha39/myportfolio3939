import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  github,
  patent,
  badge,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-6 sm:flex sm:space-y-0 group transition-all duration-200 hover:px-2 rounded-xl"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {title}
            </p>
            {badge && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-sand text-xs">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-neutral-900/80 px-2 py-0.5 rounded border border-white/5 text-neutral-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/80 hover:bg-cyan-500 hover:text-black border border-white/10 text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm group-hover:border-cyan-400"
        >
          Explore Project
          <img src="assets/arrow-right.svg" className="w-4 h-4" alt="arrow" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent h-[1px] w-full" />

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          github={github}
          patent={patent}
          badge={badge}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
