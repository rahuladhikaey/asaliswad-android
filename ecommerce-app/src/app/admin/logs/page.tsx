"use client";

import { Header } from "@/components/Header";
import { useState } from "react";
import { Terminal, Shield, Globe, Database, AlertCircle } from "lucide-react";

const mockLogs = [
  { id: 1, type: "system", message: "Supabase connection established", status: "success", time: "2 mins ago" },
  { id: 2, type: "network", message: "API endpoint /api/products/fetch called", status: "info", time: "5 mins ago" },
  { id: 3, type: "security", message: "Admin dashboard accessed", status: "warning", time: "12 mins ago" },
  { id: 4, type: "database", message: "New order #4592 synchronized", status: "success", time: "25 mins ago" },
  { id: 5, type: "network", message: "Failed to load external resource: logo.png", status: "error", time: "1 hour ago" },
];

export default function AdminLogs() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      <Header title="System Analytics" subtitle="Real-time Operational Logs" />
      
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="glass-effect rounded-[2.5rem] p-10 shadow-2xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Active Stream</h2>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Monitoring all service activities</p>
            </div>
            
            <div className="flex gap-2">
              {["all", "error", "warning"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === f ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div 
                key={log.id} 
                className="group relative flex items-center gap-6 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  log.status === "success" ? "bg-emerald-50 text-emerald-600" :
                  log.status === "error" ? "bg-red-50 text-red-600" :
                  log.status === "warning" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-600"
                }`}>
                  {log.type === "system" && <Terminal size={20} />}
                  {log.type === "network" && <Globe size={20} />}
                  {log.type === "security" && <Shield size={20} />}
                  {log.type === "database" && <Database size={20} />}
                  {log.status === "error" && <AlertCircle size={20} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{log.type}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{log.time}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-slate-700 truncate">{log.message}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                   <div className={`h-1.5 w-1.5 rounded-full ${
                     log.status === "success" ? "bg-emerald-500 animate-pulse" :
                     log.status === "error" ? "bg-red-500" :
                     log.status === "warning" ? "bg-amber-500" : "bg-slate-300"
                   }`} />
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Live</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl">
            <h3 className="text-lg font-black tracking-tight">Technical Support</h3>
            <p className="mt-2 text-sm font-medium text-slate-400 leading-relaxed">
              Facing persistent HTTP errors? Our engineering dashboard automatically captures all 404 and 500 status codes for review.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="rounded-full bg-white px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-emerald-500 hover:text-white transition-all">
                Download Full Log History
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
