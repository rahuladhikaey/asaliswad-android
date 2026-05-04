"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header title="System Error" subtitle="Something went wrong" />
      <main className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-4xl text-red-600 animate-pulse">
          ⚠️
        </div>
        <h1 className="mt-8 text-3xl font-black tracking-tight sm:text-5xl">Unexpected Disturbance.</h1>
        <p className="mt-4 max-w-md text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          We encountered a temporary technical issue while processing your request. Our team has been notified.
        </p>
        
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-full bg-slate-900 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-2xl shadow-slate-900/20"
          >
            Attempt Recovery
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-100 bg-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 transition-all hover:bg-slate-50 active:scale-95 shadow-xl shadow-slate-100"
          >
            Return to Store
          </Link>
        </div>

        <div className="mt-20 rounded-3xl bg-slate-50 p-8 text-left border border-slate-100 max-w-2xl w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Diagnostic Logs</p>
          <code className="mt-4 block text-[10px] font-mono text-slate-500 overflow-x-auto whitespace-pre-wrap">
            {error.message || "No specific error message provided."}
            {error.digest && `\nDigest ID: ${error.digest}`}
          </code>
        </div>
      </main>
    </div>
  );
}
