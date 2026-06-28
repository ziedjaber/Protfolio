"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  GraduationCap,
  Code2,
  Brain,
  Database,
  Wrench,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowRight,
  AppWindow,
  Smartphone,
  Sparkles,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import TechIcon, { TECH_INFO } from "@/components/TechIcon";
import { useLanguage } from "@/LanguageContext";
import { cn } from "@/lib/utils";

// SKILLS DATA
const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "Java", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "C#", level: 75 },
      { name: "C++", level: 70 },
      { name: "PHP", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Frontend",
    icon: <AppWindow className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Angular", level: 80 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend & Devops",
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "Spring Boot", level: 85 },
      { name: "Spring Security", level: 80 },
      { name: "Node.js & Express", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Auth", level: 90 },
    ],
  },
  {
    title: "Mobile",
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "React Native", level: 80 },
      { name: "Android Dev", level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    title: "Tools & Arch",
    icon: <Wrench className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Agile Scrum", level: 85 },
      { name: "MVC & OOP", level: 90 },
      { name: "Postman", level: 85 },
    ],
  },
];

// EXPERIENCE DATA - LOCALIZED IN LANGUAGE CONTEXT
const EXPERIENCES = [
  {
    company: "HELLO DATA",
    roleKey: "exp.role.1",
    period: "January 2025 – June 2025",
    descKey: "exp.desc.1",
    image: "/exp1.svg",
    colorClass: "border-light-blue",
    glowClass: "bg-blue-500/20",
    gradientClass: "via-blue-400/50",
  },
  {
    company: "AMWORKS",
    roleKey: "exp.role.2",
    period: "Previous Term",
    descKey: "exp.desc.2",
    image: "/exp2.svg",
    colorClass: "border-light-purple",
    glowClass: "bg-purple-500/20",
    gradientClass: "via-purple-400/50",
  },
  {
    company: "FREELANCE",
    roleKey: "exp.role.3",
    period: "Ongoing",
    descKey: "exp.desc.3",
    image: "/exp3.svg",
    colorClass: "border-light-cyan",
    glowClass: "bg-cyan-500/20",
    gradientClass: "via-cyan-400/50",
  },
  {
    company: "LEAD INITIATIVES",
    roleKey: "exp.role.4",
    period: "Academic Years",
    descKey: "exp.desc.4",
    image: "/exp4.svg",
    colorClass: "border-light-pink",
    glowClass: "bg-pink-500/20",
    gradientClass: "via-pink-400/50",
  },
];

// PROJECTS DATA
const FEATURED_PROJECTS = [
  {
    titleKey: "proj.title.locastore",
    descKey: "proj.desc.locastore",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "AI Integration"],
    image: "/images/locastore.png",
    github: "https://github.com/ziedjaber/LocaStore",
    featured: true,
  },
  {
    titleKey: "proj.title.livedocs",
    descKey: "proj.desc.livedocs",
    tech: ["React", "Node.js", "MongoDB", "WebSockets"],
    image: "/images/livedocs.png",
    github: "https://github.com/ziedjaber/Live-Docs",
    featured: true,
  },
  {
    titleKey: "proj.title.evently",
    descKey: "proj.desc.evently",
    tech: ["MERN Stack", "React", "QR Code", "Real-time"],
    image: "/images/evently.png",
    github: "https://github.com/ziedjaber/Evently",
    featured: true,
  },
];

const OTHER_PROJECTS = [
  {
    titleKey: "proj.title.gym",
    descKey: "proj.desc.gym",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    github: "https://github.com/ziedjaber",
  },
  {
    titleKey: "proj.title.hospital",
    descKey: "proj.desc.hospital",
    tech: ["C#", "ASP.NET Core", "PostgreSQL", "React"],
    github: "https://github.com/ziedjaber",
  },
  {
    titleKey: "proj.title.university",
    descKey: "proj.desc.university",
    tech: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
    github: "https://github.com/ziedjaber",
  },
];

// EDUCATION DATA
const EDUCATION_ITEMS = [
  {
    institution: "ISIMS Sfax",
    degreeKey: "edu.deg.1",
    period: "2025 – 2028",
    detailKey: "edu.det.1",
  },
  {
    institution: "ISET Tataouine",
    degreeKey: "edu.deg.2",
    period: "Graduated 2025",
    detailKey: "edu.det.2",
  },
  {
    institution: "GoMyCode",
    degreeKey: "edu.deg.3",
    period: "Specialized Training",
    detailKey: "edu.det.3",
  },
];

