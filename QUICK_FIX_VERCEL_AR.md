# ⚡ حل سريع لخطأ Vercel

<div dir="rtl">

## ❌ الخطأ:
\`\`\`
Invalid package name "My Store"
\`\`\`

## ✅ الحل (خطوتين فقط):

### 1️⃣ في Vercel Dashboard:
\`\`\`
Settings → General → Clear Cache
\`\`\`

### 2️⃣ اعمل Redeploy:
\`\`\`
Deployments → ⋯ → Redeploy
(فك تفعيل "Use existing Build Cache")
\`\`\`

---

## أو من Terminal:

\`\`\`bash
# امسح node_modules
rm -rf node_modules package-lock.json

# ارفع التحديثات
git add .
git commit -m "fix: package.json cleanup"
git push origin main
\`\`\`

---

**تم إصلاح الملفات - جرب النشر الآن! 🚀**

اقرأ التفاصيل في: [VERCEL_DEPLOYMENT_FIX.md](./VERCEL_DEPLOYMENT_FIX.md)

</div>
