"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User, Search, Heart } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/products", icon: ShoppingBag },
    { name: "Search", href: "/products?focus=true", icon: Search },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const isProductPage = pathname?.startsWith("/products/") && pathname.split("/").length > 2;

  if (isProductPage) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      <div className="glass-effect mx-4 mb-4 rounded-[2rem] px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1.5 transition-all active:scale-90"
              >
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                    : "text-slate-400"
                }`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
