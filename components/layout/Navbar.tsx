"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const servicesDropdown: DropdownItem[] = [
  { label: "All Services", href: "/moving-services" },
  { label: "Local Movers", href: "/moving-services" },
  { label: "Long Distance Moving", href: "/moving-services" },
  { label: "Residential Moving", href: "/moving-services" },
  { label: "Commercial Moving", href: "/moving-services" },
  { label: "Packing and Unpacking", href: "/moving-services" },
  { label: "Loading or Unloading", href: "/moving-services" },
  { label: "Heavy Item Moving", href: "/moving-services" },
  { label: "Furniture Moving", href: "/moving-services" },
];

const locationsDropdown: DropdownItem[] = [
  { label: "Airdrie", href: "/locations/airdrie" },
  { label: "Calgary", href: "/locations/calgary" },
  { label: "Cochrane", href: "/locations/cochrane" },
  { label: "Chestermere", href: "/locations/chestermere" },
  { label: "Okotoks", href: "/locations/okotoks" },
  { label: "Crossfield", href: "/locations/crossfield" },
  { label: "Carstairs", href: "/locations/carstairs" },
  { label: "Olds", href: "/locations/olds" },
];

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/moving-services", dropdown: servicesDropdown },
  { label: "Locations", href: "/locations/airdrie", dropdown: locationsDropdown },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [pathname]);

  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const logoSrc = mounted && resolvedTheme === "dark"
    ? "/images/logo-dark.png"
    : "/images/logo-light.jpg";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="Kaneo Pro Movers Home">
          <Image
            src={logoSrc}
            alt="Kaneo Pro Movers"
            width={120}
            height={36}
            className="h-8 w-auto max-w-[100px] rounded-sm object-contain sm:h-9 sm:max-w-[120px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
              onMouseLeave={() => link.dropdown && handleDropdownLeave()}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium transition",
                  isActive(link.href)
                    ? "border-b-2 border-primary text-primary"
                    : "text-text-primary hover:text-primary"
                )}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      activeDropdown === link.label && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-border bg-background shadow-xl"
                  >
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-text-primary transition hover:bg-surface hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/quote"
            className="hidden rounded-md bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:bg-primary-hover sm:inline-block"
          >
            Free Quote
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-md p-2 text-text-primary transition hover:bg-surface lg:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileAccordion(
                            mobileAccordion === link.label ? null : link.label
                          )
                        }
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-text-primary transition hover:bg-surface"
                        aria-expanded={mobileAccordion === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            mobileAccordion === link.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileAccordion === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 space-y-1 border-l border-border pl-3">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-sm text-text-secondary transition hover:bg-surface hover:text-primary"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-surface",
                        isActive(link.href)
                          ? "text-primary"
                          : "text-text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/quote"
                className="mt-4 block w-full rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-primary-hover"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
