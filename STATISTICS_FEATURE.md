# إضافة نظام الإحصائيات Statistics Feature

## الميزات الجديدة Added Features

### 1. صفحة تفاصيل المنتج Product Details Page
- **المسار Path**: `/pages/ProductDetails.tsx`
- **الوصول Access**: من خلال زر "View/عرض" في نتائج البحث
- **الميزات Features**:
  - عرض تفاصيل المنتج الكاملة (صورة، اسم، سعر، وصف)
  - زر إضافة إلى السلة Add to Cart
  - زر إضافة للمفضلة Add to Favorites
  - مشاركة المنتج Share Product
  - عرض منتجات مشابهة Related Products
  - **تسجيل تلقائي للمشاهدة** - يتم تسجيل كل مشاهدة للمنتج في الإحصائيات

### 2. نظام تسجيل عمليات البحث Search Tracking System
- يتم تسجيل كل عملية بحث في قاعدة البيانات
- يتم حفظ:
  - نص البحث Query
  - اللغة المستخدمة Language (عربي/إنجليزي)
  - التاريخ والوقت Timestamp

### 3. نظام تسجيل المشاهدات Product View Tracking
- يتم تسجيل كل مشاهدة لمنتج تلقائياً
- يتم حفظ:
  - معرف المنتج Product ID
  - التاريخ والوقت Timestamp

### 4. صفحة الإحصائيات Statistics Dashboard
- **المسار Path**: `/pages/Statistics.tsx`
- **الوصول Access**: للأدمن فقط Admin Only
- **الوصول من**: لوحة الأدمن → Analytics Tab → "View Statistics"
- **المحتوى Content**:
  - إجمالي عمليات البحث Total Searches
  - إجمالي مشاهدات المنتجات Total Product Views
  - توزيع اللغات Language Distribution
  - أكثر 10 عمليات بحث Top 10 Searches
  - أكثر 10 منتجات مشاهدة Top 10 Viewed Products
  - النشاط اليومي (آخر 30 يوم) Daily Activity (Last 30 Days)

## Backend APIs

### 1. تسجيل عملية بحث Record Search
\`\`\`
POST /make-server-dec0bed9/stats/search
Body: {
  "query": "search text",
  "language": "ar" // or "en"
}
\`\`\`

### 2. تسجيل مشاهدة منتج Record Product View
\`\`\`
POST /make-server-dec0bed9/stats/product-view
Body: {
  "productId": "product-uuid"
}
\`\`\`

### 3. الحصول على ملخص الإحصائيات Get Statistics Summary (Admin Only)
\`\`\`
GET /make-server-dec0bed9/stats/summary
Headers: {
  "X-Access-Token": "admin-token"
}

Response: {
  "summary": {
    "totalSearches": 123,
    "totalViews": 456,
    "topSearches": [...],
    "topViewedProducts": [...],
    "searchesByDate": [...],
    "viewsByDate": [...],
    "languageStats": [...]
  }
}
\`\`\`

### 4. الحصول على عدد مشاهدات منتج Get Product View Count
\`\`\`
GET /make-server-dec0bed9/stats/product/:id/views

Response: {
  "productId": "product-uuid",
  "viewCount": 42,
  "views": [...]
}
\`\`\`

## التحديثات على الملفات الموجودة Updates to Existing Files

### 1. `/App.tsx`
- إضافة route للمنتج 'product'
- إضافة route للإحصائيات 'statistics'
- تمرير دالة `onNavigate` لصفحة Home

### 2. `/pages/Home.tsx`
- إضافة دالة navigation للمنتجات
- تسجيل تلقائي لعمليات البحث
- تحديث زر "View" للانتقال لصفحة المنتج

### 3. `/pages/Admin.tsx`
- إضافة رابط سريع لصفحة الإحصائيات في تبويب Analytics

### 4. `/utils/api.ts`
- إضافة `productsApi.recordSearch()` - لتسجيل عملية بحث
- إضافة `productsApi.recordView()` - لتسجيل مشاهدة منتج
- إضافة `statsApi.getSummary()` - للحصول على ملخص الإحصائيات
- إضافة `statsApi.getProductViews()` - للحصول على مشاهدات منتج

### 5. `/supabase/functions/server/index.tsx`
- إضافة 4 endpoints جديدة للإحصائيات
- نظام تخزين في KV store باستخدام prefixes:
  - `stats:search:*` - لعمليات البحث
  - `stats:view:*` - لمشاهدات المنتجات

## كيفية الاستخدام How to Use

### للمستخدمين For Users:
1. ابحث عن منتج في الصفحة الرئيسية
2. اضغط على زر "View/عرض" لمشاهدة تفاصيل المنتج
3. كل عملية بحث ومشاهدة يتم تسجيلها تلقائياً

### للمسؤولين For Admins:
1. سجل الدخول كأدمن
2. انتقل إلى لوحة الأدمن (Admin Panel)
3. في تبويب Analytics، اضغط على "View Statistics"
4. شاهد الإحصائيات التفصيلية:
   - أكثر عمليات البحث
   - أكثر المنتجات مشاهدة
   - النشاط اليومي
   - توزيع اللغات

## الفوائد Benefits

✅ **تحليل سلوك المستخدمين** - فهم ماذا يبحث المستخدمون
✅ **تحسين المحتوى** - معرفة المنتجات الأكثر شعبية
✅ **تحسين البحث** - معرفة الكلمات المفتاحية الأكثر استخداماً
✅ **اتخاذ قرارات مبنية على البيانات** - إحصائيات دقيقة وشاملة
✅ **دعم اللغتين** - تتبع العربية والإنجليزية بشكل منفصل

## ملاحظات هامة Important Notes

- جميع الإحصائيات يتم تخزينها في KV store
- صفحة الإحصائيات متاحة للأدمن فقط
- يتم تسجيل البحث والمشاهدة بشكل تلقائي
- لا يؤثر نظام الإحصائيات على أداء التطبيق
- يمكن الوصول لآخر 30 يوم من البيانات
