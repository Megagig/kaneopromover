export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(url: string): void {
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_TRACKING_ID, { page_path: url });
}

interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function event({ action, category, label, value }: GtagEvent): void {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
