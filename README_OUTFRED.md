# 🎯 Outfred - Fashion Platform with AI-Powered Search

Welcome to **Outfred**, a modern fashion discovery platform built with React, Tailwind CSS, and Supabase.

## ✨ Features

### 🌐 Frontend Features
- **Bilingual Support** (Arabic/English) with instant language toggle
- **Glassmorphism Design** - Beautiful transparent UI inspired by modern design trends
- **Responsive Design** - Works seamlessly on all devices
- **Smooth Animations** - Powered by Motion (Framer Motion)

### 🔍 Smart Search
- Text-based search with autocorrect
- Image-based search capabilities
- AI-powered outfit generation
- Multilingual search support

### 👥 User Features
- User registration and authentication
- Personal account management
- Favorites and settings
- Merchant application system

### 🏪 Merchant Features
- Merchant application and approval system
- Product management
- Brand profile pages
- Easy integration
- **🔌 Product Import System** (NEW!)
  - Import from CSV/Excel files
  - Scrape products from websites
  - Connect via API (Shopify, WooCommerce, etc.)
  - Smart duplicate detection
  - Real-time progress tracking
  - Import history and management

### 🛡️ Admin Panel
- **Analytics Dashboard** - Track users, merchants, and products
- **User Management** - View and manage all users
- **Merchant Approval** - Approve/reject merchant applications
- **Product Management** - Oversee all products
- **Design Settings** - Customize platform appearance
- **Page Builder** - Create custom pages

## 🚀 Getting Started

### 🔐 Authentication System
This project uses a **custom token-based authentication** system. See [AUTHENTICATION_NOTES.md](./AUTHENTICATION_NOTES.md) for technical details.

### ⚠️ Important: First Time Setup

**If you encounter "Invalid credentials" error:**

1. **Open the Debug Panel** - Click "🔧 Debug" in the top menu
2. **Check Database Status** - Click "Check DB Status" button
3. **Reset Demo Data** - If no users found, click "Reset Demo Data"
4. **Test Login** - Click "Test Login" to verify everything works

For detailed troubleshooting steps, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Demo Accounts

**Admin Account:**
- **Email**: admin@outfred.com
- **Password**: admin123
- **Access**: Full admin panel with analytics, user management, and settings

**Note:** Currently only the admin account is available. Merchant and user accounts will be added in future updates.

### Demo Merchants
The platform comes with pre-loaded demo merchants:
1. **Urban Threads** (Approved) - Modern streetwear
2. **Desert Rose Fashion** (Approved) - Middle Eastern fashion
3. **Boutique Elegance** (Pending) - Luxury fashion

## 📁 Project Structure

\`\`\`
/
├── App.tsx                 # Main application component
├── components/
│   ├── Header.tsx          # Navigation header with language toggle
│   ├── Footer.tsx          # Footer with links and social media
│   └── ui/                 # Reusable UI components (shadcn)
├── pages/
│   ├── Home.tsx            # Landing page with search
│   ├── Merchants.tsx       # Browse merchants
│   ├── Account.tsx         # User account management
│   ├── JoinMerchant.tsx    # Merchant application form
│   ├── Auth.tsx            # Login/Register pages
│   ├── Admin.tsx           # Admin panel
│   └── StaticPages.tsx     # About, Privacy, Contact
├── contexts/
│   ├── LanguageContext.tsx # i18n language management
│   └── AuthContext.tsx     # Authentication state
├── utils/
│   └── api.ts              # API client functions
├── supabase/functions/server/
│   ├── index.tsx           # Main API server
│   ├── init.tsx            # Demo data initialization
│   └── kv_store.tsx        # Database utilities
└── styles/
    └── globals.css         # Global styles and theme
\`\`\`

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Merchants
- `POST /merchants/create` - Submit merchant application
- `GET /merchants/list` - List all merchants (with status filter)
- `POST /merchants/approve/:id` - Approve merchant (admin)
- `POST /merchants/reject/:id` - Reject merchant (admin)
- `DELETE /merchants/delete/:id` - Delete merchant (admin)

### Products
- `POST /products/search` - Smart search
- `POST /products/ai-search` - Image-based search
- `POST /products/outfit-generator` - AI outfit suggestions
- `POST /products/import` - Import products (merchant)

### Product Import System (NEW! 🔌)
- `GET /products/import/connectors` - Get available import sources
- `POST /products/import/start` - Start import session
- `GET /products/import/status/:sessionId` - Check import progress
- `GET /products/import/history` - Get import history
- `DELETE /products/import/session/:sessionId` - Delete import session

**Import Features:**
- 📁 CSV/Excel file upload
- 🌐 Website scraping
- 🔗 API integration (Shopify, WooCommerce)
- 🔍 Smart duplicate detection
- ⚡ Real-time progress tracking
- 📊 Import history and analytics

**Documentation:**
- Full guide: [PRODUCT_IMPORT_SYSTEM.md](./PRODUCT_IMPORT_SYSTEM.md)
- API reference: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- User guide (Arabic): [دليل_استيراد_المنتجات.md](./دليل_استيراد_المن��جات.md)
- Quick start: [IMPORT_SYSTEM_EN.md](./IMPORT_SYSTEM_EN.md)

### Admin
- `GET /admin/users` - Get all users
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/settings` - Get platform settings
- `POST /admin/settings` - Update platform settings
- `GET /admin/analytics` - Get analytics data

## 🎨 Design System

### Colors
- **Primary**: Indigo gradient (#6366f1)
- **Secondary**: Pink gradient (#ec4899)
- **Accent**: Purple (#a855f7)

### Components
- **Glassmorphism Cards** - Transparent with blur effect
- **Gradient Buttons** - Indigo to pink gradient
- **Smooth Animations** - Motion-based transitions
- **Responsive Layout** - Mobile-first approach

## 🌍 Internationalization

The platform supports:
- **Arabic (ar)** - RTL layout
- **English (en)** - LTR layout

Language toggle is available in the header for instant switching.

## 🔐 Security

- JWT-based authentication
- Password hashing (SHA-256)
- Admin-only routes protection
- CORS enabled for all routes
- Row-level security ready

## 📱 Pages

1. **Home** - Search and AI features
2. **Merchants** - Browse approved merchants
3. **Account** - User profile and settings
4. **Join as Merchant** - Application form
5. **Login/Register** - Authentication
6. **Admin Panel** - Platform management
7. **About** - Platform information
8. **Privacy** - Privacy policy
9. **Contact** - Contact form

## 🛠️ Technologies

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion (Framer Motion)** - Animations
- **Supabase** - Backend and database
- **Hono** - Server framework
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📝 Notes

- The platform uses Supabase KV Store for data persistence
- Demo data is initialized automatically on server start
- All API routes are prefixed with `/make-server-dec0bed9`
- The design is fully responsive and works on all screen sizes
- RTL support is built-in for Arabic language

## 🎯 Future Enhancements

- Image upload for visual search
- Advanced product filtering
- AI outfit recommendations based on user preferences
- Real-time chat support
- Mobile app (React Native)
- Advanced analytics dashboard
- Email notifications
- Social media integration

---

**Built with ❤️ using Figma Make**
