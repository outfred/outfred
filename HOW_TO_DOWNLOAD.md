# 📥 إزاي تحمل المشروع من Figma Make

<div dir="rtl">

## الطريقة 1️⃣: التحميل المباشر من Figma Make ⭐

### الخطوات:

1. **افتح القائمة الرئيسية** في Figma Make
   - ابحث عن زرار Menu أو Options
   - أو ابحث عن أيقونة "⋮" أو "☰"

2. **اختار "Download" أو "Export"**
   - ممكن تلاقيها تحت اسم:
     - "Download Project"
     - "Export Files"
     - "Download as ZIP"

3. **اختار تحميل كل الملفات**
   - ZIP file (موصى به)
   - أو Download All Files

4. **فك الضغط عن الملف**
   \`\`\`bash
   # على Windows: Right click → Extract All
   # على Mac: Double click الملف
   # على Linux:
   unzip outfred.zip
   \`\`\`

---

## الطريقة 2️⃣: نسخ الملفات يدوياً

إذا التحميل التلقائي مش متاح:

### أ. تحميل الملفات الأساسية

انسخ المحتوى من كل ملف وأنشئه محلياً:

#### 1. الملفات الأساسية للتشغيل:
\`\`\`bash
# في Terminal على جهازك:
mkdir outfred
cd outfred

# أنشئ الملفات
touch package.json
touch vite.config.ts
touch tsconfig.json
touch tsconfig.node.json
touch vercel.json
touch postcss.config.js
touch index.html
touch main.tsx
touch App.tsx
touch .env.example
touch .gitignore
\`\`\`

#### 2. المجلدات:
\`\`\`bash
mkdir -p components/ui
mkdir -p components/figma
mkdir -p pages
mkdir -p contexts
mkdir -p utils/supabase
mkdir -p styles
mkdir -p supabase/functions/server
mkdir -p imports
mkdir -p examples
mkdir -p guidelines
\`\`\`

#### 3. انسخ المحتوى:
- افتح كل ملف في Figma Make
- انسخ المحتوى (Ctrl+A ثم Ctrl+C)
- الصق في الملف المحلي المقابل

---

## الطريقة 3️⃣: استخدام Script تلقائي

إذا Figma Make يدعم API أو Console:

\`\`\`javascript
// في Console (F12)
// Script لتحميل كل الملفات
const downloadProject = () => {
  // هذا مثال - قد يختلف حسب البيئة
  const files = document.querySelectorAll('[data-file-path]');
  files.forEach(file => {
    const path = file.getAttribute('data-file-path');
    const content = file.textContent;
    downloadFile(path, content);
  });
};
\`\`\`

---

## ✅ التحقق من التحميل

بعد ما تحمل الملفات، تأكد من:

\`\`\`bash
# 1. تحقق من وجود الملفات الأساسية
ls -la

# يجب أن تشوف:
# ✓ package.json
# ✓ App.tsx
# ✓ main.tsx
# ✓ index.html
# ✓ vite.config.ts
# ✓ vercel.json

# 2. تحقق من المجلدات
ls -R

# يجب أن تشوف:
# ✓ components/
# ✓ pages/
# ✓ contexts/
# ✓ supabase/
# ✓ styles/
\`\`\`

---

## 📋 قائمة الملفات المطلوبة

### ملفات التكوين الأساسية (لازم!):
- [x] `package.json` - قائمة المكتبات
- [x] `vite.config.ts` - إعدادات Vite
- [x] `tsconfig.json` - إعدادات TypeScript
- [x] `vercel.json` - إعدادات Vercel
- [x] `index.html` - صفحة HTML الرئيسية
- [x] `main.tsx` - نقطة البداية
- [x] `App.tsx` - المكون الرئيسي
- [x] `.gitignore` - ملفات Git
- [x] `.env.example` - مثال المتغيرات

### المجلدات الأساسية:
- [x] `components/` - جميع المكونات (76 ملف)
- [x] `pages/` - جميع الصفحات (17 ملف)
- [x] `contexts/` - السياقات (2 ملف)
- [x] `utils/` - الوظائف المساعدة (3 ملفات)
- [x] `styles/` - ملفات CSS (1 ملف)
- [x] `supabase/functions/server/` - الـ Backend (4 ملفات)

### ملفات اختيارية (يفضل تحميلها):
- [x] جميع ملفات `.md` - التوثيق
- [x] `examples/` - الأمثلة
- [x] `imports/` - الملفات المستوردة

---

## 🚀 بعد التحميل

\`\`\`bash
# 1. ادخل للمجلد
cd outfred

# 2. ثبت المكتبات
npm install

# 3. أنشئ ملف .env
cp .env.example .env

# 4. عدل .env وحط بيانات Supabase

# 5. جرب المشروع
npm run dev

# 6. افتح المتصفح
# http://localhost:3000
\`\`\`

---

## 🔧 إذا حصلت مشكلة في التحميل

### الحل البديل: استخدام Template جاهز

\`\`\`bash
# 1. أنشئ مشروع Vite جديد
npm create vite@latest outfred -- --template react-ts

# 2. ادخل المجلد
cd outfred

# 3. ثبت المكتبات الأساسية
npm install

# 4. ثبت مكتبات Outfred
npm install @supabase/supabase-js lucide-react recharts sonner
npm install react-hook-form@7.55.0 zod @hookform/resolvers
npm install class-variance-authority clsx tailwind-merge
npm install date-fns react-day-picker

# 5. ثبت Radix UI
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-aspect-ratio @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-hover-card
npm install @radix-ui/react-label @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu @radix-ui/react-popover
npm install @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-slider
npm install @radix-ui/react-slot @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-toast
npm install @radix-ui/react-toggle @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip

# 6. ثبت باقي المكتبات
npm install cmdk embla-carousel-react input-otp
npm install react-resizable-panels vaul

# 7. ثبت Tailwind CSS v4
npm install tailwindcss@next autoprefixer postcss

# 8. بعد كده انسخ الملفات يدوياً
\`\`\`

---

## 💡 نصائح

### 1. استخدم Git من البداية
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
\`\`\`

### 2. احفظ نسخة احتياطية
\`\`\`bash
# اعمل ZIP للمجلد كله
zip -r outfred-backup.zip outfred/
\`\`\`

### 3. تحقق من سلامة الملفات
\`\`\`bash
# تأكد من عدد الملفات
find . -type f | wc -l

# يجب أن يكون حوالي 150-200 ملف
\`\`\`

---

## 📞 طرق بديلة للتحميل

### Option A: استخدام Browser DevTools
1. افتح DevTools (F12)
2. اذهب إلى Sources/Sources Tab
3. ابحث عن ملفات المشروع
4. Right click → Save as

### Option B: استخدام wget/curl
\`\`\`bash
# إذا كان هناك رابط تحميل مباشر
wget https://figma-make.com/export/project/xxx.zip
\`\`\`

### Option C: استخدام Screenshot/OCR (آخر حل!)
- استخدم للملفات الصغيرة فقط
- صور الكود وحوله لنص باستخدام OCR
- مش موصى بيها!

---

## ✅ Checklist قبل المتابعة

بعد التحميل، تأكد من:

- [ ] كل الملفات موجودة
- [ ] المجلدات صحيحة
- [ ] `package.json` موجود وصحيح
- [ ] الملفات غير تالفة/فارغة
- [ ] يمكنك فتح الملفات وقراءتها
- [ ] `npm install` يعمل بدون أخطاء
- [ ] `npm run dev` يعمل بدون أخطاء

---

## 🎯 الخطوة التالية

بعد ما تحمل المشروع بنجاح:

👉 **اتبع [UPLOAD_STEPS.md](./UPLOAD_STEPS.md)** لرفع المشروع على GitHub و Vercel

---

## 🆘 محتاج مساعدة؟

إذا واجهت مشكلة:
1. جرب الطريقة البديلة (Template)
2. تأكد من صلاحيات الكتابة في المجلد
3. تأكد من مساحة كافية على القرص
4. جرب استخدام مجلد مختلف

</div>
