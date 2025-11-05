// Email Templates for Notifications
// Bilingual support (Arabic/English)

interface EmailTemplate {
  subject_ar: string
  subject_en: string
  body_ar: string
  body_en: string
}

export const emailTemplates = {
  // Welcome Email
  welcome: (userName: string, language: "ar" | "en"): { subject: string; body: string } => {
    const templates: EmailTemplate = {
      subject_ar: "مرحباً بك في Outfred! 🎉",
      subject_en: "Welcome to Outfred! 🎉",
      body_ar: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: #667eea; text-align: center;">مرحباً ${userName}! 👋</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              نحن سعداء بانضمامك إلى <strong>Outfred</strong> - منصة اكتشاف الأزياء بالذكاء الاصطناعي!
            </p>
            <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">ما يمكنك فعله الآن:</h3>
              <ul style="line-height: 1.8;">
                <li>🔍 ابحث عن الأزياء باستخدام AI الذكي</li>
                <li>📸 ارفع صورة واحصل على منتجات مشابهة</li>
                <li>👔 احصل على توصيات أزياء مخصصة</li>
                <li>🛍️ تصفح محلات الماركات المحلية</li>
              </ul>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              شكراً لاختيارك Outfred ❤️
            </p>
          </div>
        </div>
      `,
      body_en: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: #667eea; text-align: center;">Welcome ${userName}! 👋</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              We're excited to have you join <strong>Outfred</strong> - the AI-powered fashion discovery platform!
            </p>
            <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">What you can do now:</h3>
              <ul style="line-height: 1.8;">
                <li>🔍 Search for fashion using smart AI</li>
                <li>📸 Upload an image and get similar products</li>
                <li>👔 Get personalized outfit recommendations</li>
                <li>🛍️ Browse local brand stores</li>
              </ul>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              Thank you for choosing Outfred ❤️
            </p>
          </div>
        </div>
      `,
    }

    return {
      subject: language === "ar" ? templates.subject_ar : templates.subject_en,
      body: language === "ar" ? templates.body_ar : templates.body_en,
    }
  },

  // Email Verification
  verification: (
    userName: string,
    verificationCode: string,
    language: "ar" | "en",
  ): { subject: string; body: string } => {
    const templates: EmailTemplate = {
      subject_ar: "تأكيد بريدك الإلكتروني - Outfred",
      subject_en: "Verify Your Email - Outfred",
      body_ar: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #667eea; text-align: center;">✉️ تأكيد البريد الإلكتروني</h1>
            <p style="font-size: 16px; color: #333;">مرحباً ${userName}،</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              شكراً للتسجيل في Outfred! لتفعيل حسابك، يرجى استخدام كود التفعيل التالي:
            </p>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <div style="background: white; padding: 15px; border-radius: 5px; display: inline-block;">
                <h2 style="color: #667eea; margin: 0; font-size: 32px; letter-spacing: 5px; font-family: monospace;">
                  ${verificationCode}
                </h2>
              </div>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              هذا الكود صالح لمدة <strong>10 دقائق</strong>
            </p>
            <p style="font-size: 13px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              إذا لم تقم بإنشاء حساب، يمكنك تجاهل هذه الرسالة.
            </p>
          </div>
        </div>
      `,
      body_en: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #667eea; text-align: center;">✉️ Email Verification</h1>
            <p style="font-size: 16px; color: #333;">Hello ${userName},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              Thank you for registering with Outfred! To activate your account, please use the following verification code:
            </p>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <div style="background: white; padding: 15px; border-radius: 5px; display: inline-block;">
                <h2 style="color: #667eea; margin: 0; font-size: 32px; letter-spacing: 5px; font-family: monospace;">
                  ${verificationCode}
                </h2>
              </div>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              This code is valid for <strong>10 minutes</strong>
            </p>
            <p style="font-size: 13px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        </div>
      `,
    }

    return {
      subject: language === "ar" ? templates.subject_ar : templates.subject_en,
      body: language === "ar" ? templates.body_ar : templates.body_en,
    }
  },

  // Password Reset
  passwordReset: (userName: string, resetCode: string, language: "ar" | "en"): { subject: string; body: string } => {
    const templates: EmailTemplate = {
      subject_ar: "إعادة تعيين كلمة المرور - Outfred",
      subject_en: "Reset Your Password - Outfred",
      body_ar: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #e74c3c; text-align: center;">🔐 إعادة تعيين كلمة المرور</h1>
            <p style="font-size: 16px; color: #333;">مرحباً ${userName}،</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. استخدم الكود التالي لإنشاء كلمة مرور جديدة:
            </p>
            <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <div style="background: white; padding: 15px; border-radius: 5px; display: inline-block;">
                <h2 style="color: #e74c3c; margin: 0; font-size: 32px; letter-spacing: 5px; font-family: monospace;">
                  ${resetCode}
                </h2>
              </div>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              هذا الكود صالح لمدة <strong>15 دقيقة</strong>
            </p>
            <div style="background: #fff3cd; border-right: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⚠️ إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة وحسابك آمن.
              </p>
            </div>
          </div>
        </div>
      `,
      body_en: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #e74c3c; text-align: center;">🔐 Password Reset</h1>
            <p style="font-size: 16px; color: #333;">Hello ${userName},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              We received a request to reset your password. Use the following code to create a new password:
            </p>
            <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <div style="background: white; padding: 15px; border-radius: 5px; display: inline-block;">
                <h2 style="color: #e74c3c; margin: 0; font-size: 32px; letter-spacing: 5px; font-family: monospace;">
                  ${resetCode}
                </h2>
              </div>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center;">
              This code is valid for <strong>15 minutes</strong>
            </p>
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="color: #856404; margin: 0; text-align: center;">
                ⚠️ If you didn't request a password reset, please ignore this email and your account will remain secure.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    return {
      subject: language === "ar" ? templates.subject_ar : templates.subject_en,
      body: language === "ar" ? templates.body_ar : templates.body_en,
    }
  },

  // Test Email
  test: (language: "ar" | "en"): { subject: string; body: string } => {
    const templates: EmailTemplate = {
      subject_ar: "✅ اختبار SMTP ناجح - Outfred",
      subject_en: "✅ SMTP Test Successful - Outfred",
      body_ar: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #27ae60; text-align: center;">✅ نجح الاختبار!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center;">
              تهانينا! إعدادات SMTP الخاصة بك تعمل بشكل صحيح.
            </p>
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #155724; margin: 0; text-align: center;">
                🎉 يمكنك الآن إرسال رسائل البريد الإلكتروني لمستخدميك!
              </p>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              تم الإرسال من Outfred Admin Panel
            </p>
          </div>
        </div>
      `,
      body_en: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #27ae60; text-align: center;">✅ Test Successful!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center;">
              Congratulations! Your SMTP settings are working correctly.
            </p>
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #155724; margin: 0; text-align: center;">
                🎉 You can now send emails to your users!
              </p>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              Sent from Outfred Admin Panel
            </p>
          </div>
        </div>
      `,
    }

    return {
      subject: language === "ar" ? templates.subject_ar : templates.subject_en,
      body: language === "ar" ? templates.body_ar : templates.body_en,
    }
  },
}

// Helper: Generate 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Helper: Send email using SMTP settings
export const sendEmail = async (
  to: string,
  subject: string,
  htmlBody: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log("[v0] 📧 Attempting to send email to:", to)

    // Send to backend API
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject,
        htmlBody,
      }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log("[v0] ✅ Email sent successfully!")
      return { success: true }
    } else {
      console.log("[v0] ❌ Email send failed:", data.error)
      return { success: false, error: data.error || "Failed to send email" }
    }
  } catch (error) {
    console.error("[v0] Failed to send email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error sending email",
    }
  }
}
