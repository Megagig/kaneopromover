import PricingEditor from "@/components/admin/PricingEditor";
import { prisma } from "@/lib/db/prisma";

export default async function AdminPricingPage() {
  const pricing = await prisma.pricing.findMany({
    orderBy: { basePrice: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Pricing</h1>
      <p className="mt-1 text-sm text-gray-500">
        Edit pricing tiers. Changes affect the quote form price estimator.
      </p>
      <div className="mt-6">
        <PricingEditor tiers={JSON.parse(JSON.stringify(pricing))} />
      </div>
    </div>
  );
}
