# ⚡ نشر سريع على Vercel - 5 دقائق فقط!

<div dir="rtl">

## الخطوة 1️⃣: تجهيز Supabase (دقيقتان)

1. اذهب إلى [supabase.com](https://supabase.com) → "New Project"
2. اختر:
   - **اسم المشروع:** outfred-prod
   - **كلمة المرور:** (احفظها!)
   - **المنطقة:** EU West (أيرلندا)
3. انتظر حتى يتم إنشاء المشروع

4. **نشر Edge Function:**
\`\`\`bash
# في Terminal:
npm install -g supabase
supabase login
supabase link --project-ref xxxxx  # (استبدل xxxxx بمعرف مشروعك)
cd supabase/functions
supabase functions deploy server
\`\`\`

5. **احصل على المفاتيح:**
   - Settings → API
   - انسخ: `URL` و `anon public`

---

## الخطوة 2️⃣: رفع على GitHub (دقيقة)

\`\`\`bash
# في مجلد المشروع:
git init
git add .
git commit -m "🚀 مشروع Outfred جاهز للنشر"
git branch -M main

# أنشئ Repository جديد على GitHub ثم:
git remote add origin https://github.com/username/outfred.git
git push -u origin main
\`\`\`

---

## الخطوة 3️⃣: النشر على Vercel (دقيقتان)

### Option A: من الموقع (أسهل)

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **"New Project"**
3. اختر Repository من GitHub
4. في **Environment Variables** أضف:

\`\`\`
VITE_SUPABASE_URL
قيمتها: https://xxxxxx.supabase.co

VITE_SUPABASE_ANON_KEY
قيمتها: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

VITE_SUPABASE_SERVER_URL
قيمتها: https://xxxxxx.supabase.co/functions/v1/server
\`\`\`

5. اضغط **"Deploy"** 🎉

### Option B: من Terminal

\`\`\`bash
npm install -g vercel
vercel login
vercel

# أضف المتغيرات:
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY  
vercel env add VITE_SUPABASE_SERVER_URL

# انشر للإنتاج:
vercel --prod
\`\`\`

---

## ✅ اختبار سريع

بعد النشر، افتح الرابط وتحقق من:

1. ✅ الصفحة الرئيسية تعمل
2. ✅ يمكنك تسجيل حساب جديد
3. ✅ يمكنك تسجيل الدخول
4. ✅ صفحة المتاجر تعمل
5. ✅ مولد الأوتفتات يعمل

---

## 🐛 حل سريع للمشاكل

### المشكلة: "Failed to fetch"
\`\`\`bash
# تأكد من نشر Edge Function:
supabase functions deploy server
\`\`\`

### المشكلة: "Environment variables not found"
\`\`\`bash
# في Vercel Dashboard:
Settings → Environment Variables → Add
# ثم Redeploy
\`\`\`

### المشكلة: "CORS Error"
- افتح `/supabase/functions/server/index.tsx`
- تأكد من وجود:
\`\`\`typescript
cors({ origin: "*" })
\`\`\`

---

## 🎯 Checklist السريع

- [ ] ✅ مشروع Supabase تم إنشاؤه
- [ ] ✅ Edge Function تم نشرها
- [ ] ✅ المفاتيح تم نسخها
- [ ] ✅ GitHub Repository تم إنشاؤه
- [ ] ✅ Vercel تم ربطه
- [ ] ✅ Environment Variables تم إضافتها
- [ ] ✅ الموقع يعمل!

---

## 🚀 الخطوات التالية

بعد النشر بنجاح:

1. **أضف Domain مخصص** (اختياري)
   - Vercel → Settings → Domains

2. **راقب الأداء**
   - Vercel → Analytics
   - Supabase → Logs

3. **شارك الموقع!** 🎉

---

**رابط الموقع:** `https://your-project.vercel.app`

**مدة النشر الفعلية:** 5-7 دقائق ⚡

</div>
