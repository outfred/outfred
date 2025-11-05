import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { to, subject, htmlBody } = body

    if (!to || !subject || !htmlBody) {
      return NextResponse.json({ error: "Missing required fields: to, subject, htmlBody" }, { status: 400 })
    }

    console.log("[v0] 📧 Email send request received")
    console.log("[v0] To:", to)
    console.log("[v0] Subject:", subject)

    // Get SMTP settings from database
    const { data: smtpSettings, error: smtpError } = await supabase
      .from("smtp_settings")
      .select("*")
      .eq("is_enabled", true)
      .single()

    if (smtpError || !smtpSettings) {
      console.log("[v0] ❌ SMTP not configured or not enabled")
      return NextResponse.json({ success: false, error: "SMTP is not configured or enabled" }, { status: 400 })
    }

    console.log("[v0] ✅ SMTP settings found:", {
      host: smtpSettings.host,
      port: smtpSettings.port,
      from: smtpSettings.from_email,
    })

    // Import nodemailer dynamically
    const nodemailer = await import("nodemailer")

    // Create transporter
    const transporter = nodemailer.default.createTransport({
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.encryption === "ssl", // true for 465, false for other ports
      auth: {
        user: smtpSettings.username,
        pass: smtpSettings.password,
      },
    })

    // Send email
    const info = await transporter.sendMail({
      from: `"${smtpSettings.from_name || "Outfred"}" <${smtpSettings.from_email}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    })

    console.log("[v0] ✅ Email sent successfully:", info.messageId)

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    })
  } catch (error: any) {
    console.error("[v0] ❌ Email send error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send email",
      },
      { status: 500 },
    )
  }
}
