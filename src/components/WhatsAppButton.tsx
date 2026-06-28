"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/LanguageContext";
import { cn } from "@/lib/utils";

export default function WhatsAppButton() {
  const { lang } = useLanguage();

  const waNumber = "21628150013";
  // Pre-filled messages for different languages
  const messages = {
    en: "Hi Zied, I visited your portfolio and would love to connect!",
    fr: "Bonjour Zied, j'ai visité votre portfolio et j'aimerais prendre contact !",
    ar: "مرحباً زياد، لقد زرت ملفك الشخصي وأود التواصل معك!",
  };

  const text = encodeURIComponent(messages[lang] || messages.en);
  const waUrl = `https://wa.me/${waNumber}?text=${text}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 25px rgba(34, 197, 94, 0.7)",
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "fixed bottom-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-green-400/20 transition-all duration-300",
        lang === "ar" ? "right-6 sm:right-10" : "left-6 sm:left-10"
      )}
      aria-label="Contact on WhatsApp"
    >
      {/* Pulse Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping pointer-events-none" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}
