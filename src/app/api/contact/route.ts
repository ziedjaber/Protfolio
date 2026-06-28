import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // If key is not configured, fallback to log and respond with success (helpful for local review/deploy previews)
    if (!apiKey || apiKey === "re_123456789") {
      console.warn("Resend API key is missing. Simulation mode activated.");
      console.log("Mock Email Received:", {
        to: "mohamedziedjabeur@gmail.com",
        from: "Portfolio Form <onboarding@resend.dev>",
        replyTo: email,
        subject: `Portfolio: ${subject}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });

      return NextResponse.json({
        success: true,
        message: "Email simulated successfully (missing API key).",
      });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Form <onboarding@resend.dev>",
      to: "mohamedziedjabeur@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #D4AF37; padding-bottom: 10px; color: #0A0A0A;">New Portfolio Contact</h2>
          <p style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</p>
          <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
          <p style="margin-bottom: 8px;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin-top: 20px; font-weight: bold;">Message:</p>
          <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; border-radius: 4px; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const err = error as Error;
    console.error("Contact API internal error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
