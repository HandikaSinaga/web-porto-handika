"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Lock body scroll during initial skeleton load
    document.body.style.overflow = "hidden";

    // Realistic skeleton load timing with smooth fade-out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 800);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {children}
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] overflow-y-auto bg-[#f8fafc] dark:bg-[#070b12] transition-opacity duration-500 ease-out ${
            isFading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          {/* Top Progress Loading Bar */}
          <div className="fixed top-0 left-0 right-0 h-[3px] z-[10000] overflow-hidden bg-slate-200/50 dark:bg-slate-800/50">
            <div className="h-full w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 animate-[loading-progress_0.9s_ease-in-out_forwards]" />
          </div>
          <Loading />
        </div>
      )}
    </>
  );
}
