import { Header } from "@/components/Header";
import Image from "next/image";
import qrImage from "./QR.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 pb-20">
      <Header title="Concierge" subtitle="Direct Assistance" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          
          {/* Main Hero Section */}
          <section className="overflow-hidden rounded-[3rem] bg-slate-50 p-8 md:p-16 border border-slate-100">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
                  Support & Inquiries
                </span>
                <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                  We are here to assist with your culinary journey.
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg font-medium">
                  Whether you have questions about our artisanal collection, need assistance with an order, or are interested in wholesale opportunities, our dedicated team is at your service.
                </p>
              </div>
              
              <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl shadow-slate-900/20 sm:p-12 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl"></div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Direct Channels</p>
                <div className="mt-10 space-y-10 relative z-10">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-400 transition-colors">Electronic Mail</p>
                    <a href="mailto:connect.asaliswad2026@gmail.com" className="mt-3 block text-lg font-black text-white hover:text-emerald-400 transition-all">
                      connect.asaliswad2026@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Hours</p>
                    <p className="mt-3 text-lg font-black">Mon – Sun: 09:00 — 23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social & Location Section */}
          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 premium-shadow flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Location</span>
              <h2 className="mt-4 text-2xl font-black text-slate-900">Flagship Presence</h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-500 font-medium">
                123 Market Street, Local City,<br />
                Indore, Madhya Pradesh, India
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 premium-shadow flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Social Connect</span>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Instagram</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 font-medium">Scan to explore our visual stories and daily arrivals.</p>
              </div>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 block p-4 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:scale-105 hover:bg-white hover:shadow-xl"
              >
                <Image
                  src={qrImage}
                  alt="Instagram QR"
                  width={100}
                  height={100}
                  className="rounded-xl object-contain"
                />
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

