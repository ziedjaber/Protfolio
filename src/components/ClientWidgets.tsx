"use client";

import React from "react";
import dynamic from "next/dynamic";

const AiAssistant = dynamic(() => import("./AiAssistant"), { ssr: false });
const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });



export default function ClientWidgets() {
  return (
    <>
      <AiAssistant />
      <WhatsAppButton />
    </>
  );
}
