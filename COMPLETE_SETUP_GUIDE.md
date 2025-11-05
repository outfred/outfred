# 🚀 دليل الإعداد الكامل - خطوة بخطوة

<div dir="rtl">

## معلومات مشروع Supabase الخاص بك:

\`\`\`
🏷️  Project Reference ID: ozppgslrxgcujmzthxzh
🌐 Project URL: https://ozppgslrxgcujmzthxzh.supabase.co
⚡ Edge Function URL: https://ozppgslrxgcujmzthxzh.supabase.co/functions/v1/server
\`\`\`

---

## الخطوة 1️⃣: الحصول على ANON KEY

### الطريقة السريعة:
1. اذهب إلى: https://supabase.com/dashboard/project/ozppgslrxgcujmzthxzh/settings/api
2. انسخ القيمة من **"anon public"**
3. افتح ملف `.env` في مجلد المشروع
4. استبدل `GET_THIS_FROM_SUPABASE_DASHBOARD` بالمفتاح اللي نسخته

### أو اقرأ الدليل المفصل:
📖 [GET_ANON_KEY.md](./GET_ANON_KEY.md)

---

## الخطوة 2️⃣: تثبيت المكتبات

\`\`\`bash
# في مجلد المشروع:
npm install
\`\`\`

⏰ ممكن يأخذ 2-3 دقائق

---

## الخطوة 3️⃣: اختبار محلي

\`\`\`bash
# تشغيل المشروع
npm run dev
\`\`\`

افتح المتصفح على: `http://localhost:3000`

### جرب:
- ✅ إنشاء حساب جديد
- ✅ تسجيل الدخول
- ✅ فتح صفحة المتاجر
- ✅ البحث عن منتج

لو كل حاجة شغالة، يبقى الإعداد صح! 🎉

---

## الخطوة 4️⃣: نشر Edge Function على Supabase

\`\`\`bash
# تثبيت Supabase CLI (مرة واحدة فقط)
npm install -g supabase

# تسجيل الدخول
supabase login

# ربط المشروع
supabase link --project-ref ozppgslrxgcujmzthxzh

# نشر Edge Function
supabase functions deploy server
\`\`\`

✅ لو ظهر **"Deployed successfully"** يبقى تمام!

---

## الخطوة 5️⃣: رفع على GitHub

### A. إنشاء Repository جديد:
1. اذهب إلى: https://github.com/new
2. Repository name: `outfred`
3. اضغط **"Create repository"**

### B. رفع الكود:
\`\`\`bash
# في مجلد المشروع:
git init
git add .
git commit -m "🚀 Initial commit - Outfred platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/outfred.git
git push -u origin main
\`\`\`

**استبدل `YOUR_USERNAME` باسم حسابك على GitHub**

---

## الخطوة 6️⃣: النشر على Vercel

### الطريقة السهلة (من الموقع):

1. **اذهب إلى:** https://vercel.com/new
2. **اضغط:** "Import" بجانب repository `outfred`
3. **في Environment Variables، أضف:**

\`\`\`
VITE_SUPABASE_URL
https://ozppgslrxgcujmzthxzh.supabase.co

VITE_SUPABASE_ANON_KEY
(المفتاح اللي نسخته من Supabase Dashboard)

VITE_SUPABASE_SERVER_URL
https://ozppgslrxgcujmzthxzh.supabase.co/functions/v1/server
\`\`\`

4. **اضغط:** "Deploy"

⏰ الانتظار: 2-3 دقائق

---

### الطريقة البديلة (من Terminal):

\`\`\`bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إضافة Environment Variables
vercel env add VITE_SUPABASE_URL
# اكتب: https://ozppgslrxgcujmzthxzh.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# اكتب: المفتاح من Supabase

vercel env add VITE_SUPABASE_SERVER_URL
# اكتب: https://ozppgslrxgcujmzthxzh.supabase.co/functions/v1/server

# نشر للإنتاج
vercel --prod
\`\`\`

---

## الخطوة 7️⃣: اختبار الموقع المنشور

افتح الرابط اللي أعطاك إياه Vercel (مثال: `https://outfred.vercel.app`)

### جرب:
- [ ] الصفحة الرئيسية تفتح
- [ ] يمكنك إنشاء حساب
- [ ] يمكنك تسجيل الدخول
- [ ] البحث يعمل
- [ ] صفحة المتاجر تعمل
- [ ] مولد الأوتفتات يعمل

---

## 🎉 مبروك!

موقعك دلوقتي شغال على:
- 🌐 **Frontend:** https://your-project.vercel.app
- ⚡ **Backend:** https://ozppgslrxgcujmzthxzh.supabase.co
- 💾 **Code:** https://github.com/YOUR_USERNAME/outfred

---

## 📋 Checklist الإعداد الكامل:

- [ ] ✅ حصلت على ANON KEY من Supabase
- [ ] ✅ حطيت المفتاح في ملف `.env`
- [ ] ✅ نفذت `npm install`
- [ ] ✅ جربت المشروع محلياً (`npm run dev`)
- [ ] ✅ نشرت Edge Function (`supabase functions deploy server`)
- [ ] ✅ رفعت الكود على GitHub
- [ ] ✅ نشرت على Vercel
- [ ] ✅ أضفت Environment Variables في Vercel
- [ ] ✅ جربت الموقع المنشور

---

## 🔄 التحديثات المستقبلية:

بعد أي تعديل في الكود:

\`\`\`bash
git add .
git commit -m "وصف التعديل"
git push
\`\`\`

Vercel هايعمل Deploy تلقائي! ✨

---

## 🐛 حل المشاكل:

### "Invalid API key"
→ تأكد إنك نسخت **anon public** مش **service_role**
→ اقرأ: [GET_ANON_KEY.md](./GET_ANON_KEY.md)

### "Failed to deploy Edge Function"
\`\`\`bash
supabase login
supabase link --project-ref ozppgslrxgcujmzthxzh
supabase functions deploy server
\`\`\`

### "Build failed" في Vercel
→ تأكد من إضافة الـ Environment Variables صح
→ شوف الـ Logs في Vercel Dashboard

### الموقع يعمل لكن "Failed to fetch"
→ تأكد من نشر Edge Function على Supabase
→ تأكد من صحة `VITE_SUPABASE_SERVER_URL`

---

## 📚 دلائل إضافية:

- [UPLOAD_STEPS.md](./UPLOAD_STEPS.md) - خطوات الرفع بالتفصيل
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - نشر سريع
- [COMMANDS_QUICK_REFERENCE.md](./COMMANDS_QUICK_REFERENCE.md) - كل الأوامر
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - حل المشاكل

---

## 📞 الدعم:

لو محتاج مساعدة:
1. ✅ اقرأ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. ✅ شوف الـ Logs:
   - Vercel: Dashboard → Deployments → Logs
   - Supabase: Dashboard → Edge Functions → Logs
3. ✅ تأكد من صحة جميع Environment Variables

---

## 🎯 الروابط المهمة:

- **Supabase Dashboard:** https://supabase.com/dashboard/project/ozppgslrxgcujmzthxzh
- **Supabase API Settings:** https://supabase.com/dashboard/project/ozppgslrxgcujmzthxzh/settings/api
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repository:** https://github.com/YOUR_USERNAME/outfred

---

**ملحوظة:** احتفظ بهذا الملف للرجوع إليه في المستقبل! 📌

</div>
