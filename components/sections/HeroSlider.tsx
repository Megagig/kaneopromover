"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].bg}
            alt={slides[current].headline}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Kaneo Pro Movers
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                {slides[current].headline}
              </h1>
              <p className="mt-4 text-xl text-gray-200 md:text-2xl">
                {slides[current].subheadline}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:kaneopromovers@gmail.com"
                  className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Send A Direct Email
                </a>
                <a
                  href="tel:+15873785954"
                  className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Call +1(587)-378-5954
                </a>
                <Link
                  href="/quote"
                  className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-black transition hover:bg-primary-hover"
                >
                  GET FREE A QUOTE
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
            onClick={() => goTo(i)}
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
