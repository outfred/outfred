# ⚡ Quick Test - Product Import System

## 🧪 5-Minute Test Guide

### Step 1: Login (30 seconds)
1. Go to `/#login`
2. Login with:
   \`\`\`
   Email: admin@outfred.com
   Password: admin123
   \`\`\`
3. Should redirect to home page

---

### Step 2: Navigate to Import Page (10 seconds)
1. Click **🔌 استيراد** (or **🔌 Import**) in the top menu
2. Should see the import wizard interface

---

### Step 3: Test CSV Import (2 minutes)

#### Option A: Use Sample File
1. Download `/examples/sample-products.csv`
2. Select a merchant from dropdown
3. Choose **CSV / Excel** method
4. Upload the sample file
5. Enable "Update existing products"
6. Click **Start Import**

#### Option B: Copy-Paste CSV
Create a text file with this content:
\`\`\`csv
name,price,color,sizes,category,stock
Test Black Hoodie,650,black,M|L|XL,hoodies,50
Test White T-Shirt,299,white,S|M|L,t-shirts,100
Test Blue Jeans,749,blue,28|30|32,pants,75
\`\`\`

---

### Step 4: Monitor Progress (30 seconds)
Watch the real-time statistics:
- ✅ **Total**: Should show 3 (or 20 if using sample file)
- ✅ **Added**: Should increment as products are imported
- ✅ **Logs**: Should show messages like "✅ Added: Test Black Hoodie"

---

### Step 5: Check Results (30 seconds)
1. Wait for status to change to "Completed"
2. Review final statistics
3. Go to **Import History** tab
4. Should see your import session with all details

---

### Step 6: Verify Products (1 minute)
1. Go to Admin Panel (`/#admin`)
2. Click on **Products** tab
3. Click **Load Products**
4. Should see the imported products in the list

---

## ✅ Expected Results

### After CSV Import (3 products)
\`\`\`
✅ Total: 3
✅ Added: 3
🔄 Updated: 0
🔁 Duplicates: 0
❌ Failed: 0
⏱️ Duration: ~5 seconds
\`\`\`

### After Sample File Import (20 products)
\`\`\`
✅ Total: 20
✅ Added: 20
🔄 Updated: 0
🔁 Duplicates: 0
❌ Failed: 0
⏱️ Duration: ~15 seconds
\`\`\`

---

## 🧪 Test Website Scraper

1. Select **Website** method
2. Enter URL: `https://www.example.com/products`
3. Click **Start Import**
4. Should show demo scraped products (2 products)

**Expected:**
\`\`\`
✅ Total: 2
✅ Added: 2
\`\`\`

---

## 🧪 Test Duplicate Detection

### Run Import Twice
1. Import the same CSV file twice
2. First import should add products
3. Second import should detect duplicates

**Expected Results:**

**First Import:**
\`\`\`
✅ Added: 3
🔁 Duplicates: 0
\`\`\`

**Second Import (without "Update Existing"):**
\`\`\`
✅ Added: 0
🔁 Duplicates: 3
\`\`\`

**Second Import (with "Update Existing"):**
\`\`\`
✅ Added: 0
🔄 Updated: 3
🔁 Duplicates: 0
\`\`\`

---

## 🔍 Test Import History

1. Go to **Import History** tab
2. Should see all your import sessions
3. Click on a session to expand details
4. Try deleting an old session

---

## 🐛 Troubleshooting

### Error: "Unauthorized"
**Fix:** Make sure you're logged in. Go to `/#debug` and use Quick Login.

### Error: "Merchant not found"
**Fix:** Make sure you selected a merchant from the dropdown.

### No merchants in dropdown
**Fix:** 
1. Go to `/#admin`
2. Go to Merchants tab
3. Approve at least one merchant
4. Go back to import page

### Import stuck at "Processing"
**Fix:** Refresh the page and check Import History tab.

---

## 📊 Success Criteria

✅ Can login successfully  
✅ Import page loads  
✅ CSV upload works  
✅ Real-time progress shows  
✅ Import completes successfully  
✅ Products appear in admin panel  
✅ Import history is saved  
✅ Duplicate detection works  

---

## 🎯 Advanced Tests

### Test 1: Large CSV
Import 100+ products and check performance

### Test 2: Invalid CSV
Try importing invalid CSV and check error handling

### Test 3: Empty CSV
Import empty CSV and verify appropriate error

### Test 4: Special Characters
Test Arabic product names and special characters

### Test 5: Long Product Names
Test with very long product names (>200 characters)

---

## 📝 Console Logs to Check

Open browser console and look for:

**During Import:**
\`\`\`
📡 Fetching products from source...
Found 3 products
✅ Added: Test Black Hoodie
✅ Added: Test White T-Shirt
✅ Added: Test Blue Jeans
✅ Import completed
\`\`\`

**API Calls:**
\`\`\`
📡 API Call: POST /products/import/start
✅ API Success
📡 API Call: GET /products/import/status/import_xxx
✅ API Success
\`\`\`

---

## 🚀 Performance Benchmarks

| Products | Expected Time | Status |
|----------|--------------|--------|
| 1-10 | < 10 seconds | ⚡ Fast |
| 11-50 | < 30 seconds | ✅ Good |
| 51-100 | < 60 seconds | 👍 Acceptable |
| 100+ | < 2 minutes | 📊 Normal |

---

## 📸 Screenshots Checklist

If documenting, capture:
- [ ] Import wizard interface
- [ ] Source selection cards
- [ ] Upload area with file
- [ ] Real-time progress view
- [ ] Completed import stats
- [ ] Import history list
- [ ] Imported products in admin

---

## 🎉 Test Complete!

If all tests pass, the Product Import System is working perfectly! 🚀

**Next Steps:**
- Read full documentation: [PRODUCT_IMPORT_SYSTEM.md](./PRODUCT_IMPORT_SYSTEM.md)
- Check API reference: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Explore sample file: [sample-products.csv](./examples/sample-products.csv)

---

**Happy Testing! 🧪**
