import React from "react";
import StackIcon from "tech-stack-icons";

interface TechIconProps {
  name: string;
  className?: string;
}

export const TECH_INFO: Record<string, { color: string; gradient: string }> = {
  "Java": { color: "#ED8B00", gradient: "from-[#ED8B00] to-[#f89820]" },
  "TypeScript": { color: "#3178C6", gradient: "from-[#3178C6] to-[#00273f]" },
  "JavaScript": { color: "#F7DF1E", gradient: "from-[#F7DF1E] to-[#cca700]" },
  "Python": { color: "#3776AB", gradient: "from-[#3776AB] to-[#ffe873]" },
  "C#": { color: "#239120", gradient: "from-[#239120] to-[#175d15]" },
  "C++": { color: "#00599C", gradient: "from-[#00599C] to-[#004480]" },
  "PHP": { color: "#777BB4", gradient: "from-[#777BB4] to-[#4F5B93]" },
  "SQL": { color: "#00758F", gradient: "from-[#00758F] to-[#f29111]" },
  "React": { color: "#61DAFB", gradient: "from-[#61DAFB] to-[#222222]" },
  "Next.js": { color: "#FFFFFF", gradient: "from-[#FFFFFF] to-[#333333]" },
  "Angular": { color: "#DD0031", gradient: "from-[#DD0031] to-[#C3002F]" },
  "HTML5 & CSS3": { color: "#E34F26", gradient: "from-[#E34F26] to-[#1572B6]" },
  "Tailwind CSS": { color: "#06B6D4", gradient: "from-[#06B6D4] to-[#0b94b0]" },
  "Spring Boot": { color: "#6DB33F", gradient: "from-[#6DB33F] to-[#5a9a32]" },
  "Spring Security": { color: "#6DB33F", gradient: "from-[#6DB33F] to-[#005a9c]" },
  "Node.js & Express": { color: "#339933", gradient: "from-[#339933] to-[#215732]" },
  "REST APIs": { color: "#009688", gradient: "from-[#009688] to-[#004d40]" },
  "JWT Auth": { color: "#D63AFF", gradient: "from-[#D63AFF] to-[#000000]" },
  "React Native": { color: "#61DAFB", gradient: "from-[#61DAFB] to-[#1c3c45]" },
  "Android Dev": { color: "#3DDC84", gradient: "from-[#3DDC84] to-[#2da863]" },
  "PostgreSQL": { color: "#4169E1", gradient: "from-[#4169E1] to-[#336791]" },
  "MySQL": { color: "#00758F", gradient: "from-[#00758F] to-[#005a6d]" },
  "MongoDB": { color: "#47A248", gradient: "from-[#47A248] to-[#3f8040]" },
  "Firebase": { color: "#FFCA28", gradient: "from-[#FFCA28] to-[#F57C00]" },
  "Git & GitHub": { color: "#F05032", gradient: "from-[#F05032] to-[#24292e]" },
  "Agile Scrum": { color: "#0052CC", gradient: "from-[#0052CC] to-[#0747a6]" },
  "MVC & OOP": { color: "#9C27B0", gradient: "from-[#9C27B0] to-[#7B1FA2]" },
  "Postman": { color: "#FF6C37", gradient: "from-[#FF6C37] to-[#e0531b]" },
};

export default function TechIcon({ name, className = "w-6 h-6" }: TechIconProps) {
  switch (name) {
    case "Java":
      return <StackIcon name="java" className={className} />;
    case "TypeScript":
      return <StackIcon name="typescript" className={className} />;
    case "JavaScript":
      return <StackIcon name="js" className={className} />;
    case "Python":
      return <StackIcon name="python" className={className} />;
    case "C#":
      return <StackIcon name="csharp" className={className} />;
    case "C++":
      return <StackIcon name="c++" className={className} />;
    case "PHP":
      return <StackIcon name="php" className={className} />;
    case "SQL":
      return <StackIcon name="mysql" className={className} />;
    case "React":
      return <StackIcon name="react" className={className} />;
    case "Next.js":
      return <StackIcon name="nextjs" className={className} />;
    case "Angular":
      return <StackIcon name="angular" className={className} />;
    case "HTML5 & CSS3":
      return (
        <div className={`flex ${className} space-x-1`}>
          <StackIcon name="html5" className="w-full h-full" />
          <StackIcon name="css3" className="w-full h-full" />
        </div>
      );
    case "Tailwind CSS":
      return <StackIcon name="tailwindcss" className={className} />;
    case "Spring Boot":
    case "Spring Security":
      return <StackIcon name="spring" className={className} />;
    case "Node.js & Express":
      return <StackIcon name="nodejs" className={className} />;
    case "REST APIs":
      return <StackIcon name="postman" className={className} />;
    case "JWT Auth":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "React Native":
      return <StackIcon name="reactnative" className={className} />;
    case "Android Dev":
      return <StackIcon name="android" className={className} />;
    case "PostgreSQL":
      return <StackIcon name="postgresql" className={className} />;
    case "MySQL":
      return <StackIcon name="mysql" className={className} />;
    case "MongoDB":
      return <StackIcon name="mongodb" className={className} />;
    case "Firebase":
      return <StackIcon name="firebase" className={className} />;
    case "Git & GitHub":
      return <StackIcon name="github" className={className} />;
    case "Agile Scrum":
      return <StackIcon name="jira" className={className} />;
    case "MVC & OOP":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="8.5" y="14" width="7" height="7" />
          <line x1="6.5" y1="10" x2="6.5" y2="12" />
          <line x1="17.5" y1="10" x2="17.5" y2="12" />
          <line x1="6.5" y1="12" x2="17.5" y2="12" />
          <line x1="12" y1="12" x2="12" y2="14" />
        </svg>
      );
    case "Postman":
      return <StackIcon name="postman" className={className} />;
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}
