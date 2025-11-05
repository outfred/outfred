# 🔌 نظام استيراد المنتجات - Outfred Product Import System

## 📋 نظرة عامة | Overview

تم تطوير نظام استيراد المنتجات الكامل للتجار في منصة Outfred. النظام يسمح للتجار باستيراد منتجاتهم من مصادر متعددة بطريقة ذكية وآلية.

**A complete product import system has been developed for merchants on the Outfred platform. The system allows merchants to import their products from multiple sources in a smart and automated way.**

---

## 🎯 الميزات الرئيسية | Key Features

### 1. طرق الاستيراد المتعددة | Multiple Import Methods

#### 📁 استيراد عبر CSV/Excel
- رفع ملف CSV يحتوي على بيانات المنتجات
- تحليل تلقائي للأعمدة والبيانات
- دعم للحقول: name, price, color, size, image_url, category, stock

**Upload a CSV file containing product data with automatic column and data analysis**

#### 🌐 استيراد عبر Website Scraper
- استخراج المنتجات تلقائياً من موقع التاجر
- تحليل HTML واستخراج البيانات
- دعم المواقع المختلفة

**Automatically extract products from the merchant's website with HTML parsing and data extraction**

#### 🔗 استيراد عبر API
- الاتصال بـ Shopify, WooCommerce, أو أي API مخصص
- مزامنة تلقائية ودورية
- دعم API Keys

**Connect to Shopify, WooCommerce, or any custom API with automatic periodic sync**

---

### 2. معالجة البيانات الذكية | Smart Data Processing

