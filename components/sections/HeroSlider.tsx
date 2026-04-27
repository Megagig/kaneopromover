"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    headline: "KANEO PRO MOVERS",
    subheadline: "Movers With Confidence",
    bg: "/images/hero-1.jpg",
  },
  {
    headline: "We Are Reliable and Efficient",
    subheadline: "Moving Company",
    bg: "/images/hero-2.jpg",
  },
  {
    headline: "Professional Movers and Fair Price",
    subheadline: "Your 1st Choice",
    bg: "/images/hero-3.jpg",
  },
  {
    headline: "Safe and Secure Moving",
    subheadline: "Your Belongings Are in Good Hands",
    bg: "/images/slider/4444.jpg",
  },
  {
    headline: "Serving Airdrie, Calgary & Alberta",
    subheadline: "Local Movers You Can Trust",
    bg: "/images/slider/4.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* All images stay mounted — crossfade via opacity */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.bg}
            alt={slide.headline}
            fill
            className="object-cover"
            priority={i < 2}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Text content — crossfade independently */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute text-center transition-all duration-500",
              i === current
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Kaneo Pro Movers
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {slide.headline}
            </h2>
            <p className="mt-4 text-xl text-gray-200 md:text-2xl">
              {slide.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:kaneopromovers@gmail.com"
                className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                tabIndex={i === current ? 0 : -1}
              >
                Send A Direct Email
              </a>
              <a
                href="tel:+15873785954"
                className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                tabIndex={i === current ? 0 : -1}
              >
                Call +1(587)-378-5954
              </a>
              <Link
                href="/quote"
                className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-black transition hover:bg-primary-hover"
                tabIndex={i === current ? 0 : -1}
              >
                GET FREE A QUOTE
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-3 w-3 rounded-full transition",
              i === current ? "bg-primary" : "bg-white/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
