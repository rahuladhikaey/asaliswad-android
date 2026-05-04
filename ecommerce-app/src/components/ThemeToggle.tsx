"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-900/50 p-1.5 border border-slate-800 transition-all hover:border-amber-500/50 active:scale-95 group"
      aria-label="Toggle Dark Mode"
    >
      <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${!isDark ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20" : "text-slate-400"}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${isDark ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400"}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
      <span className="pr-4 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
