import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  console.log("reCAPTCHA response:", JSON.stringify(data));
  return data.success && data.score > 0.5;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isValid = await verifyRecaptcha(recaptchaToken);
    if (!isValid) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL_TO?.replace(/\.$/, "") ?? "";

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <h2 style="color:#DD1D21;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
