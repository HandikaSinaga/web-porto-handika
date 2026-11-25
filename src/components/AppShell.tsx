"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import CommandMenu from "@/components/CommandMenu";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleToggleCommand = () => {
      setIsCommandOpen((prev) => !prev);
    };

    window.addEventListener("toggle-command-menu", handleToggleCommand);
    return () => window.removeEventListener("toggle-command-menu", handleToggleCommand);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative transition-colors duration-200"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-main)" }}
    >
      {/* Subtle single crimson radial atmosphere behind hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[960px] h-[520px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 18%, var(--color-primary-tint), transparent 72%)",
        }}
      />

      <TopNavbar />

      <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
        {children}
      </main>

      <Footer />

      <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </div>
  );
}
