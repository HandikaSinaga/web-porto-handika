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
      className="min-h-screen flex flex-col relative isolate transition-colors duration-200"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-main)" }}
    >
      {/* Unified static multi-accent backdrop continuous across every page and section */}
      <div
        aria-hidden="true"
        className="page-ambient-canvas pointer-events-none fixed inset-0 z-0"
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
