"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const DynamicStarsCanvas = dynamic(() => import("@/components/DynamicStarsCanvas"), {
  ssr: false,
  loading: () => null,
});
import { LanguageProvider } from "../LanguageContext";
import ClientWidgets from "@/components/ClientWidgets";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {/* Deep Space Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,40,200,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(50,20,120,0.2) 0%, transparent 60%), #030014",
        }}
        aria-hidden="true"
      />

      {/* Animated Star Canvas */}
      <DynamicStarsCanvas />

      {/* Nebula Blobs */}
      <div
        className="fixed top-[10%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none z-[1] animate-nebula-pulse"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />
      <div
        className="fixed top-[50%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none z-[1] animate-nebula-pulse"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)", filter: "blur(70px)", animationDelay: "5s" }}
        aria-hidden="true"
      />

      {/* Content Layer */}
      <div className="relative z-[30] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <ClientWidgets />
    </LanguageProvider>
  );
}
