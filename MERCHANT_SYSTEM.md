# 🏪 Merchant System - Outfred

## Overview
The merchant system allows users to manage their online stores and products through the platform.

## How It Works

### 1. Merchant Application
Users can apply to become merchants through the "Join as Merchant" page. Applications are submitted with:
- Brand name
- Contact information
- Store description
- Website (optional)

### 2. Admin Approval
Admins review merchant applications in the Admin Panel:
- **Pending**: New applications awaiting review
- **Approved**: Merchants can access their dashboard
- **Rejected**: Applications that were declined

### 3. Linking Merchants to Users
Admins can link merchant stores to user accounts:
- In Admin Panel → Merchants tab
- Edit merchant or create new merchant
- Select user from dropdown in "Link to User" field
- The `userId` field connects the merchant to the user

### 4. Merchant Dashboard
Once approved and linked, merchants can:
- Access their dashboard from Account page
- View store information
- Add/Edit/Delete products
- Upload product images
- Set prices and categories

## Database Structure

### Merchant Object
\`\`\`typescript
{
  id: string,
  userId: string | null,  // Links to user account
  brandName: string,
  name: string,
  email: string,
  phone: string,
  website: string,
  description: string,
  logo: string,
  status: 'pending' | 'approved' | 'rejected',
  createdAt: string,
  approvedAt: string,
  products: []
}
\`\`\`

### Product Object
\`\`\`typescript
{
  id: string,
  merchantId: string,  // Links to merchant
  name: string,
  description: string,
  price: number,
  category: string,
  images: string[],
  createdAt: string,
  updatedAt: string
}
\`\`\`

## API Endpoints

### Merchant Endpoints
- `GET /merchants/my-store` - Get current user's merchant store
- `POST /admin/merchants` - Create merchant (admin only)
- `PUT /admin/merchants/:id` - Update merchant (admin only)
- `POST /merchants/approve/:id` - Approve merchant (admin only)
- `POST /merchants/reject/:id` - Reject merchant (admin only)
- `DELETE /merchants/delete/:id` - Delete merchant (admin only)

### Product Endpoints
- `GET /products/list` - Get all products (with optional merchantId filter)
- `GET /products/my-products` - Get current user's merchant products
- `POST /products/create` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `POST /products/import` - Import products from URL (simulated)

## Permission System

### Admin
- Full access to all merchants and products
- Can create/edit/delete any merchant or product
- Can link merchants to users
- Can approve/reject applications

### Merchant (with approved store)
- Can view/edit their own store information
- Can create/edit/delete their own products
- Cannot access other merchants' data

### Regular User
- Can browse products
- Can view merchant stores
- Can apply to become a merchant

## Product Import Feature

Merchants and admins can import products:
1. Click "Import Products" in Admin Panel → Products tab
2. Select merchant store
3. Enter website URL
4. Specify number of products to import
5. System simulates scraping and creates demo products

## Account Page Views

### For Regular Users
- Profile information
- Settings
- Favorites
- Merchant application status (if pending)

### For Merchants with Approved Store
- Store information card
- Account information card
- Product management section with:
  - Add new product
  - Edit existing products
  - Delete products
  - View product images and details

## Admin Panel Features

### Users Tab
- Create new users
- Edit user details (name, email, role, password)
- Delete users
- Assign roles: user, merchant, admin

### Merchants Tab
- View all merchants
- Create new merchant stores
- Edit merchant information
- Link merchants to users
- Approve/Reject pending applications
- Delete merchants

### Products Tab
- View all products across all merchants
- Create new products
- Edit product details
- Delete products
- Import products (simulated)
- Filter by merchant

## Demo Setup

The system includes demo data:
- **Admin User**: admin@outfred.com / admin123
- **Merchant User**: merchant@outfred.com / merchant123
  - Linked to "Urban Threads" store
  - Store status: approved
  - Can manage products immediately

## Notes

⚠️ **Important**: When a user is assigned merchant role, they need to:
1. Have a merchant store created by admin
2. The merchant store must be linked to their user ID
3. The merchant status must be "approved"
4. Only then they can access the merchant dashboard

💡 **Tip**: Use the Admin Panel to quickly create and link merchants to users for testing
