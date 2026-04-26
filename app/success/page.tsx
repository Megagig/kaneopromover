import { Metadata } from "next";
import SuccessContent from "@/components/sections/SuccessContent";

export const metadata: Metadata = {
  title: "Thank You | Kaneo Pro Movers",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return <SuccessContent />;
}
