import Link from "next/link";
import { Header } from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 pb-20">
      <Header title="Our Legacy" subtitle="The Asali Swad Story" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-20">
          
          {/* Hero Story Section */}
          <section className="overflow-hidden rounded-[3rem] bg-slate-50 p-8 md:p-16 border border-slate-100">
            <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
                  EST. 2026
                </span>
                <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl leading-tight">
                  Defining the standard for <span className="text-gradient">Artisanal Spices</span> and Grocery.
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg font-medium">
                  Asali Swad was founded on a singular principle: to bridge the gap between traditional Indian culinary heritage and modern convenience. We curate only the finest ingredients, ensuring that every product delivered to your doorstep meets our rigorous standards of purity and flavor.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-8 premium-shadow">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">The Mission</p>
                    <p className="mt-4 text-sm font-bold leading-relaxed text-slate-700">To elevate daily dining through uncompromising quality and seamless accessibility.</p>
                  </div>
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-8 premium-shadow">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">The Vision</p>
                    <p className="mt-4 text-sm font-bold leading-relaxed text-slate-700">To become the trusted global ambassador of authentic Indian flavors and household essentials.</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl shadow-slate-900/20 sm:p-12 relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Why Asali Swad</span>
                <h2 className="mt-6 text-3xl font-black leading-tight">A Modern Philosophy.</h2>
                <ul className="mt-10 space-y-6">
                  {[
                    "Ethical Sourcing & Fair Trade",
                    "Stringent Purity Protocols",
                    "Hyper-Local Rapid Logistics",
                    "Concierge Customer Support"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-sm font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Purity First",
                description: "Our laboratory-tested products ensure that you receive nothing but the most authentic flavors of India.",
              },
              {
                title: "Transparent Sourcing",
                description: "We maintain direct relationships with our farmers, ensuring full traceability from soil to shelf.",
              },
              {
                title: "Excellence in Service",
                description: "Our logistics network is optimized for speed, ensuring your kitchen is always stocked with freshness.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[2.5rem] border border-slate-100 bg-white p-10 premium-shadow transition hover:-translate-y-2">
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="mt-6 text-sm leading-relaxed text-slate-500 font-medium">{item.description}</p>
              </article>
            ))}
          </section>

          {/* Statistics Section */}
          <section className="rounded-[3rem] bg-slate-900 p-12 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/logo.png')] bg-repeat bg-[length:100px_100px]"></div>
             <div className="relative z-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "99.8%", label: "Purity Rating" },
                  { value: "15 min", label: "Fastest Delivery" },
                  { value: "500+", label: "Premium Products" },
                  { value: "24/7", label: "Direct Support" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <p className="text-4xl font-black text-gradient">{stat.value}</p>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}

