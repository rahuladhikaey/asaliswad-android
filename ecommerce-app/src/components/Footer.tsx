import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-900 text-white pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 transition-transform hover:scale-105">
              <span className="relative h-14 w-14 overflow-hidden rounded-[1.25rem]">
                <Image src="/logo.png" alt="Asali Swad logo" fill className="object-contain" />
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">Asali Swad</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Pure & Authentic</span>
              </div>
            </Link>
            <p className="mt-8 max-w-sm text-sm font-medium leading-relaxed text-slate-300">
              Defining the future of artisanal Indian groceries through uncompromising quality, stringent purity, and exceptional service delivered directly to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Artisanal Selection", "Rapid Logistics", "Pure Sourcing"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-800 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300 border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Columns (Widened for balance) */}
          <div className="hidden lg:block lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Curations</h3>
            <ul className="mt-8 space-y-5 text-xs font-black uppercase tracking-widest text-slate-300">
              <li><Link href="/" className="transition hover:text-emerald-400">Home</Link></li>
              <li><Link href="/products" className="transition hover:text-emerald-400">The Catalog</Link></li>
              <li><Link href="/cart" className="transition hover:text-emerald-400">Your Basket</Link></li>
              <li><Link href="/assistant" className="transition hover:text-emerald-400">AI Concierge</Link></li>
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Company</h3>
            <ul className="mt-8 space-y-5 text-xs font-black uppercase tracking-widest text-slate-300">
              <li><Link href="/about" className="transition hover:text-emerald-400">Our Story</Link></li>
              <li><Link href="/contact" className="transition hover:text-emerald-400">Concierge</Link></li>
              <li><Link href="/privacy-policy" className="transition hover:text-emerald-400">Privacy</Link></li>
              <li><Link href="/admin" className="transition hover:text-emerald-400">Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Support Column (Instead of newsletter) */}
          <div className="lg:col-span-2 flex flex-col justify-end">
             <div className="p-8 rounded-[2rem] bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Support</span>
               <span className="text-xs font-black text-white">Help Center</span>
             </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-700 pt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Asali Swad. All rights reserved.</p>
          <div className="mt-6 flex flex-wrap gap-8 sm:mt-0">
            <Link href="mailto:connect.asaliswad2026@gmail.com" className="transition hover:text-emerald-400">connect.asaliswad2026@gmail.com</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
