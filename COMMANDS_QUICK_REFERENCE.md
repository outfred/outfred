# ⚡ الأوامر السريعة - نسخ والصق مباشرة

<div dir="rtl">

## 🔥 كل الأوامر المطلوبة بالترتيب

### 1. تجهيز المشروع
\`\`\`bash
# الوقوف في مجلد المشروع
cd path/to/outfred

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة
cp .env.example .env
\`\`\`

---

### 2. رفع على GitHub
\`\`\`bash
# إنشاء Git repository
git init

# إضافة جميع الملفات
git add .

# عمل Commit
git commit -m "🚀 Initial commit - Outfred platform"

# تسمية البرانش
git branch -M main

# ربط مع GitHub (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/outfred.git

# رفع الملفات
git push -u origin main
\`\`\`

**ملحوظة:** لو أول مرة تستخدم Git:
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

---

### 3. Supabase Edge Function
\`\`\`bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# ربط المشروع (استبدل YOUR_PROJECT_REF)
supabase link --project-ref YOUR_PROJECT_REF

# نشر Edge Function
supabase functions deploy server
\`\`\`

**طريقة الحصول على PROJECT_REF:**
- Supabase Dashboard → Settings → General → Reference ID

---

### 4. Vercel CLI (اختياري)
\`\`\`bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إضافة Environment Variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_SERVER_URL

# نشر للإنتاج
vercel --prod
\`\`\`

---

## 📝 القيم المطلوبة للـ Environment Variables

\`\`\`env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVER_URL=https://YOUR_PROJECT.supabase.co/functions/v1/server
\`\`\`

**طريقة الحصول عليها:**
- Supabase Dashboard → Settings → API
- Project URL = `VITE_SUPABASE_URL`
- anon public = `VITE_SUPABASE_ANON_KEY`
- Server URL = Project URL + `/functions/v1/server`

---

## 🔄 التحديثات المستقبلية

\`\`\`bash
# بعد أي تعديل:
git add .
git commit -m "وصف التحديث"
git push
\`\`\`

Vercel هايعمل Deploy تلقائي!

---

## 🧪 اختبار محلي

\`\`\`bash
# تشغيل المشروع
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
\`\`\`

---

## 🔍 فحص التثبيتات

\`\`\`bash
# فحص Node.js
node --version

# فحص npm
npm --version

# فحص Git
git --version

# فحص Supabase CLI
supabase --version

# فحص Vercel CLI
vercel --version
\`\`\`

---

## 🆘 أوامر حل المشاكل

\`\`\`bash
# مسح node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install

# فحص Edge Function Logs
supabase functions logs server

# فحص حالة Vercel
vercel ls

# سحب متغيرات البيئة من Vercel
vercel env pull .env.local
\`\`\`

---

## 📋 سير العمل الكامل (Copy-Paste)

\`\`\`bash
# === الخطوة 1: تجهيز ===
cd path/to/outfred
npm install
cp .env.example .env
# (عدل ملف .env يدوياً)

# === الخطوة 2: GitHub ===
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/outfred.git
git push -u origin main

# === الخطوة 3: Supabase ===
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy server

# === الخطوة 4: Vercel (من الموقع أسهل) ===
# اذهب إلى vercel.com واربط الـ GitHub repo
# أو استخدم CLI:
npm install -g vercel
vercel login
vercel
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_SERVER_URL
vercel --prod

# === تم! 🎉 ===
\`\`\`

---

## 🎯 روابط سريعة

- GitHub: [github.com/new](https://github.com/new)
- Supabase: [app.supabase.com](https://app.supabase.com)
- Vercel: [vercel.com/new](https://vercel.com/new)

---

## 💡 نصيحة

**احفظ الملف ده على سطح المكتب** واستخدمه كمرجع سريع!

</div>
