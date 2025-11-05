# إصلاح نظام استيراد المنتجات - دعم Shopify

## المشكلة
كان النظام يجد 0 منتجات عند محاولة استيراد المنتجات من متجر Shopify (مثل https://asilieg.com/collections/all) على الرغم من أن الصفحة تحتوي على منتجات فعلية.

## الحل
تم تحسين نظام الـ scraping بإضافة دعم كامل لـ Shopify JSON API:

### 1. إنشاء ملف Scraper جديد
تم إنشاء `/supabase/functions/server/scraper.tsx` مع الميزات التالية:

#### دعم Shopify JSON API
- يحاول الاتصال بـ Shopify JSON API أولاً
- يحول رابط Collection إلى `/collections/{name}/products.json`
- يحول رابط Products إلى `/products.json`
- يستخرج معلومات المنتجات من JSON response بشكل دقيق

#### Fallback إلى HTML Scraping
- إذا فشل Shopify JSON API، ينتقل تلقائياً إلى HTML scraping
- يستخدم regex patterns لاستخراج الأسعار والأسماء والصور
- يدعم عملات متعددة (EGP, LE, SR, SAR, AED, USD, $, £, €)

### 2. تحديث Backend
تم تحديث `/supabase/functions/server/index.tsx`:
- إضافة `import { fetchProductsFromURL } from "./scraper.tsx"`
- استبدال `fetchFromURL` بـ `fetchProductsFromURL` في وظيفة `processImport`

## كيفية الاستخدام

### استيراد من متجر Shopify
\`\`\`typescript
// في صفحة استيراد المنتجات
await productsApi.importStart({
  merchantId: 'merchant-id',
  sourceType: 'website',
  sourceData: {
    url: 'https://asilieg.com/collections/all'
  },
  options: {
    updateExisting: false,
    autoSync: false
  }
});
\`\`\`

### المواقع المدعومة
1. **Shopify** (يستخدم JSON API - أسرع وأدق):
   - `https://store.com/collections/all`
   - `https://store.com/collections/{category}`
   - `https://store.com/products.json`

2. **مواقع أخرى** (HTML Scraping):
   - أي موقع يعرض منتجات مع أسعار

## البيانات المستخرجة

### من Shopify JSON API:
- ✅ الاسم (product.title)
- ✅ الوصف (product.body_html - منظف من HTML)
- ✅ السعر (variant.price)
- ✅ الصورة (images[0].src)
- ✅ الفئة (product.product_type)
- ✅ رابط المنتج (handle)
- ✅ البراند (product.vendor)
- ✅ المخزون (variant.inventory_quantity)

### من HTML Scraping:
- ✅ الاسم (من titles, alt text)
- ✅ السعر (من patterns)
- ✅ الصورة (من img src, data-src)
- ⚠️ الوصف (نفس الاسم)
- ⚠️ الفئة (fashion افتراضياً)

## التحسينات
1. **أداء أفضل**: JSON API أسرع من HTML parsing
2. **دقة أعلى**: بيانات منظمة بدلاً من regex patterns
3. **معلومات أكثر**: Shopify JSON يوفر معلومات إضافية (vendor, product_type, etc.)
4. **استقرار أكبر**: لا يتأثر بتغييرات في HTML structure

## الاختبار
جرّب الآن استيراد المنتجات من:
- https://asilieg.com/collections/all
- https://asilieg.com/collections/women
- https://asilieg.com/collections/men

يجب أن ترى المنتجات تُستورد بنجاح! 🎉

## ملاحظات
- النظام يحاول Shopify JSON API أولاً دائماً
- إذا فشل، يستخدم HTML scraping كـ fallback
- يدعم جميع متاجر Shopify (سواء كانت hosted أو custom domain)
- ينظف HTML entities من الأوصاف (nbsp, amp, quot, etc.)
