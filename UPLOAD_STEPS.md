# 📦 خطوات رفع المشروع على GitHub و Vercel

<div dir="rtl">

## الخطوة 1️⃣: تجهيز الملفات على جهازك

### 1. تحميل المشروع
\`\`\`bash
# افتح Terminal أو Command Prompt في مجلد المشروع
cd path/to/outfred
\`\`\`

### 2. تثبيت Node.js و npm
- لو مش مثبت عندك، حمله من [nodejs.org](https://nodejs.org/)
- اختار النسخة LTS (موصى بها)
- بعد التثبيت، تأكد:
\`\`\`bash
node --version  # لازم يطلع رقم زي v20.10.0
npm --version   # لازم يطلع رقم زي 10.2.3
\`\`\`

### 3. تثبيت مكتبات المشروع
\`\`\`bash
npm install
\`\`\`
⏰ ممكن يأخذ 2-3 دقايق

### 4. إنشاء ملف البيئة
\`\`\`bash
# انسخ ملف المثال
cp .env.example .env

# أو على Windows:
copy .env.example .env
\`\`\`

**افتح ملف `.env` وحط فيه بيانات Supabase:**
\`\`\`env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVER_URL=https://xxxxxxxx.supabase.co/functions/v1/server
\`\`\`

### 5. اختبار المشروع محلياً (اختياري)
\`\`\`bash
npm run dev
\`\`\`
افتح المتصفح على: `http://localhost:3000`

---

## الخطوة 2️⃣: رفع على GitHub