// ACHIEVEMENTS DATA
const ACHIEVEMENTS = [
  {
    titleKey: "ach.title.1",
    descKey: "ach.desc.1",
    statKey: "ach.stat.1",
  },
  {
    titleKey: "ach.title.2",
    descKey: "ach.desc.2",
    statKey: "ach.stat.2",
  },
  {
    titleKey: "ach.title.3",
    descKey: "ach.desc.3",
    statKey: "ach.stat.3",
  },
  {
    titleKey: "ach.title.4",
    descKey: "ach.desc.4",
    statKey: "ach.stat.4",
  },
  {
    titleKey: "ach.title.5",
    descKey: "ach.desc.5",
    statKey: "ach.stat.5",
  },
];

// Shared space-card style
const cardStyle: React.CSSProperties = {
  background: "rgba(13, 13, 43, 0.6)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(124, 58, 237, 0.15)",
};

// Floating technology badge component
const FloatingBadge = ({ skill, index }: { skill: { name: string }; index: number }) => {
  const info = TECH_INFO[skill.name] || { color: "#7c3aed", gradient: "from-[#7c3aed] to-[#6366f1]" };

  // Staggered floating effect
  const yDuration = 3 + (index % 4) * 0.6;
  const yDelay = (index % 3) * 0.4;

  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: yDuration,
        delay: yDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.06,
        rotate: index % 2 === 0 ? 1 : -1,
        boxShadow: `0 0 15px ${info.color}33`,
        borderColor: info.color,
      }}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-500/10 bg-[#0d0d2b]/60 backdrop-blur-md cursor-default text-gray-300 transition-all duration-300"
      style={{
        borderColor: "rgba(124, 58, 237, 0.12)",
      }}
    >
      {/* Brand color indicator dot */}
      <span
        className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 shrink-0"
        style={{ backgroundColor: info.color }}
      />

      {/* Brand Icon */}
      <div
        className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center shrink-0"
        style={{ color: info.color }}
      >
        <TechIcon name={skill.name} className="w-5 h-5" />
      </div>

      {/* Technology Name */}
      <span className="text-gray-300 font-medium text-xs sm:text-sm tracking-wide transition-colors duration-300 group-hover:text-white whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
};

const FOCUS_DESCRIPTIONS = [
  "Architecting scalable, enterprise-grade backend systems using Spring Boot. Designing resilient microservices, optimizing database queries, and ensuring high-availability data flow across distributed networks.",
  "Building state-of-the-art frontend ecosystems with React and Angular. Ensuring 60FPS animations, zero layout shifts, and seamless user experiences.",
  "Bridging theoretical computer science with real-world product delivery.",
  "Developing fluid cross-platform mobile applications tuned for optimal hardware utilization.",
  "Implementing predictive models and intelligent data processing pipelines.",
];

