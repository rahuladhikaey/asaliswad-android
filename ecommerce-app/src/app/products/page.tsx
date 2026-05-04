"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Product, Category } from "@/lib/types";
import { LoadingCard } from "@/components/LoadingCard";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";
import { Header } from "@/components/Header";
import { WishlistButton } from "@/components/WishlistButton";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
        supabase.from("products").select("*").order("id", { ascending: false }),
        supabase.from("categories").select("*").order("name", { ascending: true }),
      ]);
      setProducts((productsData ?? []) as Product[]);
      setCategories((categoriesData ?? []) as Category[]);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20">
      <Header title="Browse Catalog" subtitle="Artisanal Quality" />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Search & Filter Top Bar */}
        <div className="mb-12 rounded-[2.5rem] bg-slate-50 p-8 md:p-12 border border-slate-100">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">The Collection</span>
              <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl tracking-tight">Premium Selection</h1>
              <p className="mt-2 text-sm font-bold text-slate-400">Discover the finest ingredients for your kitchen.</p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full lg:max-w-md">
              <div className="relative flex-1 group">
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search our catalog..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5"
                />
              </div>
            </div>
          </div>

          {/* Segmented Category Selection Bar */}
          <div className="mt-10">
            <div className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === null 
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105" 
                    : "bg-white text-slate-500 hover:text-slate-900 border border-slate-200"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105" 
                      : "bg-white text-slate-500 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => <LoadingCard key={index} />)
            : filtered.map((product) => (
                <article key={product.id} className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 hover:border-emerald-100 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                  {/* Image Holder */}
                  <Link href={`/products/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-slate-50/50 p-6">
                    <img
                      src={product.images?.[0] || product.image_url}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <WishlistButton product={product} />
                    </div>
                    <div className="absolute top-4 left-4 rounded-full glass-effect px-3 py-1 text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                      Authentic
                    </div>
                  </Link>
                  
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-6">
                       <h3 className="line-clamp-2 text-sm font-black leading-tight text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                       </h3>
                    </div>
                    
                    <div className="mt-auto space-y-5">
                       <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-col">
                             <span className="text-xl font-black text-slate-900 tracking-tight">₹{product.price}</span>
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">In Stock</span>
                          </div>
                          <AddToCartButton product={product} />
                       </div>

                       <div className="pt-2">
                         <BuyNowButton product={product} />
                       </div>
                    </div>
                  </div>
                </article>
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="mt-32 text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
             <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl premium-shadow">🔍</div>
             <h3 className="mt-6 text-2xl font-black text-slate-900">No products found</h3>
             <p className="mt-2 text-sm font-bold text-slate-400">Try adjusting your search or category filters.</p>
             <button onClick={() => { setSearch(""); setSelectedCategory(null); }} className="mt-8 font-black text-emerald-600 uppercase tracking-widest text-[10px] hover:underline">Clear all filters</button>
          </div>
        )}
      </section>
    </main>
  );
}