### 1. تثبيت Git
- لو مش مثبت: حمله من [git-scm.com](https://git-scm.com/)
- بعد التثبيت:
\`\`\`bash
git --version  # لازم يطلع رقم
\`\`\`

### 2. تكوين Git (أول مرة بس)
\`\`\`bash
git config --global user.name "اسمك"
git config --global user.email "your-email@example.com"
\`\`\`

### 3. إنشاء Repository على GitHub
1. اذهب إلى [github.com](https://github.com)
2. اضغط على **"+"** → **"New repository"**
3. املأ البيانات:
   - **Repository name:** `outfred`
   - **Description:** "Outfred - منصة أزياء ذكية"
   - **خلي Private** (لو عاوز) أو Public
   - **⚠️ متختارش** "Initialize with README"
4. اضغط **"Create repository"**

### 4. ربط المشروع بـ GitHub
\`\`\`bash
# في مجلد المشروع:

# 1. إنشاء Git repository محلي
git init

# 2. إضافة جميع الملفات
git add .

# 3. عمل Commit أول مرة
git commit -m "🚀 Initial commit - Outfred platform ready"

# 4. تسمية البرانش الرئيسي
git branch -M main

# 5. ربط بـ GitHub (استبدل YOUR_USERNAME باسم حسابك)
git remote add origin https://github.com/YOUR_USERNAME/outfred.git

# 6. رفع الملفات
git push -u origin main
\`\`\`

**ملحوظة:** لو طلب منك Username و Password:
- Username: اسم حسابك على GitHub
- Password: استخدم Personal Access Token (مش كلمة المرور العادية)

#### عمل Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. اختار: `repo` (كل الصلاحيات)
4. "Generate token"
5. **انسخ التوكن فوراً** (مش هايظهر تاني!)

---

## الخطوة 3️⃣: نشر Edge Function على Supabase

### 1. إنشاء مشروع Supabase
1. اذهب إلى [supabase.com](https://supabase.com) → "Sign in"
2. "New project"
3. املأ البيانات:
   - **Name:** outfred-prod
   - **Database Password:** (احفظها كويس!)
   - **Region:** EU West (أيرلندا) أو الأقرب ليك
4. "Create new project" → انتظر 2-3 دقايق

### 2. تثبيت Supabase CLI
\`\`\`bash
npm install -g supabase
\`\`\`

### 3. تسجيل الدخول
\`\`\`bash
supabase login
\`\`\`
هايفتح صفحة في المتصفح → اضغط "Authorize"

### 4. ربط المشروع
\`\`\`bash
# احصل على Project Reference من:
# Supabase Dashboard → Project Settings → General → Reference ID

supabase link --project-ref YOUR_PROJECT_REF
\`\`\`
**مثال:** `supabase link --project-ref abcdefghijklmnop`

### 5. نشر Edge Function
\`\`\`bash
# في مجلد المشروع:
supabase functions deploy server
\`\`\`

✅ لو ظهر "Deployed successfully" يبقى تمام!

### 6. الحصول على المفاتيح
1. Supabase Dashboard → Settings → API
2. انسخ:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
3. الـ Edge Function URL:
   \`\`\`
   https://YOUR_PROJECT_REF.supabase.co/functions/v1/server
   \`\`\`

---

## الخطوة 4️⃣: النشر على Vercel

### الطريقة الأولى: من الموقع (أسهل) ⭐

1. **اذهب إلى [vercel.com](https://vercel.com)**
2. **Sign Up** أو **Log In** (يفضل بحساب GitHub)
3. اضغط **"Add New..." → "Project"**
4. **Import Git Repository:**
   - اختار حسابك على GitHub
   - اختار `outfred` repository
   - اضغط **"Import"**

5. **Configure Project:**
   - **Project Name:** `outfred` (أو أي اسم)
   - **Framework Preset:** Vite (تلقائي)
   - **Root Directory:** `./` (السطر الأول)
   - **Build Command:** `npm run build` (تلقائي)
   - **Output Directory:** `dist` (تلقائي)

6. **Environment Variables:** اضغط "Add" وحط:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://xxxxxxxx.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (المفتاح الطويل) |
   | `VITE_SUPABASE_SERVER_URL` | `https://xxxxxxxx.supabase.co/functions/v1/server` |

7. اضغط **"Deploy"** 🎉

⏰ الانتظار: 2-3 دقايق

✅ لما تشوف "Congratulations" يبقى المشروع نشر بنجاح!

---

### الطريقة الثانية: من Terminal

\`\`\`bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر
vercel

# هايسألك أسئلة:
# - Set up and deploy? Y
# - Which scope? (اختار حسابك)
# - Link to existing project? N
# - What's your project's name? outfred
# - In which directory is your code? ./
# - Want to override settings? N

# 4. إضافة Environment Variables
vercel env add VITE_SUPABASE_URL
# اكتب القيمة → Enter
# production? Y
# preview? Y
# development? N

vercel env add VITE_SUPABASE_ANON_KEY
# اكتب القيمة...

vercel env add VITE_SUPABASE_SERVER_URL
# اكتب القيمة...

# 5. النشر للإنتاج
vercel --prod
\`\`\`

---

## الخطوة 5️⃣: التحقق من النشر

### 1. افتح رابط الموقع
\`\`\`
https://outfred.vercel.app
\`\`\`
(أو الرابط اللي أعطاهولك Vercel)

### 2. اختبار الميزات:
- [ ] الصفحة الرئيسية تعمل
- [ ] يمكنك إنشاء حساب جديد
- [ ] يمكنك تسجيل الدخول
- [ ] البحث يعمل
- [ ] صفحة المتاجر تعمل
- [ ] مولد الأوتفتات يعمل

---

## 🔄 التحديثات المستقبلية

لما تعمل تعديلات على الكود:

\`\`\`bash
# 1. احفظ التغييرات
git add .
git commit -m "وصف التحديث"
git push

# Vercel هايعمل Deploy تلقائي! ✨
\`\`\`

---

## 🐛 حل المشاكل الشائعة

### مشكلة: "npm: command not found"
**الحل:** ثبت Node.js من [nodejs.org](https://nodejs.org/)

### مشكلة: "git: command not found"
**الحل:** ثبت Git من [git-scm.com](https://git-scm.com/)

### مشكلة: "Permission denied" في GitHub
**الحل:** استخدم Personal Access Token بدل كلمة المرور

### مشكلة: "Failed to deploy Edge Function"
**الحل:**
\`\`\`bash
# تأكد من تسجيل الدخول
supabase login

# تأكد من الربط
supabase link --project-ref YOUR_REF

# حاول تاني
supabase functions deploy server
\`\`\`

### مشكلة: "Build failed" في Vercel
**الحل:**
1. تأكد من إضافة Environment Variables صح
2. شوف الـ Logs في Vercel Dashboard
3. جرب محلياً: `npm run build`

### مشكلة: الموقع يعمل لكن "Failed to fetch"
**الحل:**
1. تأكد من نشر Edge Function على Supabase
2. تأكد من صحة `VITE_SUPABASE_SERVER_URL`
3. افحص الـ Logs في Supabase → Edge Functions

---

## 📋 Checklist النهائي

قبل ما تخلص، تأكد:

- [ ] ✅ Node.js و npm مثبتين
- [ ] ✅ Git مثبت
- [ ] ✅ مشروع Supabase تم إنشاؤه
- [ ] ✅ Edge Function تم نشرها بنجاح
- [ ] ✅ Repository على GitHub تم إنشاؤه
- [ ] ✅ الكود تم رفعه على GitHub
- [ ] ✅ Vercel تم ربطه بـ GitHub
- [ ] ✅ Environment Variables تم إضافتها
- [ ] ✅ الموقع يعمل بنجاح!

---

## 🎉 تمام!

موقعك دلوقتي شغال على:
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-project.supabase.co`
- **Code:** `https://github.com/username/outfred`

**🚀 مبروك! مشروع Outfred نشر بنجاح**

</div>
