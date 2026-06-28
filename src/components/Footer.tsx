"use client";
import React from "react";
import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-purple-900/30 py-12 relative overflow-hidden"
      style={{ background: "rgba(3, 0, 20, 0.9)" }}
    >
      {/* Nebula glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-400">Mohamed Zied Jabeur</span>. All
            Rights Reserved.
          </p>
          <p className="text-[10px] tracking-widest text-gray-600 uppercase mt-1">
            Built with Next.js 15 · Tailwind v4 · Three.js · Framer Motion
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ziedjaber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 p-2.5 border border-purple-900/40 rounded-full hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] hover:bg-purple-500/5"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-zied-jabeur-33bb9b269/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 p-2.5 border border-purple-900/40 rounded-full hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] hover:bg-purple-500/5"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <a
          href="#"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-300 group"
          aria-label="Back to top"
        >
          Back To Top
          <span className="p-2 border border-purple-900/40 rounded-full group-hover:border-purple-500/50 group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] transition-all duration-300">
            <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
          </span>
        </a>
      </div>
    </footer>
  );
}
