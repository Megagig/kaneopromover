import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/moving-services" },
  { label: "Locations", href: "/locations/airdrie" },
  { label: "Contact", href: "/contact" },
  { label: "Get Free Quote", href: "/quote" },
];

const services = [
  "Residential Moving",
  "Commercial Moving",
  "Packing and Unpacking",
  "Loading or Unloading",
  "Heavy Item Moving",
  "Furniture Moving",
  "Local Movers",
  "Long Distance Moving",
];

const locations = [
  { label: "Airdrie", href: "/locations/airdrie" },
  { label: "Calgary", href: "/locations/calgary" },
  { label: "Cochrane", href: "/locations/cochrane" },
  { label: "Chestermere", href: "/locations/chestermere" },
  { label: "Okotoks", href: "/locations/okotoks" },
  { label: "Crossfield", href: "/locations/crossfield" },
  { label: "Carstairs", href: "/locations/carstairs" },
  { label: "Olds", href: "/locations/olds" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Kaneo Pro Movers Home">
              <Image
                src="/images/logo-dark.png"
                alt="Kaneo Pro Movers"
                width={120}
                height={35}
                className="h-9 w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Kaneo Pro Movers offers professional local moving services in
              Airdrie, Calgary, and surrounding Alberta communities.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="tel:+15873785954"
                className="flex items-center gap-2 text-sm text-primary transition hover:opacity-80"
                aria-label="Call Kaneo Pro Movers"
              >
                <Phone className="h-4 w-4" />
                +1(587)-378-5954
              </a>
              <a
                href="mailto:info@kaneopromovers.com"
                className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-primary"
                aria-label="Email Kaneo Pro Movers"
              >
                <Mail className="h-4 w-4" />
                info@kaneopromovers.com
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="rounded-md bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-primary"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-md bg-gray-800 p-2 text-gray-400 transition hover:bg-gray-700 hover:text-primary"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="font-semibold text-white">Our Services</h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/moving-services"
                    className="text-sm text-gray-400 transition hover:text-primary"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Locations */}
          <div>
            <h3 className="font-semibold text-white">Areas We Serve</h3>
            <ul className="mt-4 space-y-2">
              {locations.map((loc) => (
                <li key={loc.label}>
                  <Link
                    href={loc.href}
                    className="text-sm text-gray-400 transition hover:text-primary"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                1060 Channelside DR, SW, Airdrie, AB, Canada
              </div>
              <a
                href="tel:+15873785954"
                className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +1(587)-378-5954
              </a>
              <a
                href="mailto:info@kaneopromovers.com"
                className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                info@kaneopromovers.com
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                Mon–Fri 8am–6pm, Sat 8am–4pm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © 2025 Kaneo Pro Movers. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Serving Airdrie, Calgary &amp; surrounding Alberta communities</span>
            <Link
              href="/admin/login"
              className="text-gray-600 transition hover:text-gray-400"
              aria-label="Admin login"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
