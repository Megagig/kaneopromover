import BookingsTable from "@/components/admin/BookingsTable";
import { prisma } from "@/lib/db/prisma";

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status;
  const page = parseInt(params.page || "1");
  const limit = 20;

  const where = status && status !== "ALL"
    ? { status: status as "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" }
    : {};

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: { quote: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.booking.count({ where }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Bookings</h1>
      <p className="mt-1 text-sm text-gray-500">{total} total bookings</p>
      <div className="mt-6">
        <BookingsTable
          bookings={JSON.parse(JSON.stringify(bookings))}
          total={total}
          currentPage={page}
          limit={limit}
          currentStatus={status || "ALL"}
        />
      </div>
    </div>
  );
}
