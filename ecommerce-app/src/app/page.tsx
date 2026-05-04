import Link from "next/link";
import { MobileSearch } from "@/components/MobileSearch";
export const dynamic = 'force-dynamic';
import { supabaseServer } from "@/lib/supabaseServer";
import { Product, Category } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Header } from "@/components/Header";

const fetchHomeData = async () => {
  const { data: categories } = await supabaseServer
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const { data: products } = await supabaseServer
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .limit(8);

  return {
    categories: (categories ?? []) as Category[],
    products: (products ?? []) as Product[],
  };
};

export default async function HomePage() {
  const { categories, products } = await fetchHomeData();

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden pb-20">
      <Header title="Asali Swad" subtitle="Premium Grocery & Spices 📍" />

      {/* Hero Section Container */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Story-like Banner Carousel */}
        <div className="pt-4">
          <div className="rounded-[2.5rem] overflow-hidden premium-shadow">
            <BannerCarousel />
          </div>
        </div>

        {/* Mobile Search - Focused Experience */}
        <div className="mt-8">
          <MobileSearch />
        </div>

        {/* Categories Section - Clean Pills */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Curated Categories</h2>
            <Link href="/products" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All</Link>
          </div>
          <div className="no-scrollbar flex w-full gap-5 overflow-x-auto pb-6 snap-x">
            {categories.map((category) => (
              <Link 
                href={`/products?category=${category.id}`}
                key={category.id} 
                className="flex flex-col items-center gap-3 group min-w-[80px] sm:min-w-[100px] snap-start"
              >
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full bg-slate-50 transition-all group-hover:bg-emerald-50 group-hover:scale-105 premium-shadow border border-slate-100">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600/20 group-hover:text-emerald-600 transition-colors">
                    {category.name.substring(0, 1).toUpperCase()}
                  </span>
                </div>
                <span className="w-full text-center text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Today&apos;s Selection</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Handpicked Premium Quality</p>
            </div>
            <Link href="/products" className="rounded-2xl bg-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
              Explore
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 hover:border-emerald-100 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Image Holder */}
                <Link href={`/products/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-slate-50/50 p-4">
                  <img
                    src={product.images?.[0] || product.image_url}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                  />
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 rounded-full glass-effect px-3 py-1 text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                    Pure
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <Link href={`/products/${product.id}`} className="mb-4">
                    <h3 className="line-clamp-2 text-sm font-black leading-tight text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-300 line-through tracking-tight">₹{Math.round(product.price * 1.2)}</span>
                        <span className="text-lg font-black text-slate-900 tracking-tight">₹{product.price}</span>
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                    <BuyNowButton product={product} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 flex justify-center">
            <Link 
              href="/products" 
              className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-slate-900 px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-emerald-600 hover:px-14 active:scale-95 shadow-2xl shadow-slate-900/20"
            >
              <span>Explore Collection</span>
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
