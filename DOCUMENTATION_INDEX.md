# 📚 Outfred Documentation Index

## 🗂️ Table of Contents

### 🏠 General Documentation
1. [README - Main Overview](./README_OUTFRED.md)
2. [Guidelines](./guidelines/Guidelines.md)
3. [Attributions](./Attributions.md)

---

### 🔐 Authentication & Security
1. [Authentication Notes](./AUTHENTICATION_NOTES.md)
2. [Auth Fix Guide](./AUTH_FIX_GUIDE.md)
3. [Troubleshooting](./TROUBLESHOOTING.md)

---

### 👥 User Management
1. [User Management Guide](./USER_MANAGEMENT_GUIDE.md)
2. [إدارة المستخدمين (Arabic)](./إدارة_المستخدمين.md)
3. [How to Copy User ID](./كيفية_نسخ_UserID.md)

---

### 🏪 Merchant System
1. [Merchant System Overview](./MERCHANT_SYSTEM.md)
2. [Merchant Dashboard Guide (AR/EN)](./MERCHANT_DASHBOARD_GUIDE.md) ⭐ **NEW!**
3. [Account & Merchant Update](./ACCOUNT_AND_MERCHANT_UPDATE.md) 🆕
4. [Admin Features](./ADMIN_FEATURES.md)

---

### 🔌 Product Import System (NEW!)

#### 📖 Main Documentation
1. **[Product Import System - Complete Guide](./PRODUCT_IMPORT_SYSTEM.md)** ⭐
   - Overview and features
   - Technical architecture
   - Backend pipeline
   - Data models
   - Security
   - Examples (Arabic/English)

2. **[Import System - Quick Start (English)](./IMPORT_SYSTEM_EN.md)** 🚀
   - Quick start guide
   - How to use
   - CSV format
   - API reference
   - Troubleshooting

3. **[دليل استيراد المنتجات (Arabic)](./دليل_استيراد_المنتجات.md)** 🇸🇦
   - دليل سريع بالعربية
   - خطوات الاستخدام
   - أمثلة عملية
   - حل المشاكل

#### 🔧 Technical Documentation
4. **[API Documentation](./API_DOCUMENTATION.md)** 💻
   - Complete API reference
   - All endpoints
   - Request/response examples
   - Error handling
   - Code examples

5. **[Import Update Log](./IMPORT_UPDATE_LOG.md)** 📝
   - Version history
   - Features added
   - Files changed
   - Statistics

#### 🧪 Testing & Quick Guides
6. **[Quick Test Guide](./QUICK_TEST_IMPORT.md)** ⚡
   - 5-minute test guide
   - Step-by-step testing
   - Expected results
   - Troubleshooting

7. **[Latest Feature Announcement](./LATEST_FEATURE_IMPORT.md)** 🎉
   - What's new
   - Quick overview
   - How to get started

#### 📁 Examples
8. **[Sample Products CSV](./examples/sample-products.csv)** 📊
   - 20 sample products
   - Correct CSV format
   - Ready to import

---

### 🐛 Troubleshooting & Fixes
1. [Clipboard Fix](./CLIPBOARD_FIX.md)
2. [Errors Fixed](./ERRORS_FIXED.md)
3. [Quick Error Solutions (Arabic)](./حل_سريع_للأخطاء.md)

---

### 📋 Update Logs
1. [Update Log](./UPDATE_LOG.md)
2. [Latest Updates (Arabic)](./LATEST_UPDATES_AR.md)
3. [Import Update Log](./IMPORT_UPDATE_LOG.md)

---

### 👤 User Guides
1. [User Guide (Arabic)](./دليل_المستخدم.md)
2. [How to Copy User ID (Arabic)](./كيفية_نسخ_UserID.md)

---

## 🎯 Quick Access by Role

### 👨‍💼 For Merchants
**Getting Started:**
1. [Merchant Dashboard Guide](./MERCHANT_DASHBOARD_GUIDE.md) 🆕
2. [دليل استيراد المنتجات (Arabic)](./دليل_استيراد_المنتجات.md)
3. [Import System Quick Start](./IMPORT_SYSTEM_EN.md)
4. [Sample CSV File](./examples/sample-products.csv)

**Store Management:**
1. Access dashboard: `/#merchant-dashboard`
2. Manage products
3. Update store info
4. View statistics

**Testing:**
1. [Quick Test Guide](./QUICK_TEST_IMPORT.md)

---

### 👨‍💻 For Developers
**Technical Docs:**
1. [Product Import System - Complete](./PRODUCT_IMPORT_SYSTEM.md)
2. [API Documentation](./API_DOCUMENTATION.md)
3. [Authentication Notes](./AUTHENTICATION_NOTES.md)

**Architecture:**
1. [Backend: /supabase/functions/server/index.tsx](./supabase/functions/server/index.tsx)
2. [Frontend: /pages/MerchantImport.tsx](./pages/MerchantImport.tsx)
3. [API Utils: /utils/api.ts](./utils/api.ts)

---

### 🛡️ For Admins
**Management:**
1. [Admin Features](./ADMIN_FEATURES.md)
2. [User Management Guide](./USER_MANAGEMENT_GUIDE.md)
3. [Merchant System](./MERCHANT_SYSTEM.md)

**Monitoring:**
1. Debug Panel: `/#debug`
2. Admin Panel: `/#admin`

---

### 🧪 For Testers
**Testing Guides:**
1. [Quick Test Guide](./QUICK_TEST_IMPORT.md)
2. [Troubleshooting](./TROUBLESHOOTING.md)
3. [Sample Data](./examples/sample-products.csv)

---

## 📱 Page Routes

