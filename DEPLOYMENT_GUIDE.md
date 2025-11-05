# 🚀 دليل نشر Outfred على Vercel

## الخطوات السريعة

### 1️⃣ تجهيز Supabase

#### إنشاء مشروع Supabase:
1. اذهب إلى [https://supabase.com](https://supabase.com)
2. اضغط على "New Project"
3. اختر اسم للمشروع وكلمة مرور قوية للـ Database
4. اختار المنطقة الأقرب لك (مثال: `eu-west-1` لأوروبا)

#### نشر Edge Function:
\`\`\`bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# ربط المشروع
supabase link --project-ref your-project-ref

# نشر الـ Edge Function
supabase functions deploy server
\`\`\`

#### الحصول على المفاتيح:
1. اذهب إلى Project Settings → API
2. انسخ `Project URL` و `anon public key`

---

### 2️⃣ نشر على Vercel

#### الطريقة الأولى: من GitHub (موصى بها)

1. **رفع المشروع على GitHub:**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/outfred.git
git push -u origin main
\`\`\`

2. **ربط مع Vercel:**
   - اذهب إلى [https://vercel.com](https://vercel.com)
   - اضغط "New Project"
   - اختر الـ Repository من GitHub
   - اضغط "Import"

3. **تكوين متغيرات البيئة:**
   في صفحة الإعدادات، أضف:
   \`\`\`
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SUPABASE_SERVER_URL=https://your-project.supabase.co/functions/v1/server
   \`\`\`

4. **اضغط "Deploy"** 🎉

#### الطريقة الثانية: Vercel CLI

\`\`\`bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# أو النشر للإنتاج مباشرة
vercel --prod
\`\`\`

---

### 3️⃣ إضافة متغيرات البيئة

في لوحة Vercel:
1. اذهب إلى Project Settings → Environment Variables
2. أضف المتغيرات:

\`\`\`env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVER_URL=https://xxxxxxxx.supabase.co/functions/v1/server
\`\`\`

3. اضغط "Save"
4. أعد النشر (Redeploy)

---

### 4️⃣ تكوين Domain (اختياري)

1. في Vercel → Project Settings → Domains
2. أضف نطاقك الخاص
3. اتبع التعليمات لتحديث DNS

---

## 🔧 إعدادات إضافية

### تفعيل CORS في Supabase Edge Functions

تأكد من أن الـ CORS مفعل في `/supabase/functions/server/index.tsx`:

\`\`\`typescript
app.use(
  "/*",
  cors({
    origin: "*", // أو حدد نطاقك: "https://your-domain.vercel.app"
    allowHeaders: ["Content-Type", "Authorization", "X-Access-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
\`\`\`

### تحديث رابط الـ API

بعد النشر، حدث الرابط في `utils/api.ts` إذا لزم الأمر:

\`\`\`typescript
const SUPABASE_SERVER_URL = import.meta.env.VITE_SUPABASE_SERVER_URL || 
  'https://your-project.supabase.co/functions/v1/server';
\`\`\`

---

## 🐛 حل المشاكل

### المشكلة: "Failed to load resource: 404"
**الحل:** تأكد من نشر Edge Function على Supabase:
\`\`\`bash
supabase functions deploy server
\`\`\`

### المشكلة: "CORS Error"
**الحل:** تأكد من إضافة نطاق Vercel في إعدادات CORS

### المشكلة: "Build failed"
**الحل:** تأكد من:
- وجود جميع dependencies في `package.json`
- صحة `vite.config.ts`
- عدم وجود أخطاء TypeScript

### المشكلة: "Environment variables not found"
**الحل:** 
1. أضف المتغيرات في Vercel Dashboard
2. أعد النشر (Redeploy)

---

## 📊 الأوامر المفيدة

\`\`\`bash
# التطوير المحلي
npm install
npm run dev

# البناء والاختبار
npm run build
npm run preview

# النشر على Vercel
npm run deploy

# تحديث Edge Function
supabase functions deploy server
\`\`\`

---

## 🎯 Checklist قبل النشر

- [ ] تم رفع المشروع على GitHub
- [ ] تم إنشاء مشروع Supabase
- [ ] تم نشر Edge Function
- [ ] تم إضافة متغيرات البيئة في Vercel
- [ ] تم اختبار المشروع محلياً (`npm run build && npm run preview`)
- [ ] تم تحديث الروابط في الكود إذا لزم الأمر

---

## 🌐 روابط مفيدة

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من الـ Logs في Vercel Dashboard
2. تحقق من الـ Logs في Supabase Dashboard → Edge Functions
3. تأكد من صحة متغيرات البيئة
4. تأكد من نشر Edge Function بنجاح

---

**ملاحظة مهمة:** 
- تأكد من عدم رفع ملف `.env` على GitHub
- استخدم `.env.example` كمرجع فقط
- جميع الأسرار يجب أن تكون في Vercel Environment Variables

🎉 **مبروك! مشروعك الآن جاهز للنشر**
