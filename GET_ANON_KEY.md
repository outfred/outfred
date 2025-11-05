# 🔑 كيفية الحصول على ANON KEY من Supabase

<div dir="rtl">

## خطوات بسيطة:

### 1️⃣ افتح Supabase Dashboard
اذهب إلى: [https://supabase.com/dashboard](https://supabase.com/dashboard)

### 2️⃣ افتح مشروعك
- اسم المشروع: **ozppgslrxgcujmzthxzh**
- اضغط عليه من قائمة المشاريع

### 3️⃣ اذهب إلى Settings → API
\`\`\`
⚙️ Settings (أيقونة الترس في الشريط الجانبي)
  └─ API (في القائمة الجانبية)
\`\`\`

### 4️⃣ انسخ "anon public" key
ستجد قسم اسمه **"Project API keys"**

في هذا القسم:
- **anon public** ← هذا هو المطلوب! 
- **service_role** ← لا تستخدم هذا (خطير!)

### 5️⃣ الصق المفتاح في ملف .env
افتح ملف `.env` واستبدل:
\`\`\`env
VITE_SUPABASE_ANON_KEY=GET_THIS_FROM_SUPABASE_DASHBOARD
\`\`\`

بـ:
\`\`\`env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cHBnc2xyeGdjdWptenRoeHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

---

## 📸 صورة توضيحية:

\`\`\`
┌─────────────────────────────────────────────┐
│  Supabase Dashboard                          │
├─────────────────────────────────────────────┤
│  Settings > API                              │
│                                               │
│  Project API keys                             │
│  ├─ anon public     [eyJhbG...] 📋 Copy     │ ← هنا!
│  └─ service_role    [eyJhbG...] 📋 Copy     │ ← لا!
│                                               │
│  Project URL                                  │
│  https://ozppgslrxgcujmzthxzh.supabase.co   │
└─────────────────────────────────────────────┘
\`\`\`

---

## ✅ التأكد من الإعداد الصحيح:

بعد ما تحط المفتاح في `.env`:

\`\`\`bash
# جرب المشروع محلياً
npm run dev
\`\`\`

افتح: `http://localhost:3000`

### الاختبارات:
1. ✅ جرب تسجل حساب جديد
2. ✅ جرب تسجل دخول
3. ✅ افتح صفحة المتاجر

لو كل حاجة شغالة، يبقى المفتاح صح! 🎉

---

## 🐛 لو ظهرت مشاكل:

### المشكلة: "Invalid API key"
**الحل:** تأكد إنك نسخت **anon public** مش **service_role**

### المشكلة: "Failed to fetch"
**الحل:** تأكد من نشر Edge Function:
\`\`\`bash
supabase functions deploy server
\`\`\`

### المشكلة: المفتاح طويل جداً
**الحل:** ده طبيعي! المفتاح JWT بيكون طويل (200+ حرف)

---

## 🔐 أمان:

⚠️ **مهم جداً:**
- المفتاح ده **عام (public)** - مش مشكلة لو ظهر في الكود
- لكن **متشاركش** ملف `.env` نفسه على GitHub
- استخدم `.env.example` للمشاركة العامة
- المفتاح الخطير هو **service_role** - ده لازم يفضل سري!

---

## 📝 ملف .env النهائي:

بعد ما تحط المفتاح، المفروض يبقى كده:

\`\`\`env
VITE_SUPABASE_URL=https://ozppgslrxgcujmzthxzh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cHBnc2xyeGdjdWptenRoeHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxx
VITE_SUPABASE_SERVER_URL=https://ozppgslrxgcujmzthxzh.supabase.co/functions/v1/server
\`\`\`

---

## 🎯 الخطوة التالية:

بعد ما تحط المفتاح، روح على:
- [UPLOAD_STEPS.md](./UPLOAD_STEPS.md) - للرفع على GitHub و Vercel

</div>
