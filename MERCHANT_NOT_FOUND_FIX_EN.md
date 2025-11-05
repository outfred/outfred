# Fix: Merchant Not Found Error 🔧

## The Problem
\`\`\`
⚠️ No merchant ID found, cannot load products
⚠️ No merchant found for this user
\`\`\`

When opening "My Store" page (`/#my-store`), it shows "No Store Found".

## The Cause
The user hasn't created a store yet, or the store isn't linked to the current user.

---

## ✅ Quick Solution

### Method 1: Create New Store (Recommended)

#### Steps:

1. **Go to "My Store"** (`/#my-store`)
   - You'll see "No Store Found" message

2. **Click "Create Store Now" button**
   - You'll be redirected to "Join as Merchant" page

3. **Fill the Application Form**:
   - ✅ Name (required)
   - ✅ Brand Name (required)
   - ✅ Email (required - auto-filled)
   - Phone
   - Website
   - Logo (URL)
   - Description

4. **Click "Submit Application"**

5. **Wait for Approval**
   - Your application will be reviewed
   - After approval, you can access "My Store"

---

### Method 2: Link Existing Store (If you already have a store)

If you created a store before but it doesn't appear:

#### Check the Data:

1. **Open Console** (F12)
2. **Go to "My Store"**
3. **Look for messages**:
   \`\`\`
   🔍 Loading merchant data for user: your@email.com
   📦 Merchants response: {...}
   ✅ Found merchant: {...}  or  ⚠️ No merchant found
   \`\`\`

#### If merchant found but not linked:

Problem: Store exists but `contactEmail` or `userId` is different

**Solution:**
- Contact admin to link the store to your account
- Or create a new store

---

## 📋 Applied Fixes

### 1. In Server (`/supabase/functions/server/index.tsx`)

✅ **Added `userId` field** when creating merchant:
\`\`\`typescript
const merchant = {
  id: merchantId,
  name,
  brandName,
  contactEmail: email,  // ✅ Use contactEmail
  email,
  userId: userId || null,  // ✅ Save userId
  status: 'pending',
  // ...
};
\`\`\`

### 2. In "Join as Merchant" Page (`/pages/JoinMerchant.tsx`)

✅ **Send `userId` with request**:
\`\`\`typescript
const submitData = {
  ...formData,
  userId: user?.id || null,  // ✅ Send userId
};
\`\`\`

✅ **Auto-fill email**:
\`\`\`typescript
React.useEffect(() => {
  if (user?.email) {
    setFormData(prev => ({ ...prev, email: user.email }));
  }
}, [user]);
\`\`\`

### 3. In "My Store" Page (`/pages/MyStore.tsx`)

✅ **Show clear message** when no store found:
- Direct button to create store
- Display current account info
- Button to return home

---

## 🎯 Complete Scenario

### For New User:

1. **Register** an account
2. **Login** with account
3. **Go to "My Store"** (`/#my-store`)
4. **Click "Create Store Now"**
5. **Fill the form** (email will be auto-filled)
6. **Submit application**
7. **Wait for approval** from admin
8. **After approval** → ✅ Access "My Store"

### For User with Existing Store:

1. **Login** with same email used when creating store
2. **Go to "My Store"** (`/#my-store`)
3. ✅ Store will appear directly

---

## 🔍 Verify Linking

### How to know if store is linked to your account?

In "My Store" > "Analytics" > Diagnostic Panel:

\`\`\`
Diagnostic Info:
├── Email: your@email.com
├── User ID: abc123...
├── Merchant ID: xyz789...  ✅ If present = linked
└── Store Status: approved/pending
\`\`\`

If `Merchant ID` is not present → Store not linked

---

## ⚙️ For Developers: How Linking Works

### Linking Process:

1. **When creating store**:
   \`\`\`typescript
   {
     id: "merchant-xxx",
     contactEmail: "user@email.com",  // ✅ For linking
     userId: "user-yyy",               // ✅ For linking
     // ...
   }
   \`\`\`

2. **When searching for store**:
   \`\`\`typescript
   const merchant = merchants.find(m => 
     m.contactEmail === user?.email || 
     m.userId === user?.id
   );
   \`\`\`

3. **If found**:
   - ✅ Load merchant data
   - ✅ Load products
   - ✅ Display statistics

4. **If not found**:
   - ❌ Show "No Store Found" message
   - 💡 Show "Create Store" button

---

## 🆘 Troubleshooting

### Problem: "Store exists but doesn't appear"

**Possible Causes:**

1. **Different email**
   - Store registered with `merchant@email.com`
   - User logged in with `user@email.com`
   - **Solution:** Use same email

2. **Store not approved**
   - Status: `pending` or `rejected`
   - **Solution:** Wait for approval or contact admin

3. **No `userId` in store**
   - Old stores don't have `userId`
   - **Solution:** Create new store or ask admin to update data

---

## 📊 Before vs After Fix

### ❌ Before Fix:
\`\`\`typescript
// Store created without userId
{
  id: "merchant-xxx",
  contactEmail: "merchant@email.com",
  // ⚠️ userId: undefined
}

// Search fails if email is different
merchant.contactEmail !== user.email
// → ❌ No merchant found
\`\`\`

### ✅ After Fix:
\`\`\`typescript
// Store created with userId
{
  id: "merchant-xxx",
  contactEmail: "user@email.com",
  userId: "user-yyy"  // ✅ Linked
}

// Search succeeds with either method
merchant.contactEmail === user.email  // ✅
// or
merchant.userId === user.id          // ✅
// → ✅ Merchant found!
\`\`\`

---

## 📝 Important Notes

1. **Email**:
   - Auto-filled from user account
   - Used as primary linking field
   - Must match user email

2. **Store Status**:
   - `pending` → Under Review
   - `approved` → Approved ✅
   - `rejected` → Rejected ❌

3. **Approval**:
   - Admin approves from admin panel
   - After approval, merchant gets full access

4. **Products**:
   - Can't add products before approval
   - After approval, use "Import" page to add products

---

## ✨ Summary

**Problem:** Merchant not found

**Cause:** No store linked to account

**Solution:**
1. Go to "My Store"
2. Click "Create Store Now"
3. Fill the form
4. Wait for approval
5. ✅ Enjoy your store!

**Expected Time:** 5-10 minutes (excluding approval time)

**Result:** ✅ Store linked to your account and fully functional!

---

## 🔗 Related Links

- [My Store Guide](/MY_STORE_GUIDE.md)
- [Product Import Guide](/PRODUCT_IMPORT_SYSTEM.md)
- [Quick Fix: No Products](/QUICK_FIX_PRODUCTS_EN.md)
- [User Management Guide](/USER_MANAGEMENT_GUIDE.md)
