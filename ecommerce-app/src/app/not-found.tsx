import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header title="404" subtitle="Page Not Found" />
      <main className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-4xl text-slate-300">
          📍
        </div>
        <h1 className="mt-8 text-3xl font-black tracking-tight sm:text-5xl">Lost in Space?</h1>
        <p className="mt-4 max-w-md text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          The artisanal product or page you are looking for has been moved or does not exist.
        </p>
        
        <div className="mt-12">
          <Link
            href="/"
            className="rounded-full bg-slate-900 px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-2xl shadow-slate-900/20"
          >
            Explore Catalog
          </Link>
        </div>
      </main>
    </div>
  );
}
