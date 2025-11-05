# My Store Page Guide 🏪

## Overview
The new "My Store" page (MyStore.tsx) provides an advanced and professional experience for merchants managing their stores on the Outfred platform.

## Key Features ✨

### 1. Glassmorphic UI Design
- Modern design inspired by Relume.io
- Glass-effect transparency on all elements
- Smooth transitions and professional animations
- Gradient backgrounds and hover effects

### 2. Advanced Analytics Dashboard 📊

**Main Statistics Cards:**
- Total Products with active product count
- Real Page Views from database
- Estimated Orders
- Estimated Revenue

**Interactive Charts:**
- Daily Views (Area Chart)
- Orders & Revenue (Bar Chart)
- Sales Growth (Line Chart)
- Category Distribution with percentages

**Quick Stats:**
- Average Price
- Total Categories
- Conversion Rate

### 3. Complete Product Management 📦

**Display:**
- All products with images
- Interactive cards with hover effects
- Detailed information (price, category, status)

**Editing:**
- Inline product editing without navigation
- Quick save changes
- Easy cancel editing

**Actions:**
- View product details
- Edit product
- Delete product with confirmation
- Refresh list

### 4. Store Information Management 🏪

**Available Fields:**
- Store Name
- Description
- Address
- Phone Number
- Email
- Website
- Working Hours

**Features:**
- Read/Edit mode toggle
- Save changes with one click
- Organized data display

### 5. Showroom Management 📍

**Adding:**
- Dialog popup for new showroom
- Fields: Name, Location, Start/End Date, Hours, Map URL

**Display:**
- Attractive cards for each showroom
- Complete information with icons
- Map link

**Management:**
- Delete showrooms
- Update information

### 6. Advanced Analytics 📈

**Performance Metrics:**
- View Rate (Views per Product)
- Conversion Rate
- Unique Visitors
- Average Order Value

**Charts:**
- Weekly Sales Growth
- Store Activity
- Performance Comparison

### 7. Quick Tools ⚡

**Quick Actions:**
- Copy store link
- Preview store
- Import products
- Go to account

**Status:**
- Display store status (Approved/Pending/Rejected)
- Colored badge based on status

## Navigation 🔄

### Access the Page:
1. From main menu: "🏪 My Store" button
2. From Account page: "Store Dashboard" button
3. Direct: `/#my-store`

### Navigate From It:
- Account
- Import Products
- Product Details
- Merchant Store Preview

## Technical Features 🔧

### Auto Loading:
- Load merchant data
- Load products
- Load page view statistics
- Generate chart data

### Real-time Updates:
- Update statistics on product changes
- Auto-update charts
- Save changes to database

### RTL Support:
- Full Arabic support
- UI flip
- Correct text alignment

## API Endpoints Used 🌐

### Merchants API:
- `merchantsApi.list()` - List merchants
- `merchantsApi.update(id, data)` - Update store data

### Products API:
- `productsApi.list(userId)` - List products
- `productsApi.update(id, data)` - Update product
- `productsApi.delete(id)` - Delete product

### Statistics API:
- `/merchant-page-views/{merchantId}` - Page view statistics

## Components Used 🧩

### From Shadcn/UI:
- Card, Button, Input, Tabs, Dialog, Badge, ScrollArea, Alert, Separator, Switch

### From Recharts:
- AreaChart, BarChart, LineChart, Tooltip, Legend

### From Lucide React:
- 30+ icons for the interface

### From Motion (Framer Motion):
- Appear animations
- Hover effects
- Smooth transitions

## Main Sections 📑

### 1. Overview
- 4 main statistics cards
- 2 large charts
- Category distribution
- 3 quick stats cards

### 2. Products
- All products list
- Inline editing
- Action buttons
- Add/Import button

### 3. Store Info
- All store information
- Read/Edit mode
- Save changes

### 4. Showrooms
- Showroom list
- Add new showroom
- Delete showrooms

### 5. Analytics
- Advanced charts
- Performance metrics
- Store activity

## Special States 🎯

### Unauthorized User:
- "Unauthorized" message
- Back to home button

### No Products:
- Welcome message
- Import products button

### No Showrooms:
- Explanatory message
- Encourage addition

### Loading:
- Spinner indicator
- Clear messages

## Messages & Alerts 💬

### Success:
- ✅ Store updated successfully
- ✅ Product updated
- ✅ Product deleted
- ✅ Showroom added
- ✅ Link copied

### Error:
- ❌ Failed to load store data
- ❌ Update failed
- ❌ Delete failed

### Confirmation:
- ⚠️ Delete this product?
- ⚠️ Delete this showroom?

## Usage Tips 💡

1. **Regular Updates**: Use "Refresh" button for latest data
2. **Auto Save**: Changes save immediately on "Save" click
3. **Preview**: Use "Preview Store" to see customer view
4. **Link**: Copy and share store link with customers
5. **Statistics**: Monitor stats regularly to understand performance

## Summary 📋

The new "My Store" page provides:
- ✅ Professional glassmorphic design
- ✅ Complete product management
- ✅ Advanced analytics and charts
- ✅ Store and showroom management
- ✅ Full Arabic and English support
- ✅ Smooth animations
- ✅ Fully responsive

The page is now ready to use and fully connected with Backend and authentication system! 🎉

## Access Instructions

1. **Login as Merchant**: Use merchant credentials
2. **Navigate**: Click "🏪 My Store" in the header
3. **Alternative**: Go to Account page and click "Store Dashboard"
4. **Direct URL**: Navigate to `/#my-store`

## File Location
- Main Component: `/pages/MyStore.tsx`
- Route: Added to `/App.tsx`
- Header Link: Updated in `/components/Header.tsx`
- Account Link: Updated in `/pages/Account.tsx`

Enjoy managing your store! 🎉
