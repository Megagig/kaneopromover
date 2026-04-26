import LeadsTable from "@/components/admin/LeadsTable";
import { prisma } from "@/lib/db/prisma";

interface PageProps {
  searchParams: Promise<{ status?: string; city?: string; page?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status;
  const city = params.city;
  const page = parseInt(params.page || "1");
  const limit = 20;

  const where = {
    ...(status && status !== "ALL" && { status: status as "PENDING" | "REVIEWED" | "QUOTED" | "BOOKED" | "COMPLETED" | "CANCELLED" }),
    ...(city && { fromCity: { contains: city, mode: "insensitive" as const } }),
  };

  const [quotes, total] = await Promise.all([
    prisma.quote.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.quote.count({ where }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Leads &amp; Quotes</h1>
      <p className="mt-1 text-sm text-gray-500">{total} total quotes</p>
      <div className="mt-6">
        <LeadsTable
          quotes={JSON.parse(JSON.stringify(quotes))}
          total={total}
          currentPage={page}
          limit={limit}
          currentStatus={status || "ALL"}
          currentCity={city || ""}
        />
      </div>
    </div>
  );
}