| Route | Page | Access |
|-------|------|--------|
| `/#home` | Homepage | Public |
| `/#merchants` | Merchant Directory | Public |
| `/#login` | Login | Public |
| `/#register` | Register | Public |
| `/#account` | User Account | User |
| `/#merchant-dashboard` | Merchant Dashboard | Merchant **NEW!** |
| `/#join` | Join as Merchant | Public |
| `/#import` | Product Import | Merchant/Admin |
| `/#admin` | Admin Panel | Admin |
| `/#debug` | Debug Panel | Dev/Admin |

---

## 🔌 API Endpoints Summary

### Authentication
\`\`\`
POST /auth/login
POST /auth/register
GET  /auth/me
\`\`\`

### Product Import (NEW!)
\`\`\`
GET    /products/import/connectors
POST   /products/import/start
GET    /products/import/status/:sessionId
GET    /products/import/history
DELETE /products/import/session/:sessionId
\`\`\`

### Products
\`\`\`
POST /products/search
POST /products/create
PUT  /products/update/:id
DELETE /products/delete/:id
GET  /products/list
\`\`\`

### Merchants
\`\`\`
POST   /merchants/create
GET    /merchants/list
POST   /merchants/approve/:id
POST   /merchants/reject/:id
DELETE /merchants/delete/:id
PUT    /merchants/update/:id
\`\`\`

### Admin
\`\`\`
GET    /admin/users
PUT    /admin/users/:id
DELETE /admin/users/:id
GET    /admin/settings
POST   /admin/settings
GET    /admin/analytics
\`\`\`

---

## 🎨 UI Components

### Used in Import System
- Card, Button, Input, Label
- Tabs, TabsList, TabsTrigger, TabsContent
- Badge, Progress, Alert, Separator, Switch
- Motion (animations)

### Available ShadCN Components
See full list in main [README](./README_OUTFRED.md)

---

## 🌍 Supported Languages

- **English** (en)
- **Arabic** (ar) with RTL support

---

## 📊 Statistics

### Documentation
- **25+** documentation files
- **8** import system specific docs
- **2,000+** lines of documentation
- **4** languages (EN, AR, Code, API)

### Code
- **1,334+** lines of new code
- **6** new API endpoints
- **3** new data models
- **10+** helper functions

---

## 🔍 Search by Topic

### Import System
- [Complete Guide](./PRODUCT_IMPORT_SYSTEM.md)
- [Quick Start](./IMPORT_SYSTEM_EN.md)
- [API Reference](./API_DOCUMENTATION.md)
- [Arabic Guide](./دليل_استيراد_المنتجات.md)

### Authentication
- [Auth Notes](./AUTHENTICATION_NOTES.md)
- [Auth Fix](./AUTH_FIX_GUIDE.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

### User Management
- [User Guide](./USER_MANAGEMENT_GUIDE.md)
- [Admin Features](./ADMIN_FEATURES.md)

### Troubleshooting
- [Main Guide](./TROUBLESHOOTING.md)
- [Clipboard Fix](./CLIPBOARD_FIX.md)
- [Quick Solutions (AR)](./حل_سريع_للأخطاء.md)

---

## 🆕 Latest Updates

**November 1, 2025 (Latest):**
- ✅ **Account Settings Dialog** - Password management & account control
- ✅ **Privacy Settings Dialog** - Comprehensive privacy controls
- ✅ **Merchant Dashboard** - Full store management system
- ✅ **Product Management** - Add/edit/delete products
- ✅ **Store Statistics** - View performance metrics
- ✅ **Bilingual Support** - Arabic & English throughout

See: [Account & Merchant Update](./ACCOUNT_AND_MERCHANT_UPDATE.md)

**November 2, 2025:**
- ✅ Complete Product Import System
- ✅ CSV/Website/API import methods
- ✅ Smart duplicate detection
- ✅ Real-time progress tracking
- ✅ Comprehensive documentation

See: [Latest Feature Announcement](./LATEST_FEATURE_IMPORT.md)

---

## 🎓 Learning Path

### For New Users
1. Read [README](./README_OUTFRED.md)
2. Follow [Quick Test](./QUICK_TEST_IMPORT.md)
3. Check [User Guide (AR)](./دليل_المستخدم.md)

### For Merchants
1. Read [Import Guide (AR)](./دليل_استيراد_المنتجات.md)
2. Try [Sample CSV](./examples/sample-products.csv)
3. Test with [Quick Guide](./QUICK_TEST_IMPORT.md)

### For Developers
1. Study [Product Import System](./PRODUCT_IMPORT_SYSTEM.md)
2. Review [API Documentation](./API_DOCUMENTATION.md)
3. Examine code in `/pages/MerchantImport.tsx`

---

## 📞 Support Resources

### Documentation
- All guides in this index
- Inline code comments
- API documentation

### Tools
- Debug Panel: `/#debug`
- Admin Panel: `/#admin`
- Console logs

### Test Data
- Demo account: `admin@outfred.com / admin123`
- Sample CSV: `/examples/sample-products.csv`

---

## 🏆 Best Practices

1. **Always check authentication** before accessing protected routes
2. **Use Debug Panel** for troubleshooting
3. **Read logs** in import history for debugging
4. **Test with small datasets** before bulk imports
5. **Enable update existing** to handle duplicates
6. **Review documentation** before implementing

---

## 📝 Contributing

When adding new features:
1. Update relevant documentation
2. Add examples if applicable
3. Update this index
4. Test thoroughly
5. Document API changes

---

## 🎉 Thank You!

Thank you for using Outfred! For questions or support, please consult the documentation or use the Debug Panel.

**Developed with 💜 by Outfred Team**

---

**Last Updated:** November 1, 2025  
**Version:** 1.1 (Merchant Dashboard & Account Settings)