function CurrentlySection() {
  const { t } = useLanguage();

  return (
    <section
      id="currently"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20"
    >
      <Reveal>
        <div className="mb-12">
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-widest">
            {t("currently.badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-serif mt-2">
            {t("currently.title")}
          </h2>
          <div
            className="w-12 h-[2px] mt-4"
            style={{ background: "linear-gradient(90deg, #7c3aed, #818cf8)" }}
          />
          <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-2xl">
            {t("currently.subtitle")}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FOCUS_DESCRIPTIONS.map((desc, idx) => (
          <Reveal key={idx} delay={idx * 0.08}>
            <div
              className="rounded-xl p-6 h-full transition-colors duration-300 hover:border-purple-500/30"
              style={cardStyle}
            >
              <span className="text-xs font-semibold text-purple-400 tracking-widest">
                0{idx + 1}
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-2">
                {t(`focus.${idx}`)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <div className="relative min-h-screen">
      
      {/* ── FLOATING CV DOWNLOAD BUTTON (Gorgeous Action Button) ── */}
      <motion.a
        href="/cv.pdf"
        download
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 25px rgba(124, 58, 237, 0.7)",
        }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-purple-400/20 backdrop-blur-md transition-all duration-300",
          lang === "ar" ? "left-6 sm:left-10" : "right-6 sm:right-10"
        )}
      >
        <Download className="w-4 h-4 animate-bounce" />
        <span>{t("button.downloadCv")}</span>
      </motion.a>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Video */}
        <video
          suppressHydrationWarning
          autoPlay
          muted
          loop
          playsInline
          className="rotate-180 absolute top-[-50%] md:top-[-60%] left-0 z-0 w-full h-[150%] object-cover pointer-events-none opacity-70 mix-blend-screen"
          style={{ clipPath: "ellipse(70% 100% at 50% 0%)" }}
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>

        {/* Section glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(120,40,200,0.18) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          {/* Welcome Badge */}
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 Welcome-box px-4 py-2 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span className="Welcome-text text-xs font-semibold uppercase tracking-widest">
                {t("hero.badge")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight leading-[0.95]">
              <span className="text-white">Mohamed</span>{" "}
              <span className="text-hero-gradient block">Zied Jabeur</span>
            </h1>
          </Reveal>

          {/* Neon divider */}
          <Reveal delay={0.3}>
            <div
              className="w-32 h-[1px] mx-auto my-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #a78bfa, #818cf8, transparent)",
              }}
            />
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-sm sm:text-base uppercase tracking-[0.22em] text-gray-400 font-semibold leading-relaxed">
              {t("hero.tagline")}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed font-light font-body">
              {t("hero.desc")}{" "}
              <span className="text-white font-semibold">
                {t("hero.award")}
              </span>{" "}
              {t("hero.and")}
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="#projects">
                <button
                  className="h-11 px-7 text-white font-semibold text-xs uppercase tracking-wider rounded-sm cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
                  }}
                >
                  {t("hero.viewProjects")}
                </button>
              </Link>
              <a href="#contact">
                <button
                  className="h-11 px-7 text-gray-300 hover:text-white text-xs uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer hover:border-purple-500/50"
                  style={cardStyle}
                >
                  {t("hero.contactMe")}
                </button>
              </a>
              <a
                href="/cv.pdf"
                download
                className="h-11 px-7 text-purple-300 hover:text-white border border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 rounded-sm"
                style={cardStyle}
              >
                {t("button.downloadCv")} <Download className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/ziedjaber"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 text-gray-400 hover:text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 rounded-sm hover:border-purple-500/40"
                style={cardStyle}
              >
                GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 pointer-events-none">
          <div
            className="w-[1px] h-12 animate-bounce"
            style={{
              background:
                "linear-gradient(to bottom, #a78bfa, transparent)",
            }}
          />
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section
        id="about"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-purple-900/20 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                {t("about.my")}{" "}
                <span className="text-ref-gradient">{t("about.word")}</span>
              </h2>
              <div
                className="w-12 h-[2px] mt-5"
                style={{ background: "linear-gradient(90deg, #7c3aed, #818cf8)" }}
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <Reveal delay={0.1}>
              <p className="text-lg text-white font-light leading-relaxed">
                {t("about.p1")}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-400 leading-relaxed font-light">
                {t("about.p2")}
              </p>
            </Reveal>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <Reveal delay={0.3}>
                <div
                  className="p-6 rounded-sm hover:border-purple-500/30 transition-all duration-300"
                  style={cardStyle}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.25)",
                    }}
                  >
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide text-md">
                    {t("about.card1.title")}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 font-light">
                    {t("about.card1.desc")}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div
                  className="p-6 rounded-sm hover:border-purple-500/30 transition-all duration-300"
                  style={cardStyle}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.25)",
                    }}
                  >
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold tracking-wide text-md">
                    {t("about.card2.title")}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 font-light">
                    {t("about.card2.desc")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section
        id="skills"
        className="py-24 px-6 md:px-12 border-b border-purple-900/20 scroll-mt-20"
        style={{ background: "rgba(5, 2, 25, 0.5)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight">
                {t("skills.my")}{" "}
                <span className="text-ref-gradient">{t("skills.word")}</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-lg mx-auto font-light">
                {t("skills.subtitle")}
              </p>
              <div
                className="w-16 h-[2px] mx-auto mt-2"
                style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category, idx) => (
              <Reveal key={category.title} delay={idx * 0.05}>
                <div
                  className="p-6 rounded-sm h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
                  style={cardStyle}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      {category.icon}
                      <h3 className="text-white font-bold tracking-wider uppercase text-sm">
                        {t(`cat.${category.title}`)}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill, sIdx) => (
                        <FloatingBadge
                          key={skill.name}
                          skill={skill}
                          index={sIdx}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section
        id="experience"
        className="py-28 px-6 md:px-12 border-b border-purple-900/20 scroll-mt-20"
        style={{ background: "rgba(4, 1, 18, 0.5)" }}
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <Reveal>
            <div className="text-center space-y-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight">
                {t("exp.my")}{" "}
                <span className="text-ref-gradient">{t("exp.word")}</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto font-body font-light">
                {t("exp.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <Reveal key={exp.company} delay={idx * 0.05}>
                <div className="relative group p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                  {/* Rotating border light */}
                  <div className={cn("absolute inset-[-100%] opacity-50 group-hover:opacity-100 transition-opacity duration-500", exp.colorClass)} />

                  {/* Inner Content */}
                  <div
                    className="relative flex items-center gap-6 p-6 rounded-2xl h-full w-full cursor-default overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg, rgba(25,23,45,0.95) 0%, rgba(13,11,30,0.98) 100%)",
                    }}
                  >
                    <div className={cn("absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500", exp.gradientClass)} />
                    <div className={cn("absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", exp.glowClass)} />

                    <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 relative group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 ease-out drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      <Image src={exp.image} alt={t(exp.roleKey)} fill className="object-contain" />
                    </div>
                    <div className="space-y-2 z-10">
                      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest block">{exp.company} • {exp.period}</span>
                      <h3 className="text-white font-display font-bold text-lg sm:text-xl leading-tight transition-colors">
                        {t(exp.roleKey)}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-body font-medium">
                        {t(exp.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section
        id="projects"
        className="py-24 px-6 md:px-12 border-b border-purple-900/20 scroll-mt-20"
        style={{ background: "rgba(5, 2, 25, 0.5)" }}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <Reveal>
            <div className="text-center space-y-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight">
                {t("projects.my")}{" "}
                <span className="text-ref-gradient">{t("projects.word")}</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-lg mx-auto font-light">
                {t("projects.subtitle")}
              </p>
              <div
                className="w-16 h-[2px] mx-auto"
                style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }}
              />
            </div>
          </Reveal>

          {/* Primary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, idx) => (
              <Reveal key={project.titleKey} delay={idx * 0.1}>
                <div
                  className="group rounded-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] hover:border-purple-500/30"
                  style={cardStyle}
                >
                  {/* Project image */}
                  <div
                    className="relative h-48 w-full overflow-hidden border-b"
                    style={{ borderColor: "rgba(124,58,237,0.15)", background: "#080820" }}
                  >
                    <Image
                      src={project.image}
                      alt={`${t(project.titleKey)} mockup`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13,13,43,0.8) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-light h-16 overflow-y-auto">
                        {t(project.descKey)}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-gray-400 text-[10px] uppercase tracking-wider rounded-sm"
                            style={{
                              background: "rgba(124,58,237,0.08)",
                              border: "1px solid rgba(124,58,237,0.2)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-between gap-4 pt-6 mt-6"
                      style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-wider uppercase text-gray-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                      >
                        GitHub Repo <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Secondary Systems Grid */}
          <div className="space-y-8 pt-8">
            <Reveal>
              <h3 className="text-xl font-bold text-white tracking-wider uppercase text-center font-serif">
                {t("proj.sys_implementations")}
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OTHER_PROJECTS.map((proj, idx) => (
                <Reveal key={proj.titleKey} delay={idx * 0.05}>
                  <div
                    className="p-6 rounded-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.1)] hover:border-purple-500/25"
                    style={cardStyle}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-bold text-sm tracking-wide">
                          {t(proj.titleKey)}
                        </h4>
                        <Award className="w-4 h-4 text-purple-400/60" />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">
                        {t(proj.descKey)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[9px] text-gray-500 uppercase tracking-wider rounded-sm"
                            style={{
                              background: "rgba(124,58,237,0.06)",
                              border: "1px solid rgba(124,58,237,0.15)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] tracking-wider uppercase text-gray-400 hover:text-white inline-flex items-center gap-1.5 mt-5 pt-3 w-fit transition-colors"
                      style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}
                    >
                      {t("projects.viewCode")}{" "}
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION & ACHIEVEMENTS ── */}
      <section
        id="education"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education column */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-serif">
                {t("edu.my")}{" "}
                <span className="text-space-gradient font-light block">
                  {t("edu.word")}
                </span>
              </h2>
              <div
                className="w-12 h-[2px] mt-4"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #818cf8)",
                }}
              />
            </Reveal>

            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-purple-900/50">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <Reveal key={edu.institution} delay={idx * 0.1}>
                  <div className="relative pl-12 group">
                    <div
                      className="absolute left-1.5 top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                      style={{
                        background: "rgba(3,0,20,0.9)",
                        border: "1px solid #7c3aed",
                      }}
                    >
                      <GraduationCap className="w-3 h-3 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="text-xs text-purple-400 font-semibold tracking-widest uppercase">
                        {edu.period}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-wide mt-1">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium">
                        {t(edu.degreeKey)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">
                        {t(edu.detailKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Achievements column */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-serif">
                {t("edu.achievements")}
              </h2>
              <div
                className="w-12 h-[2px] mt-4"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #818cf8)",
                }}
              />
            </Reveal>

            <div className="grid grid-cols-1 gap-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <Reveal key={ach.titleKey} delay={idx * 0.05}>
                  <div
                    className="p-4 rounded-sm transition-all duration-300 flex items-center gap-4 hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] hover:border-purple-500/25"
                    style={cardStyle}
                  >
                    <div
                      className="text-xs font-bold font-mono tracking-widest text-purple-300 px-3 py-2.5 rounded-sm min-w-[70px] text-center flex-shrink-0"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.25)",
                      }}
                    >
                      {t(ach.statKey)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {t(ach.titleKey)}
                      </h3>
                      <p className="text-xs text-gray-400 font-light mt-1">
                        {t(ach.descKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENTLY SECTION ── */}
      <CurrentlySection />

      {/* ── CONTACT SECTION ── */}
      <section
        id="contact"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Details */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-serif">
                {t("contact.getIn")}{" "}
                <span className="text-space-gradient font-light block mt-1">
                  {t("contact.subtitle")}
                </span>
              </h2>
              <div
                className="w-12 h-[2px] mt-4"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #818cf8)",
                }}
              />
              <p className="text-gray-400 text-sm mt-6 font-light leading-relaxed">
                {t("contact.desc")}
              </p>
            </Reveal>

            {/* Contact Icons */}
            <div className="space-y-4 pt-4">
              <Reveal delay={0.1}>
                <a
                  href="mailto:mohamedziedjabeur@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] hover:border-purple-500/30 group"
                  style={cardStyle}
                >
                  <div
                    className="p-2 rounded-sm text-purple-400"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-bold">
                      {t("contact.email")}
                    </span>
                    <span className="text-sm text-white font-medium group-hover:text-purple-300 transition-colors">
                      mohamedziedjabeur@gmail.com
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href="tel:+21628150013"
                  className="flex items-center gap-4 p-4 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] hover:border-purple-500/30 group"
                  style={cardStyle}
                >
                  <div
                    className="p-2 rounded-sm text-purple-400"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-bold">
                      {t("contact.phone")}
                    </span>
                    <span className="text-sm text-white font-medium group-hover:text-purple-300 transition-colors">
                      +216 28 150 013
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  className="flex items-center gap-4 p-4 rounded-sm"
                  style={cardStyle}
                >
                  <div
                    className="p-2 rounded-sm text-purple-400"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-bold">
                      {t("contact.location")}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {t("contact.locationVal")}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Socials */}
            <div className="flex gap-4 pt-2">
              <Reveal delay={0.4}>
                <a
                  href="https://www.linkedin.com/in/mohamed-zied-jabeur-33bb9b269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 text-gray-300 hover:text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:border-purple-500/40"
                  style={cardStyle}
                >
                  <Linkedin className="w-4 h-4 text-purple-400" /> LinkedIn
                </a>
              </Reveal>
              <Reveal delay={0.5}>
                <a
                  href="https://github.com/ziedjaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 text-gray-300 hover:text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:border-purple-500/40"
                  style={cardStyle}
                >
                  <Github className="w-4 h-4 text-purple-400" /> GitHub
                </a>
              </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="lg:col-span-7 p-8 rounded-sm"
            style={cardStyle}
          >
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                    {t("contact.sendMsg")}
                  </h3>
                  <div
                    className="w-8 h-[2px] mt-2"
                    style={{
                      background: "linear-gradient(90deg, #7c3aed, #818cf8)",
                    }}
                  />
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
