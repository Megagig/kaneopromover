import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/db/prisma";
import { sendContactNotification } from "@/lib/email/resend";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        read: false,
      },
    });

    await sendContactNotification(data).catch((err) =>
      console.error("Contact email error:", err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
