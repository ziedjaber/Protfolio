"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send message. Please verify your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === "loading"}
            aria-disabled={status === "loading"}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
          >
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === "loading"}
            aria-disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
        >
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Collaboration Inquiry"
          disabled={status === "loading"}
          aria-disabled={status === "loading"}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or opportunity..."
          disabled={status === "loading"}
          aria-disabled={status === "loading"}
          rows={5}
        />
      </div>

      {/* Action / Feedback */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          type="submit"
          variant="space"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          }}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message <Send className="w-4 h-4" />
            </span>
          )}
        </Button>

        {/* Form Notifications */}
        <div aria-live="polite" className="w-full sm:w-auto">
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-400 text-sm py-2 px-3 border border-green-500/20 bg-green-500/5 rounded-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Message sent successfully!</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm py-2 px-3 border border-red-500/20 bg-red-500/5 rounded-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
