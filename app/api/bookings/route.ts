import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/getSession";
import { sendBookingConfirmationEmail } from "@/lib/email/resend";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const where = status ? { status: status as "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" } : {};

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

    return NextResponse.json({ bookings, total, page, limit });
  } catch (error) {
    console.error("Bookings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const { quoteId, scheduledAt, assignedTo, notes } = body;

    if (!quoteId || !scheduledAt) {
      return NextResponse.json({ error: "quoteId and scheduledAt required" }, { status: 400 });
    }

    const quote = await prisma.quote.findUnique({ where: { id: quoteId } });
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        quoteId,
        scheduledAt: new Date(scheduledAt),
        assignedTo: assignedTo || null,
        notes: notes || null,
        status: "CONFIRMED",
      },
    });

    await prisma.quote.update({
      where: { id: quoteId },
      data: { status: "BOOKED" },
    });

    // Send confirmation email
    await sendBookingConfirmationEmail(
      quote.email,
      quote.firstName,
      scheduledAt,
      quote.fromCity,
      quote.toCity
    ).catch((err) => console.error("Booking email error:", err));

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Bookings POST error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
