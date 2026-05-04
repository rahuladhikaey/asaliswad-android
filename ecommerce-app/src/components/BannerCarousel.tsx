"use client";

import { useState, useEffect } from "react";

const banners = [
  { id: 1, src: "/Home.png", alt: "Cooked Vegetables With Asali Swad" },
  { id: 2, src: "/Untitled-1 (2).png", alt: "Welcome to our Asali Swad About" },
  { id: 3, src: "/Untitled-1.png", alt: "Welcome Our Asali Swad Products" },
];

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-200/50 group">
      {/* Banner Container with fixed heights for different devices */}
      <div className="relative h-[220px] w-full sm:h-[320px] md:h-[450px] lg:h-[550px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="h-full w-full object-contain object-center"
            />
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Modern Progress Line Navigation */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 px-4 w-full max-w-[200px]">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group/dot relative h-1 flex-1 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm transition-all"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`absolute inset-0 bg-white transition-all duration-[4500ms] ease-linear ${index === currentIndex ? "w-full" : "w-0"}`}
              style={{ transitionDuration: index === currentIndex ? '4500ms' : '0ms' }}
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows (Visible on Hover/Desktop) */}
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 transition-all hover:bg-white/40 group-hover:opacity-100 hidden md:flex"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % banners.length)}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 transition-all hover:bg-white/40 group-hover:opacity-100 hidden md:flex"
      >
        →
      </button>
    </div>
  );
}