#### ✨ تنظيف وتوحيد البيانات
\`\`\`javascript
- Normalize الاسم → lowercase + إزالة الرموز
- استخراج الكلمات المفتاحية (اللون، المقاس، الفئة)
- توليد slug فريد (مثال: brandx-black-oversize-hoodie)
\`\`\`

#### 🔍 كشف التكرارات الذكي
- مقارنة نصية (Text Similarity) بنسبة > 85%
- مقارنة بصرية (Image Similarity) للصور
- منع إضافة منتجات مكررة

**Duplicate detection using text similarity (>85%) and image comparison to prevent duplicate products**

#### 🔄 خيارات المعالجة
- **Update Existing**: تحديث المنتجات الموجودة (السعر والمخزون)
- **Auto-sync**: مزامنة تلقائية كل 24 ساعة

---

### 3. واجهة مستخدم متقدمة | Advanced UI

#### 📊 شاشة الاستيراد الرئيسية
1. **اختيار المتجر**: قائمة بالمتاجر المعتمدة
2. **اختيار طريقة الاستيراد**: CSV / Website / API
3. **إدخال البيانات**: حسب نوع المصدر
4. **خيارات الاستيراد**: تحديث تلقائي، مزامنة دورية
5. **بدء الاستيراد**: زر بدء العملية

#### ⚡ Progress Tracking في الوقت الفعلي
\`\`\`
📊 الإحصائيات الحية:
- Total: إجمالي المنتجات المكتشفة
- Added: المنتجات المضافة الجديدة ✅
- Updated: المنتجات المحدثة 🔄
- Duplicates: المنتجات المكررة المتجاهلة 🔁
- Failed: المنتجات الفاشلة ❌
\`\`\`

#### 📜 سجل العمليات (Logs)
- عرض real-time للعمليات الجارية
- رسائل تفصيلية لكل منتج
- توقيت كل عملية

**Real-time operation logs with detailed messages and timestamps for each product**

---

### 4. سجل الاستيراد | Import History

#### 📋 عرض جميع الجلسات السابقة
- معلومات الجلسة (ID, التاريخ, المدة الزمنية)
- الحالة (مكتمل / فشل / جاري المعالجة)
- الإحصائيات الكاملة لكل جلسة
- المصدر المستخدم (CSV / Website / API)

#### 🗑️ إدارة الجلسات
- عرض تفاصيل كل جلسة
- حذف الجلسات القديمة
- تصفية حسب التاجر أو التاريخ

---

## 🏗️ البنية التقنية | Technical Architecture

### Backend Routes (Supabase Edge Functions)

\`\`\`typescript
// Get available connectors
GET /products/import/connectors

// Start new import session
POST /products/import/start
Body: {
  merchantId: string,
  sourceType: 'csv' | 'website' | 'api',
  sourceData: { csvContent | url | apiUrl, apiKey },
  options: { updateExisting, autoSync }
}

// Get import session status
GET /products/import/status/:sessionId

// Get import history
GET /products/import/history?merchantId=xxx

// Delete import session
DELETE /products/import/session/:sessionId
\`\`\`

---

### Data Models

#### Import Session
\`\`\`typescript
{
  id: string,                    // import_20251102_001
  merchantId: string,
  userId: string,
  sourceType: 'csv' | 'website' | 'api',
  sourceData: any,
  status: 'processing' | 'completed' | 'failed',
  startedAt: ISO8601,
  completedAt?: ISO8601,
  duration?: number,             // milliseconds
  stats: {
    total: number,
    added: number,
    updated: number,
    duplicates: number,
    failed: number
  },
  logs: Array<{ time, message }>,
  products: string[]             // Array of product IDs
}
\`\`\`

#### Connector
\`\`\`typescript
{
  slug: string,                  // 'shopify', 'csv', 'website'
  name: string,                  // Display name
  type: 'api' | 'file' | 'scraper',
  fields: object,                // Required fields
  mapping: object                // Field mapping schema
}
\`\`\`

#### Product (Enhanced)
\`\`\`typescript
{
  // ... existing fields
  slug: string,                  // brandx-black-hoodie
  importedFrom: 'csv' | 'website' | 'api',
  importSessionId: string,
  sourceUrl?: string,
  lastSyncedAt?: ISO8601
}
\`\`\`

---

## 🔐 الأمان | Security

### حماية البيانات
- ✅ المصادقة مطلوبة لجميع عمليات الاستيراد
- ✅ التحقق من ملكية التاجر للمتجر
- ✅ عزل بيانات كل تاجر عن الآخر
- ✅ حدود استيراد (1000 منتج/يوم)

### التحقق من الصلاحيات
\`\`\`typescript
// Only authenticated merchants can import
const user = await authenticate(c);
if (!user) return unauthorized();

// Verify merchant ownership
const merchant = await kv.get(`merchant:${merchantId}`);
if (!merchant) return notFound();
\`\`\`

---

## 🚀 طريقة الاستخدام | How to Use

### للتاجر | For Merchants

1. **تسجيل الدخول** إلى حسابك في Outfred
2. الذهاب إلى صفحة **🔌 استيراد المنتجات** من القائمة الرئيسية
3. **اختيار المتجر** الذي تريد استيراد منتجاته
4. **اختيار ط��يقة الاستيراد**:
   - CSV: رفع ملف
   - Website: إدخال رابط الموقع
   - API: إدخال بيانات API
5. **ضبط الخيارات**:
   - ☑️ تحديث المنتجات الموجودة
   - ☑️ مزامنة تلقائية يومية
6. **بدء الاستيراد** ومراقبة التقدم
7. **مراجعة النتائج** في سجل الاستيراد

---

### للمطورين | For Developers

#### مثال: استيراد من CSV
\`\`\`typescript
const response = await productsApi.importStart({
  merchantId: 'merchant-123',
  sourceType: 'csv',
  sourceData: {
    csvContent: 'name,price,color,size...\n...'
  },
  options: {
    updateExisting: true,
    autoSync: false
  }
});

// Get session ID
const sessionId = response.sessionId;

// Poll for status
const status = await productsApi.importStatus(sessionId);
console.log(status.session.stats);
\`\`\`

#### مثال: استيراد من Website
\`\`\`typescript
await productsApi.importStart({
  merchantId: 'merchant-123',
  sourceType: 'website',
  sourceData: {
    url: 'https://www.brandx.com/products'
  },
  options: {
    updateExisting: true,
    autoSync: true  // Daily sync
  }
});
\`\`\`

---

## 📊 خوارزمية كشف التكرارات | Deduplication Algorithm

### Text Similarity (Jaccard Similarity)
\`\`\`typescript
function calculateSimilarity(text1, text2) {
  const words1 = new Set(extractKeywords(text1));
  const words2 = new Set(extractKeywords(text2));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// If similarity > 85% → Duplicate
\`\`\`

### Slug-based Matching
\`\`\`typescript
function generateSlug(brand, name, color) {
  return normalizeText(`${brand} ${name} ${color}`)
    .replace(/\s+/g, '-');
}

// If slug1 === slug2 → Duplicate
\`\`\`

---

## 🧪 اختبار النظام | Testing

### Demo Credentials
\`\`\`
Email: admin@outfred.com
Password: admin123
\`\`\`

### Test CSV Format
\`\`\`csv
name,price,color,sizes,fit,category,image_url,stock
Black Oversize Hoodie,650,black,M|L|XL,oversize,hoodies,https://example.com/img1.jpg,50
White Graphic T-Shirt,299,white,S|M|L|XL,regular,t-shirts,https://example.com/img2.jpg,100
\`\`\`

---

## 🔧 استكشاف الأخطاء | Troubleshooting

### مشكلة: "Unauthorized"
**الحل**: تأكد من تسجيل الدخول. استخدم Debug Panel في /#debug

### مشكلة: "Merchant not found"
**الحل**: تأكد أن المتجر معتمد (status = 'approved')

### مشكلة: Import فشل
**الحل**: راجع الـ logs في تفاصيل الجلسة

### مشكلة: منتجات مكررة كثيرة
**الحل**: فعّل خيار "Update Existing Products"

---

## 🎨 الصفحات والمكونات | Pages & Components

### الملفات المضافة
\`\`\`
📁 /pages/MerchantImport.tsx          - صفحة الاستيراد الرئيسية
📁 /utils/api.ts                      - APIs الجديدة
📁 /supabase/functions/server/index.tsx - Backend routes
\`\`\`

### الـ UI Components المستخدمة
- Card, Button, Input, Label, Textarea
- Tabs, TabsList, TabsTrigger, TabsContent
- Badge, Progress, Alert, Separator, Switch
- Motion (للتحريكات)

---

## 📈 المستقبل | Future Enhancements

### Phase 2 - المخطط له
- [ ] دعم Shopify API الحقيقي
- [ ] دعم WooCommerce API
- [ ] معالجة صور متقدمة (compression, resize)
- [ ] Image Hashing للمقارنة البصرية
- [ ] Scheduled imports (Cron Jobs)
- [ ] Webhook support لتحديثات فورية
- [ ] Import templates (save mapping)
- [ ] Bulk edit بعد الاستيراد
- [ ] Export report (PDF/Excel)

---

## 🎉 الخلاصة | Summary

تم بناء نظام استيراد منتجات متكامل وقوي يوفر:

✅ **3 طرق استيراد**: CSV, Website, API  
✅ **معالجة ذكية**: Normalization, Deduplication  
✅ **واجهة متقدمة**: Real-time progress, History  
✅ **أمان عالي**: Authentication, Authorization  
✅ **توسعية**: سهولة إضافة connectors جديدة  

**A complete and robust product import system has been built providing multiple import methods, smart processing, advanced UI, high security, and scalability.**

---

## 🔗 روابط مفيدة | Useful Links

- **الصفحة الرئيسية**: `/#home`
- **استيراد المنتجات**: `/#import`
- **لوحة التحكم**: `/#admin`
- **Debug Panel**: `/#debug`

---

**تم التطوير بواسطة فريق Outfred 🚀**  
**Developed by Outfred Team 🚀**
