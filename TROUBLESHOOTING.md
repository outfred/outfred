# Outfred - دليل استكشاف الأخطاء
## Troubleshooting Guide

---

## مشكلة: خطأ "Invalid credentials" عند تسجيل الدخول
### Problem: "Invalid credentials" error when logging in

### الأسباب المحتملة / Possible Causes:

1. **قاعدة البيانات فارغة** - البيانات التجريبية لم يتم إنشاؤها
   - **Database is empty** - Demo data was not initialized

2. **كلمة مرور خاطئة** - المعلومات المدخلة غير صحيحة
   - **Wrong password** - Incorrect credentials entered

3. **مشكلة في الاتصال** - السيرفر غير متاح
   - **Connection issue** - Server not accessible

---

## الحل / Solution:

### الخطوة 1: افتح لوحة Debug
**Step 1: Open Debug Panel**

1. انتقل إلى الصفحة الرئيسية
   - Navigate to home page
2. انقر على "🔧 Debug" في القائمة العلوية (للأدمن فقط)
   - Click "🔧 Debug" in top menu (admin only)
3. أو افتح مباشرة: `/debug`
   - Or open directly: `/debug`

---

### الخطوة 2: تحقق من حالة قاعدة البيانات
**Step 2: Check Database Status**

انقر على زر **"Check DB Status"**
- Click the **"Check DB Status"** button

#### ��لنتائج المتوقعة / Expected Results:

\`\`\`json
{
  "status": {
    "initialized": true,
    "validUsers": 1,
    "users": [
      {
        "email": "admin@outfred.com",
        "name": "Admin User",
        "role": "admin"
      }
    ]
  }
}
\`\`\`

#### إذا كانت النتيجة / If the result shows:
- `validUsers: 0` ← قاعدة البيانات فارغة
- `validUsers: 0` ← Database is empty

---

### الخطوة 3: إعادة تهيئة البيانات التجريبية
**Step 3: Reset Demo Data**

انقر على زر **"Reset Demo Data"**
- Click the **"Reset Demo Data"** button

هذا سيقوم بـ:
- This will:
  1. حذف البيانات القديمة
     - Delete old data
  2. إنشاء حساب أدمن جديد
     - Create new admin account
  3. إنشاء متاجر تجريبية
     - Create demo merchants

---

### الخطوة 4: اختبار تسجيل الدخول
**Step 4: Test Login**

انقر على زر **"Test Login"**
- Click the **"Test Login"** button

#### النتيجة المتوقعة / Expected Result:

\`\`\`json
{
  "success": true,
  "accessToken": "...",
  "user": {
    "id": "...",
    "email": "admin@outfred.com",
    "name": "Admin User",
    "role": "admin"
  }
}
\`\`\`

---

### الخطوة 5: التحقق من Authentication
**Step 5: Verify Authentication**

انقر على زر **"Test Authentication"**
- Click the **"Test Authentication"** button

إذا نجح الاختبار، يمكنك الآن تسجيل الدخول بشكل طبيعي!
- If test succeeds, you can now login normally!

---

## بيانات الدخول التجريبية
## Demo Login Credentials

\`\`\`
Email: admin@outfred.com
Password: admin123
\`\`\`

---

## نصائح إضافية
## Additional Tips

### 1. تحقق من Console في المتصفح
**Check Browser Console**

افتح Developer Tools (F12) واذهب إلى تبويب Console لرؤية رسائل الخطأ التفصيلية
- Open Developer Tools (F12) and go to Console tab to see detailed error messages

### 2. تحقق من Network Tab
**Check Network Tab**

في Developer Tools:
- In Developer Tools:
  1. اذهب إلى Network tab
     - Go to Network tab
  2. حاول تسجيل الدخول
     - Try to login
  3. ابحث عن طلب `/auth/login`
     - Look for `/auth/login` request
  4. اضغط عليه لرؤية التفاصيل
     - Click it to see details

### 3. امسح Local Storage
**Clear Local Storage**

في Console:
- In Console:
\`\`\`javascript
localStorage.clear();
location.reload();
\`\`\`

---

## رسائل الخطأ الشائعة
## Common Error Messages

### ❌ "Invalid credentials. User not found."
**الحل:** قاعدة البيانات فارغة، اتبع الخطوات أعلاه لإعادة التهيئة
- **Solution:** Database is empty, follow steps above to reset

### ❌ "Invalid credentials. Incorrect password."
**الحل:** تأكد من استخدام كلمة المرور الصحيحة: `admin123`
- **Solution:** Make sure you're using correct password: `admin123`

### ❌ "Network error"
**الحل:** تحقق من اتصالك بالإنترنت والسيرفر
- **Solution:** Check your internet connection and server

### ❌ "No access token received"
**الحل:** مشكلة في السيرفر، اتصل بالدعم الفني
- **Solution:** Server issue, contact technical support

---

## الاتصال بالدعم الفني
## Contact Support

إذا استمرت المشكلة بعد اتباع كل الخطوات:
- If problem persists after following all steps:

1. افتح لوحة Debug
   - Open Debug Panel
2. اضغط على جميع أزرار الاختبار
   - Click all test buttons
3. التقط لقطات شاشة للنتائج
   - Take screenshots of results
4. شارك لقطات الشاشة مع الدعم الفني
   - Share screenshots with technical support

---

## معلومات تقنية إضافية
## Additional Technical Information

### بنية النظام / System Architecture

\`\`\`
Frontend (React + Tailwind)
    ↓
API Layer (/utils/api.ts)
    ↓
Supabase Edge Functions
    ↓
KV Store (Database)
\`\`\`

### نظام المصادقة / Authentication System

- **نوع Token:** Base64 encoded simple token
  - **Token Type:** Base64 encoded simple token
- **Header المستخدم:** `X-Access-Token`
  - **Header Used:** `X-Access-Token`
- **مدة الصلاحية:** 30 يوم
  - **Expiration:** 30 days
- **التخزين:** `localStorage`
  - **Storage:** `localStorage`

---

**آخر تحديث:** نوفمبر 2025
**Last Updated:** November 2025
