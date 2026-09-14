import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/content";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Please email us directly or set RESEND_API_KEY.",
        mailto: true,
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL ?? "TieCodes Website <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to: [company.email],
      replyTo: email,
      subject: `Website inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error sending message." },
      { status: 500 }
    );
  }
}
