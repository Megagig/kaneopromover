import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/getSession";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, assignedTo, notes } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(assignedTo !== undefined && { assignedTo }),
        ...(notes !== undefined && { notes }),
      },
      include: { quote: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking PATCH error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

    await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    // Revert quote status
    const booking = await prisma.booking.findUnique({ where: { id }, select: { quoteId: true } });
    if (booking) {
      await prisma.quote.update({
        where: { id: booking.quoteId },
        data: { status: "QUOTED" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking DELETE error:", error);
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
  }
}
