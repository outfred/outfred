# 🏪 How to Create a Store in Outfred

## Method 1: From "My Store" Page ⭐ (Easiest)

### Steps:

1. **Login** as a merchant (or create new account with "merchant" role)

2. **Go to "My Store"** via:
   - From Header: **My Store / متجري**
   - Direct link: `/#my-store`

3. **You'll see "No Store Found" message**

4. **Click "Create Store Now" button**
   - You'll be redirected automatically to application page

5. **Fill the form:**
   - ✅ Name (required)
   - ✅ Brand Name (required)
   - ✅ Email (auto-filled from your account)
   - Phone (optional)
   - Website (optional)
   - Logo (URL optional)
   - Description (optional)

6. **Click "Submit Application"**

7. **Wait for admin approval**

8. **After approval → ✅ Return to "My Store"**

---

## Method 2: Directly from "Join as Merchant" Page

### Steps:

1. **Go to "Join as Merchant":**
   - Direct link: `/#join`
   - Or from Header (if available)

2. **Fill the form** (same as Method 1)

3. **Click "Submit Application"**

4. **Wait for approval**

---

## Direct Links 🔗

Use these links for direct access:

- **My Store:** `/#my-store`
- **Join as Merchant:** `/#join`
- **Import Products:** `/#import`
- **Admin Panel:** `/#admin`

---

## What Happens After Submission? 📋

### 1. "Pending" Status
\`\`\`
✅ Store created
✅ Linked to your account
⏳ Waiting for admin approval
❌ Can't add products yet
\`\`\`

### 2. "Approved" Status
\`\`\`
✅ Store approved
✅ Can access "My Store"
✅ Can import products
✅ Full store management
\`\`\`

### 3. "Rejected" Status
\`\`\`
❌ Application rejected
💡 Contact admin for reason
🔄 Can reapply
\`\`\`

---

## How Does Admin Approve? 👑

### For Admin:

1. **Login** as admin
   - Email: `admin@outfred.com`
   - Password: `admin123`

2. **Go to Admin Panel:** `/#admin`

3. **Select "Merchants" section**

4. **Find store** in "Pending Merchants" list

5. **Click "Approve" button** ✅

6. ✅ **Done! Merchant can now use their store**

---

## Check Store Status 🔍

### Method 1: From "My Store"

Go to **"My Store" > "Analytics"** and find "Diagnostic Info" panel:

\`\`\`
Diagnostic Info:
├── Email: your@email.com
├── User ID: abc123...
├── Merchant ID: xyz789...  ← Present = Store exists
└── Store Status: pending/approved/rejected
\`\`\`

### Method 2: From Console (F12)

Open Console and look for:
\`\`\`
✅ Found merchant: { id: "xyz", status: "approved" }
\`\`\`

Or

\`\`\`
⚠️ No merchant found for this user
\`\`\`

---

## Troubleshooting 🛠️

### Problem: "Button doesn't work"

**Solutions:**
1. Make sure you're logged in
2. Make sure your role is "merchant" not "user"
3. Try refreshing (F5)
4. Try direct link: `/#join`

### Problem: "Form won't submit"

**Solutions:**
1. Fill all required fields (*)
2. Open Console (F12) to see errors
3. Check internet connection
4. Try again later

### Problem: "Submitted but store doesn't appear"

**Reason:** Store is in "pending" status

**Solution:** Wait for admin approval

**To verify:**
1. Go to Console
2. Look for: `status: "pending"`
3. This means store is awaiting approval

---

## Important Tips 💡

### 1. Email
- Auto-filled from your account
- **Important:** Used to link store to your account
- Don't change unless you're sure

### 2. Brand Name
- This is what customers will see
- Choose clear and distinctive name
- Can be changed later from "My Store"

### 3. Description
- Write attractive description for your store
- Will appear in public store page
- Helps customers learn more about you

### 4. Logo
- Enter URL link for logo
- Prefer high-quality images
- Can use services like Imgur to upload images

---

## After Creating Store 🎉

Once your store is approved:

### 1. Add Products
- Go to **"Import"** (`/#import`)
- Import from CSV, website, or API

### 2. Manage Store
- From **"My Store"** (`/#my-store`) you can:
  - ✅ Edit store info
  - ✅ Manage products
  - ✅ Add showrooms
  - ✅ Monitor statistics

### 3. Share Store Link
- From "My Store" > "Copy Store Link" button
- Share link with your customers

---

## Quick Summary ⚡

\`\`\`
1. Login → /#my-store
2. Click "Create Store"
3. Fill form
4. Submit
5. Wait for approval
6. ✅ Enjoy your store!
\`\`\`

**Expected Time:** 5 minutes (excluding approval time)

---

## Support 🆘

If you face any issues:

1. **Open Console** (F12) and copy errors
2. **Check guides:**
   - [Fix: No Merchant Found](/MERCHANT_NOT_FOUND_FIX_EN.md)
   - [My Store Guide](/MY_STORE_GUIDE.md)
   - [Troubleshooting](/TROUBLESHOOTING.md)

3. **Use Debug Panel:** `/#debug`

---

**🎯 We wish you a great experience with Outfred!**
