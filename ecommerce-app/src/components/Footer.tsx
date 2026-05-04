import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white text-slate-900 pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 transition-transform hover:scale-105">
              <span className="relative h-14 w-14 overflow-hidden rounded-[1.25rem] bg-white border border-slate-100 shadow-md">
                <Image src="/logo.png" alt="Asali Swad logo" fill className="object-cover" />
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900">Asali Swad</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Pure & Authentic</span>
              </div>
            </Link>
            <p className="mt-8 max-w-sm text-sm font-medium leading-relaxed text-slate-400">
              Defining the future of artisanal Indian groceries through uncompromising quality, stringent purity, and exceptional service delivered directly to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Artisanal Selection", "Rapid Logistics", "Pure Sourcing"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Columns (Widened for balance) */}
          <div className="hidden lg:block lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Curations</h3>
            <ul className="mt-8 space-y-5 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><Link href="/" className="transition hover:text-slate-900">Home</Link></li>
              <li><Link href="/products" className="transition hover:text-slate-900">The Catalog</Link></li>
              <li><Link href="/cart" className="transition hover:text-slate-900">Your Basket</Link></li>
              <li><Link href="/assistant" className="transition hover:text-slate-900">AI Concierge</Link></li>
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Company</h3>
            <ul className="mt-8 space-y-5 text-xs font-black uppercase tracking-widest text-slate-500">
              <li><Link href="/about" className="transition hover:text-slate-900">Our Story</Link></li>
              <li><Link href="/contact" className="transition hover:text-slate-900">Concierge</Link></li>
              <li><Link href="/privacy-policy" className="transition hover:text-slate-900">Privacy</Link></li>
              <li><Link href="/admin" className="transition hover:text-slate-900">Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Support Column (Instead of newsletter) */}
          <div className="lg:col-span-2 flex flex-col justify-end">
             <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Support</span>
                <span className="text-xs font-black text-slate-900">Help Center</span>
             </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-100 pt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Asali Swad. All rights reserved.</p>
          <div className="mt-6 flex flex-wrap gap-8 sm:mt-0">
            <Link href="mailto:connect.asaliswad2026@gmail.com" className="transition hover:text-slate-900">connect.asaliswad2026@gmail.com</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
