"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
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
    <div className="flex flex-col min-h-screen bg-slate-50/60 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors relative selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed -top-24 -left-24 w-96 h-96 opacity-25 dark:opacity-20 blur-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-600 rounded-full -z-10" />
      <div className="pointer-events-none fixed top-1/3 -right-24 w-96 h-96 opacity-15 dark:opacity-10 blur-3xl bg-cyan-500 rounded-full -z-10" />

      {/* Top Profile Header (Hero) */}
      <Hero />

      {/* Main Two-Column Body: Left Sidebar + Right Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-6 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Sidebar />
          <main className="lg:col-span-9 w-full min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Persistent Footer */}
      <Footer />

      {/* Command Menu Modal */}
      <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </div>
  );
}
