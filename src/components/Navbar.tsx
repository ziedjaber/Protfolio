"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage, Language } from "../LanguageContext";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image"; // keep for logo only
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  {
    code: "en",
    label: "English",
    flag: "/USA.png",
  },
  {
    code: "fr",
    label: "Français",
    flag: "/france.png",
  },
  {
    code: "ar",
    label: "العربية",
    flag: "/tunisia.png",
  },
];

const NAV_ITEMS = [
  { key: "about",      href: "#about" },
  { key: "skills",     href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "projects",   href: "#projects" },
  { key: "education",  href: "#education" },
  { key: "currently",  href: "#currently" },
  { key: "contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const { lang, setLang, t } = useLanguage();
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          scrolled ? "border-purple-900/40 py-3" : "bg-transparent border-transparent py-5"
        )}
        style={scrolled ? {
          background: "rgba(3, 0, 20, 0.80)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => handleClick(e, "#")}
            className="group flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none"
            aria-label="Mohamed Zied Jabeur Portfolio Home"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_25px_rgba(167,139,250,0.7)] group-hover:scale-105">
              <Image src="/images/zied.png" alt="Mohamed Zied Jabeur" fill sizes="36px" priority className="object-cover" />
            </div>
            <span className="text-white font-bold text-sm tracking-wider group-hover:text-purple-300 transition-colors duration-300 hidden sm:block">
              Mohamed Zied<span className="text-purple-400"> Jabeur</span>
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="relative text-[11px] tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 py-1 font-medium group"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white border border-purple-500/20 hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
                aria-label="Select language"
              >
                <Image
                  src={currentLang.flag}
                  alt={currentLang.label}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <span className="tracking-wider uppercase hidden sm:block">{currentLang.code.toUpperCase()}</span>
                <ChevronDown
                  className={cn("w-3 h-3 transition-transform duration-300", langOpen && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{    opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full mt-2 right-0 w-40 rounded-xl border border-purple-500/20 overflow-hidden z-50"
                    style={{
                      background: "rgba(8, 6, 30, 0.96)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.1)",
                    }}
                  >
                    {LANGUAGES.map((l, i) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 group",
                          lang === l.code
                            ? "text-purple-300 bg-purple-500/15"
                            : "text-gray-400 hover:text-white hover:bg-purple-500/10",
                          i < LANGUAGES.length - 1 && "border-b border-purple-900/30"
                        )}
                      >
                        <Image
                           src={l.flag}
                           alt={l.label}
                           width={20}
                           height={20}
                           className="rounded-full object-cover"
                         />
                        <span>{l.label}</span>
                        {lang === l.code && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hire Me Button — Desktop only */}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-purple-300 border border-purple-500/30 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
            >
              {t("button.hireMe")} <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors p-2 -mr-2 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 right-0 w-full max-w-xs z-[60] lg:hidden flex flex-col"
            style={{
              background: "rgba(5, 2, 20, 0.98)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(124,58,237,0.2)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-900/30">
              <span className="text-white font-bold text-sm tracking-wider">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-purple-500/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col p-6 gap-1 flex-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="flex items-center gap-3 text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-all duration-300 py-3.5 px-4 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 font-medium group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="h-px bg-purple-900/30 my-4" />

              {/* Hire Me */}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="flex items-center justify-center gap-2 text-sm tracking-widest uppercase text-purple-300 border border-purple-500/40 px-4 py-3 rounded-lg transition-all duration-300 bg-purple-500/8 hover:bg-purple-500/15 hover:border-purple-400 font-semibold"
              >
                {t("button.hireMe")} <ArrowUpRight className="w-4 h-4" />
              </a>
            </nav>

            {/* Language switcher inside drawer */}
            <div className="p-6 border-t border-purple-900/30">
              <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 font-bold">Language</p>
              <div className="flex gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg border transition-all duration-200 text-xs font-bold tracking-wider uppercase",
                      lang === l.code
                        ? "border-purple-500/50 bg-purple-500/15 text-purple-300"
                        : "border-purple-900/30 bg-transparent text-gray-500 hover:text-gray-300 hover:border-purple-700/40"
                    )}
                  >
                    <Image
                        src={l.flag}
                        alt={l.label}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                    <span>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] lg:hidden"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}