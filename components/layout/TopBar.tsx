import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="hidden bg-gray-900 dark:bg-black md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Left Side */}
        <div className="flex items-center gap-3 text-sm">
          <a
            href="tel:+15873785954"
            className="flex items-center gap-1.5 text-primary transition hover:opacity-80"
            aria-label="Call Kaneo Pro Movers"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+1(587)-378-5954</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="mailto:info@kaneopromovers.com"
            className="flex items-center gap-1.5 text-gray-300 transition hover:opacity-80"
            aria-label="Email Kaneo Pro Movers"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>info@kaneopromovers.com</span>
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 text-sm">
          <Image
            src="/images/flag-canada.png"
            alt="Canadian flag"
            width={20}
            height={15}
            style={{ width: "20px", height: "auto" }}
          />
          <span className="text-white">Canada</span>
          <span className="text-primary">Serving Alberta</span>
        </div>
      </div>
    </div>
  );
}
