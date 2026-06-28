"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2, User } from "lucide-react";
import { useLanguage } from "@/LanguageContext";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface NavigationChip {
  text: string;
  navigate: string;
}

interface LocalizedContent {
  assistantTitle: string;
  onlineStatus: string;
  placeholder: string;
  welcome: string;
  chips: NavigationChip[];
}

type Locale = "en" | "fr" | "ar";

// ── Localization ─────────────────────────────────────
const LOCALIZED_TEXT: Record<Locale, LocalizedContent> = {
  en: {
    assistantTitle: "Zied's AI Assistant",
    onlineStatus: "Online",
    placeholder: "Ask me about Zied...",
    welcome:
      "Hello! I am Zied's AI Assistant. Feel free to ask about my skills, projects, experience, or education. I can also help you navigate the page!",
    chips: [
      { text: "Show me your projects", navigate: "projects" },
      { text: "What tech do you use?", navigate: "skills" },
      { text: "Tell me about your experience", navigate: "experience" },
      { text: "How can I contact you?", navigate: "contact" },
      { text: "Can I download your CV?", navigate: "hero" },
    ],
  },
  fr: {
    assistantTitle: "L'assistant IA de Zied",
    onlineStatus: "En ligne",
    placeholder: "Posez une question sur Zied...",
    welcome:
      "Bonjour ! Je suis l'assistant virtuel de Zied. N'hésitez pas à me poser des questions sur mes compétences, mes projets ou mon parcours. Je peux également faire défiler la page pour vous !",
    chips: [
      { text: "Montre-moi tes projets", navigate: "projects" },
      { text: "Quelles technos utilises-tu ?", navigate: "skills" },
      { text: "Parle-moi de ton expérience", navigate: "experience" },
      { text: "Comment te contacter ?", navigate: "contact" },
      { text: "Puis-je télécharger ton CV ?", navigate: "hero" },
    ],
  },
  ar: {
    assistantTitle: "مساعد زياد الذكي",
    onlineStatus: "نشط الآن",
    placeholder: "اسألني عن زياد...",
    welcome:
      "مرحباً! أنا مساعد زياد الذكي. اسألني عن مهاراته، مشاريعه، خبراته المهنية أو تعليمه. يمكنني أيضاً إرشادك وتصفح الموقع معك!",
    chips: [
      { text: "عرض المشاريع", navigate: "projects" },
      { text: "ما هي المهارات التقنية المستخدمة؟", navigate: "skills" },
      { text: "حدثني عن خبراتك المهنية", navigate: "experience" },
      { text: "كيف يمكنني التواصل معك؟", navigate: "contact" },
      { text: "هل يمكنني تحميل سيرتك الذاتية؟", navigate: "hero" },
    ],
  },
};

const HIGHLIGHT_CLASSES = [
  "transition-all",
  "duration-700",
  "ring-4",
  "ring-violet-500/40",
  "shadow-[0_0_40px_-4px_rgb(139,92,246)]",
  "scale-[1.015]",
] as const;

const HIGHLIGHT_DURATION_MS = 2800;

// ── Component ─────────────────────────────────────────
export default function AiAssistant() {
  const { lang } = useLanguage();
  const t = LOCALIZED_TEXT[lang as Locale] || LOCALIZED_TEXT.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t.welcome }]);
    }
  }, [lang, t.welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Navigation Handler
  const handleNavigation = useCallback((targetSection: string) => {
    if (!targetSection || targetSection === "none") return;

    if (targetSection === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetSection);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.classList.add(...HIGHLIGHT_CLASSES);

    setTimeout(() => {
      element.classList.remove(...HIGHLIGHT_CLASSES);
    }, HIGHLIGHT_DURATION_MS);
  }, []);

  // Send Message
  const handleSendMessage = useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: trimmedText };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMessage], lang }),
        });

        if (!response.ok) throw new Error("Chat request failed");

        const data = await response.json();

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.response || "Something went wrong. Let's try again!",
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (data.navigate && data.navigate !== "none") {
          handleNavigation(data.navigate);
        }
      } catch (error) {
        console.error("AI Assistant Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I'm having trouble connecting. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, lang, isLoading, handleNavigation]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Simple Markdown Renderer
  const renderMarkdown = useCallback((text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split("\n").map((line, index) => {
      const processedLine = line.replace(boldRegex, "<strong>$1</strong>");

      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const content = line.trim().substring(2);
        return (
          <li
            key={index}
            className="ml-4 list-disc text-[15px] text-gray-200 mb-1"
            dangerouslySetInnerHTML={{ __html: content.replace(boldRegex, "<strong>$1</strong>") }}
          />
        );
      }

      if (!line.trim()) return <div key={index} className="h-2" />;

      return (
        <p
          key={index}
          className="text-[15px] leading-relaxed mb-2 text-gray-100"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  }, []);

  const isRTL = lang === "ar";

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600",
          "flex items-center justify-center shadow-xl shadow-purple-500/30 border border-white/10 backdrop-blur-md",
          isRTL ? "left-6 bottom-24" : "right-6 bottom-24"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Sparkles className="w-7 h-7 text-white" />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed z-[60] flex flex-col w-full h-[100dvh] sm:w-[400px] sm:h-[640px]",
              "bg-[#0a081f] border border-purple-900/60 rounded-none sm:rounded-3xl",
              "shadow-2xl overflow-hidden backdrop-blur-2xl",
              isRTL ? "sm:left-8" : "sm:right-8",
              "sm:bottom-28"
            )}
          >
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-purple-900/30 bg-[#0f0c24]">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-[2.5px] border-[#0a081f] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg tracking-tight">
                    {t.assistantTitle}
                  </h3>
                  <p className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                    ● {t.onlineStatus}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-7 bg-[#0a081f] scrollbar-thin scrollbar-thumb-purple-700/60">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex-shrink-0 mt-1 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[82%] px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm",
                      msg.role === "assistant"
                        ? "bg-[#14112a] border border-purple-800/50 rounded-tl-none text-gray-100"
                        : "bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-tr-none"
                    )}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {renderMarkdown(msg.content)}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-2xl bg-slate-800 border border-slate-700 flex-shrink-0 mt-1 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#14112a] border border-purple-800/50 px-5 py-4 rounded-3xl rounded-tl-none flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    <span className="text-gray-400 text-sm">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <nav className="p-4 border-t border-purple-900/30 bg-[#0a081f] flex flex-wrap gap-2">
              {t.chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.text)}
                  className="px-4 py-2.5 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-2xl transition-all active:scale-[0.97]"
                >
                  {chip.text}
                </button>
              ))}
            </nav>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-5 border-t border-purple-900/30 bg-[#0a081f]"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={isLoading}
                  className="w-full bg-[#14112a] border border-purple-900/60 focus:border-purple-500 rounded-3xl px-6 py-4 text-sm placeholder-gray-500 focus:outline-none transition-all"
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 disabled:opacity-50 flex items-center justify-center transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}