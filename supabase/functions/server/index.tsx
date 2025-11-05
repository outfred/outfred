import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { initDemoData } from "./init.tsx";
import { fetchProductsFromURL } from "./scraper.tsx";
import adminRoutes from "./routes_admin.tsx";

const app = new Hono();

// Initialize demo data on server start
initDemoData().catch(console.error);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
// X-Access-Token is our custom header for user authentication (not Supabase JWT)
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Access-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper: Generate unique ID
const generateId = () => crypto.randomUUID();

// Helper: Hash password
const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
};

// Helper: Verify password
const verifyPassword = async (password: string, hash: string) => {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
};

// Helper: Create simple token
const createToken = (userId: string) => {
  // Simple token: base64 encoded userId with timestamp
  const tokenData = JSON.stringify({ userId, timestamp: Date.now() });
  return btoa(tokenData);
};

// Helper: Verify token
const verifyToken = (token: string) => {
  try {
    const decoded = atob(token);
    const data = JSON.parse(decoded);
    console.log('🔍 Token data:', { userId: data.userId, age: Math.floor((Date.now() - data.timestamp) / 1000 / 60), unit: 'minutes' });
    
    // Token expires after 30 days
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - data.timestamp > thirtyDays) {
      console.log('❌ Token expired');
      return null;
    }
    return data.userId;
  } catch (error: any) {
    console.log('❌ Error verifying token:', error?.message);
    return null;
  }
};

// Helper: Authenticate user
// NOTE: We use X-Access-Token header instead of Authorization header
// because Supabase Edge Functions automatically validate JWT tokens in Authorization header,
// and our simple base64 token would fail that validation.
const authenticate = async (c: any) => {
  const accessToken = c.req.header('X-Access-Token');
  console.log('🔐 X-Access-Token header:', accessToken ? 'Present' : 'Missing');
  
  if (!accessToken) {
    console.log('❌ No access token found');
    return null;
  }
  
  console.log('🔑 Access token found, verifying...');
  const userId = verifyToken(accessToken);
  if (!userId) {
    console.log('❌ Invalid token');
    return null;
  }
  
  console.log('✅ Token valid, user ID:', userId);
  const userData = await kv.get(`user:${userId}`);
  if (!userData) {
    console.log('❌ User data not found for ID:', userId);
    return null;
  }
  
  console.log('✅ User authenticated:', userData.email);
  return { id: userId, ...userData };
};

// Health check endpoint
app.get("/make-server-dec0bed9/health", (c) => {
  return c.json({ status: "ok" });
});

// Reset demo data endpoint (for debugging)
app.post("/make-server-dec0bed9/reset-demo-data", async (c) => {
  try {
    console.log('🔄 Resetting demo data...');
    
    // Clear initialization flag
    await kv.del('system:initialized');
    
    // Re-initialize
    await initDemoData();
    
    return c.json({ 
      success: true, 
      message: 'Demo data reset successfully' 
    });
  } catch (error: any) {
    console.error('Error resetting demo data:', error);
    return c.json({ error: error?.message || 'Reset failed' }, 500);
  }
});

// Test authentication endpoint (for debugging)
app.get("/make-server-dec0bed9/test-auth", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ 
        authenticated: false, 
        message: 'Not authenticated' 
      }, 401);
    }
    
    return c.json({ 
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error: any) {
    console.error('Error testing auth:', error);
    return c.json({ error: error?.message || 'Auth test failed' }, 500);
  }
});

// Check database status endpoint (for debugging)
app.get("/make-server-dec0bed9/debug/db-status", async (c) => {
  try {
    console.log('📊 Checking database status...');
    
    const users = await kv.getByPrefix('user:');
    const merchants = await kv.getByPrefix('merchant:');
    const initialized = await kv.get('system:initialized');
    
    const validUsers = users.filter((u: any) => u && u.email);
    const validMerchants = merchants.filter((m: any) => m);
    
    const status = {
      initialized: !!initialized,
      totalUsers: users.length,
      validUsers: validUsers.length,
      totalMerchants: merchants.length,
      validMerchants: validMerchants.length,
      users: validUsers.map((u: any) => ({
        email: u.email,
        name: u.name,
        role: u.role
      })),
      merchants: validMerchants.map((m: any) => ({
        brandName: m.brandName,
        status: m.status
      }))
    };
    
    console.log('✅ Database status:', status);
    return c.json({ status });
  } catch (error: any) {
    console.error('❌ Error checking database status:', error);
    return c.json({ error: error?.message || 'DB status check failed' }, 500);
  }
});

// ======================
// AUTH ROUTES
// ======================

// Register new user
app.post("/make-server-dec0bed9/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role = 'user' } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields: email, password, name" }, 400);
    }

    // Check if user already exists
    // Note: kv.getByPrefix returns array of values directly, not {key, value} objects
    const existingUsers = await kv.getByPrefix('user:');
    const userExists = existingUsers.some((u: any) => u && u.email === email);
    
    if (userExists) {
      return c.json({ error: "User already exists" }, 400);
    }

    // Create user with simple ID
    const userId = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);
    
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      password: hashedPassword,
      name,
      role,
      subscription_plan: 'free',
      searches_count: 0,
      searches_limit: 5,
      subscription_expires_at: null,
      payment_status: 'none',
      last_search_reset: Date.now(),
      createdAt: new Date().toISOString(),
      favorites: [],
      settings: {}
    });

    // Create token
    const accessToken = createToken(userId);

    return c.json({ 
      success: true,
      accessToken,
      user: { id: userId, email, name, role }
    });
  } catch (error) {
    console.log('Error in register:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Login
app.post("/make-server-dec0bed9/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    console.log('🔐 Login attempt for:', email);

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return c.json({ error: "Missing email or password" }, 400);
    }

    // Find user by email
    // Note: kv.getByPrefix returns array of values directly, not {key, value} objects
    const allUsers = await kv.getByPrefix('user:');
    console.log('📊 Total users in DB:', allUsers.length);
    
    // Filter out invalid entries
    const validUsers = allUsers.filter((u: any) => u && u.email);
    console.log('✅ Valid users:', validUsers.length);
    
    // Log all available emails for debugging
    if (validUsers.length > 0) {
      console.log('📧 Available emails:', validUsers.map((u: any) => u.email).join(', '));
    } else {
      console.log('⚠️ No valid users found in database!');
      // Try to re-initialize demo data if no users exist
      console.log('🔄 Attempting to re-initialize demo data...');
      await kv.del('system:initialized');
      await initDemoData();
      
      // Try to get users again
      const retryUsers = await kv.getByPrefix('user:');
      const retryValidUsers = retryUsers.filter((u: any) => u && u.email);
      console.log('📊 After re-init - Valid users:', retryValidUsers.length);
      
      if (retryValidUsers.length > 0) {
        console.log('✅ Demo data re-initialized successfully');
      }
    }
    
    const userData = validUsers.find((u: any) => u.email === email);

    if (!userData) {
      console.log('❌ User not found:', email);
      const availableEmails = validUsers
        .map((u: any) => u.email)
        .filter(Boolean)
        .join(', ');
      console.log('Available users:', availableEmails || 'None');
      return c.json({ 
        error: "Invalid credentials. User not found.",
        debug: {
          attemptedEmail: email,
          availableUsers: availableEmails || 'No users in database'
        }
      }, 401);
    }
    console.log('✅ Found user:', userData.email, '| Role:', userData.role);

    // Verify password
    const isValid = await verifyPassword(password, userData.password);
    if (!isValid) {
      console.log('❌ Invalid password for:', email);
      return c.json({ error: "Invalid credentials. Incorrect password." }, 401);
    }

    console.log('✅ Password verified successfully');

    // Create token
    const accessToken = createToken(userData.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userData;

    console.log('✅ Login successful for:', email);

    return c.json({ 
      success: true,
      accessToken,
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('❌ Error in login - Full details:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return c.json({ error: `Login failed: ${error?.message || 'Unknown error'}` }, 500);
  }
});

// Get current user
app.get("/make-server-dec0bed9/auth/me", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword });
  } catch (error) {
    console.log('Error getting current user:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// ======================
// MERCHANTS ROUTES
// ======================

// Create merchant application
app.post("/make-server-dec0bed9/merchants/create", async (c) => {
  try {
    const body = await c.req.json();
    const { name, brandName, email, phone, website, description, logo, userId } = body;

    if (!name || !brandName || !email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const merchantId = generateId();
    const merchant = {
      id: merchantId,
      name,
      brandName,
      contactEmail: email, // Use contactEmail for consistency
      email, // Keep email for backwards compatibility
      phone,
      website,
      description,
      logo,
      userId: userId || null, // Store userId if provided
      status: 'pending',
      createdAt: new Date().toISOString(),
      products: [],
      address: '',
      workingHours: '9 AM - 9 PM',
      showrooms: []
    };

    await kv.set(`merchant:${merchantId}`, merchant);

    console.log('✅ Created merchant:', merchantId, 'for user:', userId, 'email:', email);

    return c.json({ success: true, merchant });
  } catch (error) {
    console.log('Error creating merchant:', error);
    return c.json({ error: 'Failed to create merchant application' }, 500);
  }
});

// List all merchants
app.get("/make-server-dec0bed9/merchants/list", async (c) => {
  try {
    const status = c.req.query('status'); // optional filter
    const merchants = await kv.getByPrefix('merchant:');
    
    let filteredMerchants = merchants.filter((m: any) => m);
    
    if (status) {
      filteredMerchants = filteredMerchants.filter((m: any) => m.status === status);
    }

    return c.json({ merchants: filteredMerchants });
  } catch (error) {
    console.log('Error listing merchants:', error);
    return c.json({ error: 'Failed to list merchants' }, 500);
  }
});

// Approve merchant (admin only)
app.post("/make-server-dec0bed9/merchants/approve/:id", async (c) => {
  try {
    console.log('🔐 Attempting to approve merchant...');
    const user = await authenticate(c);
    if (!user) {
      console.log('❌ No user authenticated');
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('✅ User authenticated:', user.id);
    const userData = await kv.get(`user:${user.id}`);
    console.log('👤 User role:', userData?.role);
    
    if (userData?.role !== 'admin') {
      console.log('❌ User is not admin');
      return c.json({ error: "Admin access required" }, 403);
    }

    const merchantId = c.req.param('id');
    console.log('🏪 Merchant ID:', merchantId);
    const merchant = await kv.get(`merchant:${merchantId}`);

    if (!merchant) {
      console.log('❌ Merchant not found');
      return c.json({ error: "Merchant not found" }, 404);
    }

    console.log('✅ Merchant found, approving...');
    merchant.status = 'approved';
    merchant.approvedAt = new Date().toISOString();
    
    await kv.set(`merchant:${merchantId}`, merchant);
    console.log('✅ Merchant approved successfully');

    return c.json({ success: true, merchant });
  } catch (error: any) {
    console.error('❌ Error approving merchant:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return c.json({ error: `Failed to approve merchant: ${error?.message}` }, 500);
  }
});

// Reject merchant (admin only)
app.post("/make-server-dec0bed9/merchants/reject/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const merchantId = c.req.param('id');
    const merchant = await kv.get(`merchant:${merchantId}`);

    if (!merchant) {
      return c.json({ error: "Merchant not found" }, 404);
    }

    merchant.status = 'rejected';
    merchant.rejectedAt = new Date().toISOString();
    
    await kv.set(`merchant:${merchantId}`, merchant);

    return c.json({ success: true, merchant });
  } catch (error) {
    console.log('Error rejecting merchant:', error);
    return c.json({ error: 'Failed to reject merchant' }, 500);
  }
});

// Delete merchant (admin only)
app.delete("/make-server-dec0bed9/merchants/delete/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const merchantId = c.req.param('id');
    await kv.del(`merchant:${merchantId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting merchant:', error);
    return c.json({ error: 'Failed to delete merchant' }, 500);
  }
});

// Update merchant (admin or merchant owner)
app.put("/make-server-dec0bed9/merchants/update/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    const merchantId = c.req.param('id');
    const merchant = await kv.get(`merchant:${merchantId}`);

    if (!merchant) {
      return c.json({ error: "Merchant not found" }, 404);
    }

    // Check if user is admin OR if user is the merchant owner
    const isAdmin = userData?.role === 'admin';
    const isMerchantOwner = 
      userData?.role === 'merchant' && 
      (merchant.userId === user.id || merchant.contactEmail === userData.email);

    if (!isAdmin && !isMerchantOwner) {
      console.log('❌ Access denied. Not admin or merchant owner.');
      return c.json({ error: "Access denied. Admin or merchant owner required." }, 403);
    }

    const body = await c.req.json();
    
    // If merchant is updating their own store, don't allow status change
    const updatedFields = { ...body };
    if (isMerchantOwner && !isAdmin) {
      delete updatedFields.status; // Only admin can change status
      delete updatedFields.userId; // Cannot change userId
    }

    const updatedMerchant = {
      ...merchant,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`merchant:${merchantId}`, updatedMerchant);

    console.log('✅ Merchant updated successfully:', merchantId);
    return c.json({ success: true, merchant: updatedMerchant });
  } catch (error: any) {
    console.error('❌ Error updating merchant:', error);
    return c.json({ error: `Failed to update merchant: ${error?.message}` }, 500);
  }
});

// Record merchant page view
app.post("/make-server-dec0bed9/merchant-page-view", async (c) => {
  try {
    const body = await c.req.json();
    const { merchantId } = body;

    if (!merchantId) {
      return c.json({ error: "Missing merchantId" }, 400);
    }

    // Get merchant
    const merchant = await kv.get(`merchant:${merchantId}`);
    if (!merchant) {
      return c.json({ error: "Merchant not found" }, 404);
    }

    // Update view count
    const viewCount = (merchant.pageViews || 0) + 1;
    merchant.pageViews = viewCount;
    merchant.lastViewedAt = new Date().toISOString();

    await kv.set(`merchant:${merchantId}`, merchant);

    return c.json({ success: true, views: viewCount });
  } catch (error) {
    console.log('Error recording merchant page view:', error);
    return c.json({ error: 'Failed to record page view' }, 500);
  }
});

// ======================
// PRODUCTS ROUTES
// ======================

// Create product (admin only)
app.post("/make-server-dec0bed9/products/create", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    const { name, description, price, category, merchantId, imageUrl, stock } = body;

    if (!name || !merchantId) {
      return c.json({ error: "Missing required fields: name, merchantId" }, 400);
    }

    const productId = generateId();
    const product = {
      id: productId,
      name,
      description,
      price: parseFloat(price) || 0,
      category,
      merchantId,
      imageUrl,
      stock: parseInt(stock) || 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`product:${productId}`, product);

    return c.json({ success: true, product });
  } catch (error) {
    console.log('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

// Update product (admin or merchant owner)
app.put("/make-server-dec0bed9/products/update/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    // Check if user is admin OR if user is merchant and owns this product
    const isAdmin = userData?.role === 'admin';
    const isMerchantOwner = userData?.role === 'merchant' && product.merchantId;
    
    if (!isAdmin && !isMerchantOwner) {
      return c.json({ error: "Access denied. Admin or product owner required." }, 403);
    }

    // For merchants, verify they own the product via merchant record
    if (!isAdmin && isMerchantOwner) {
      const merchants = await kv.getByPrefix('merchant:');
      const merchantRecord = merchants.find((m: any) => 
        m && m.id === product.merchantId && 
        (m.userId === user.id || m.contactEmail === userData.email)
      );
      
      if (!merchantRecord) {
        console.log('❌ Merchant does not own this product');
        return c.json({ error: "You don't have permission to edit this product" }, 403);
      }
    }

    const body = await c.req.json();
    const updatedProduct = {
      ...product,
      ...body,
      price: body.price !== undefined ? parseFloat(body.price) : product.price,
      stock: body.stock !== undefined ? parseInt(body.stock) : product.stock,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`product:${productId}`, updatedProduct);

    console.log('✅ Product updated successfully:', productId);
    return c.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error('❌ Error updating product:', error);
    return c.json({ error: `Failed to update product: ${error?.message}` }, 500);
  }
});

// Delete product (admin or merchant owner)
app.delete("/make-server-dec0bed9/products/delete/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    // Check if user is admin OR if user is merchant and owns this product
    const isAdmin = userData?.role === 'admin';
    const isMerchantOwner = userData?.role === 'merchant' && product.merchantId;
    
    if (!isAdmin && !isMerchantOwner) {
      return c.json({ error: "Access denied. Admin or product owner required." }, 403);
    }

    // For merchants, verify they own the product
    if (!isAdmin && isMerchantOwner) {
      const merchants = await kv.getByPrefix('merchant:');
      const merchantRecord = merchants.find((m: any) => 
        m && m.id === product.merchantId && 
        (m.userId === user.id || m.contactEmail === userData.email)
      );
      
      if (!merchantRecord) {
        return c.json({ error: "You don't have permission to delete this product" }, 403);
      }
    }

    await kv.del(`product:${productId}`);

    console.log('✅ Product deleted successfully:', productId);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('❌ Error deleting product:', error);
    return c.json({ error: `Failed to delete product: ${error?.message}` }, 500);
  }
});

// List all products
app.get("/make-server-dec0bed9/products/list", async (c) => {
  try {
    const merchantId = c.req.query('merchantId'); // optional filter
    const products = await kv.getByPrefix('product:');
    
    let filteredProducts = products.filter((p: any) => p);
    
    if (merchantId) {
      filteredProducts = filteredProducts.filter((p: any) => p.merchantId === merchantId);
    }

    return c.json({ products: filteredProducts });
  } catch (error) {
    console.log('Error listing products:', error);
    return c.json({ error: 'Failed to list products' }, 500);
  }
});

// Import products (scraper simulation)
app.post("/make-server-dec0bed9/products/import", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { merchantId, url } = body;

    if (!merchantId || !url) {
      return c.json({ error: "Missing merchantId or url" }, 400);
    }

    // Simulate scraper - in real app, this would scrape the website
    // For now, we'll just return a message
    return c.json({ 
      success: true, 
      message: "Product import feature - would scrape products from URL",
      merchantId,
      url
    });
  } catch (error) {
    console.log('Error importing products:', error);
    return c.json({ error: 'Failed to import products' }, 500);
  }
});

// Search products (smart search with rate limiting)
app.post("/make-server-dec0bed9/products/search", async (c) => {
  try {
    const body = await c.req.json();
    const { query, language = 'en' } = body;

    if (!query) {
      return c.json({ error: "Missing search query" }, 400);
    }

    // Check if user is authenticated for rate limiting
    const user = await authenticate(c);
    if (user) {
      const userData = await kv.get(`user:${user.id}`);
      
      if (userData) {
        const now = Date.now();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        
        // Check if subscription is expired and downgrade to free
        if (userData.subscription_expires_at && userData.subscription_expires_at < now) {
          console.log('⚠️ Subscription expired, downgrading to free plan');
          userData.subscription_plan = 'free';
          userData.searches_limit = 5;
          userData.subscription_expires_at = null;
          userData.payment_status = 'expired';
        }
        
        // Check if monthly reset is needed
        const timeSinceReset = now - (userData.last_search_reset || now);
        if (timeSinceReset > thirtyDaysInMs) {
          console.log('🔄 Monthly reset - resetting search count');
          userData.searches_count = 0;
          userData.last_search_reset = now;
        }
        
        // Check if user has reached search limit
        if (userData.searches_count >= userData.searches_limit) {
          const errorMessage = language === 'ar' 
            ? 'لقد وصلت إلى حد البحث الشهري. يرجى الترقية للحصول على المزيد من عمليات البحث.'
            : 'Search limit reached. Please upgrade your plan for more searches.';
          
          return c.json({ 
            error: errorMessage,
            error_ar: 'لقد وصلت إلى حد البحث الشهري. يرجى الترقية.',
            error_en: 'Search limit reached. Please upgrade.',
            searches_count: userData.searches_count,
            searches_limit: userData.searches_limit,
            subscription_plan: userData.subscription_plan
          }, 429);
        }
        
        // Increment search count
        userData.searches_count += 1;
        
        // Save updated user data
        await kv.set(`user:${user.id}`, userData);
        
        console.log(`✅ Search count updated: ${userData.searches_count}/${userData.searches_limit} (Plan: ${userData.subscription_plan})`);
      }
    }

    // Get all products
    const products = await kv.getByPrefix('product:');
    
    // Simple search - in production, this would be more sophisticated
    const searchQuery = query.toLowerCase();
    const results = products
      .filter((p: any) => p)
      .filter((product: any) => {
        const name = (product.name || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        
        return name.includes(searchQuery) || 
               description.includes(searchQuery) || 
               category.includes(searchQuery);
      });

    return c.json({ results });
  } catch (error) {
    console.log('Error searching products:', error);
    return c.json({ error: 'Search failed' }, 500);
  }
});

// AI Image search
app.post("/make-server-dec0bed9/products/ai-search", async (c) => {
  try {
    const body = await c.req.json();
    const { imageUrl, features } = body;

    if (!imageUrl) {
      return c.json({ error: "Missing image URL" }, 400);
    }

    // Simulate AI image search
    // In production, this would use vision API (OpenAI, Google Vision, etc.)
    const products = await kv.getByPrefix('product:');
    
    return c.json({ 
      success: true,
      message: "AI image search - would analyze image and find similar products",
      results: products.filter((p: any) => p).slice(0, 10)
    });
  } catch (error) {
    console.log('Error in AI search:', error);
    return c.json({ error: 'AI search failed' }, 500);
  }
});

// Generate AI Outfit
app.post("/make-server-dec0bed9/products/outfit-generator", async (c) => {
  try {
    const body = await c.req.json();
    const { productId, style, occasion } = body;

    // Simulate AI outfit generation
    const products = await kv.getByPrefix('product:');
    
    return c.json({ 
      success: true,
      message: "AI outfit generator - would suggest matching items",
      outfit: {
        main: productId,
        suggestions: products.filter((p: any) => p).slice(0, 5)
      }
    });
  } catch (error) {
    console.log('Error generating outfit:', error);
    return c.json({ error: 'Outfit generation failed' }, 500);
  }
});

// ======================
// SUBSCRIPTION ROUTES
// ======================

// Get subscription plans
app.get("/make-server-dec0bed9/api/subscriptions/plans", async (c) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free',
        name_ar: 'مجاني',
        name_en: 'Free',
        price: 0,
        searches_limit: 5,
        features: [
          { en: '5 searches per month', ar: '5 عمليات بحث شهرياً' },
          { en: 'Basic product search', ar: 'البحث الأساسي عن المنتجات' },
          { en: 'Limited AI features', ar: 'ميزات AI محدودة' }
        ],
        popular: false
      },
      {
        id: 'basic',
        name: 'Basic',
        name_ar: 'أساسي',
        name_en: 'Basic',
        price: 29,
        searches_limit: 100,
        features: [
          { en: '100 searches per month', ar: '100 عملية بحث شهرياً' },
          { en: 'Advanced product search', ar: 'البحث المتقدم عن المنتجات' },
          { en: 'AI outfit generator', ar: 'مولد الأزياء بالذكاء الاصطناعي' },
          { en: 'Priority support', ar: 'دعم ذو أولوية' }
        ],
        popular: true
      },
      {
        id: 'pro',
        name: 'Pro',
        name_ar: 'احترافي',
        name_en: 'Pro',
        price: 99,
        searches_limit: 999999,
        features: [
          { en: 'Unlimited searches', ar: 'عمليات بحث غير محدودة' },
          { en: 'All AI features', ar: 'جميع ميزات الذكاء الاصطناعي' },
          { en: 'Image search', ar: 'البحث بالصور' },
          { en: 'Outfit generator', ar: 'مولد الأزياء' },
          { en: '24/7 premium support', ar: 'دعم متميز على مدار الساعة' },
          { en: 'API access', ar: 'الوصول إلى API' }
        ],
        popular: false
      }
    ];

    return c.json({ plans });
  } catch (error) {
    console.log('Error getting subscription plans:', error);
    return c.json({ error: 'Failed to get plans' }, 500);
  }
});

// Get current user subscription
app.get("/make-server-dec0bed9/api/subscriptions/current", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    // Check if subscription is expired
    const now = Date.now();
    if (userData.subscription_expires_at && userData.subscription_expires_at < now) {
      userData.subscription_plan = 'free';
      userData.searches_limit = 5;
      userData.subscription_expires_at = null;
      userData.payment_status = 'expired';
      await kv.set(`user:${user.id}`, userData);
    }

    // Check if monthly reset is needed
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const timeSinceReset = now - (userData.last_search_reset || now);
    if (timeSinceReset > thirtyDaysInMs) {
      userData.searches_count = 0;
      userData.last_search_reset = now;
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({
      subscription: {
        plan: userData.subscription_plan || 'free',
        searches_count: userData.searches_count || 0,
        searches_limit: userData.searches_limit || 5,
        searches_remaining: (userData.searches_limit || 5) - (userData.searches_count || 0),
        subscription_expires_at: userData.subscription_expires_at,
        payment_status: userData.payment_status || 'none',
        last_search_reset: userData.last_search_reset
      }
    });
  } catch (error) {
    console.log('Error getting current subscription:', error);
    return c.json({ error: 'Failed to get subscription info' }, 500);
  }
});

// Upgrade user subscription
app.post("/make-server-dec0bed9/api/subscriptions/upgrade", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { plan } = body;

    if (!plan || !['free', 'basic', 'pro'].includes(plan)) {
      return c.json({ 
        error: "Invalid plan",
        error_ar: "باقة غير صالحة",
        error_en: "Invalid plan"
      }, 400);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    // Set search limits based on plan
    let searches_limit = 5;
    if (plan === 'basic') searches_limit = 100;
    if (plan === 'pro') searches_limit = 999999;

    // Calculate expiration date (30 days from now for paid plans)
    const now = Date.now();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const subscription_expires_at = plan === 'free' ? null : now + thirtyDaysInMs;

    // Update user subscription
    userData.subscription_plan = plan;
    userData.searches_limit = searches_limit;
    userData.subscription_expires_at = subscription_expires_at;
    userData.payment_status = plan === 'free' ? 'none' : 'active';
    userData.searches_count = 0; // Reset search count on upgrade
    userData.last_search_reset = now;

    await kv.set(`user:${user.id}`, userData);

    console.log(`✅ User ${user.email} upgraded to ${plan} plan`);

    return c.json({
      success: true,
      message_en: `Successfully upgraded to ${plan} plan`,
      message_ar: `تم الترقية بنجاح إلى باقة ${plan}`,
      subscription: {
        plan: userData.subscription_plan,
        searches_count: userData.searches_count,
        searches_limit: userData.searches_limit,
        subscription_expires_at: userData.subscription_expires_at,
        payment_status: userData.payment_status
      }
    });
  } catch (error) {
    console.log('Error upgrading subscription:', error);
    return c.json({ error: 'Failed to upgrade subscription' }, 500);
  }
});

// ======================
// ADMIN ROUTES
// ======================

// Get all users (admin only)
app.get("/make-server-dec0bed9/admin/users", async (c) => {
  try {
    console.log('📊 Fetching all users...');
    const user = await authenticate(c);
    if (!user) {
      console.log('❌ No user authenticated');
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('✅ User authenticated:', user.id);
    const userData = await kv.get(`user:${user.id}`);
    console.log('👤 User role:', userData?.role);
    
    if (userData?.role !== 'admin') {
      console.log('❌ User is not admin');
      return c.json({ error: "Admin access required" }, 403);
    }

    console.log('🔍 Getting users from database...');
    const users = await kv.getByPrefix('user:');
    console.log('📊 Total users found:', users.length);
    
    const sanitizedUsers = users
      .filter((u: any) => u)
      .map((u: any) => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
      });

    console.log('✅ Returning', sanitizedUsers.length, 'sanitized users');
    return c.json({ users: sanitizedUsers });
  } catch (error: any) {
    console.error('❌ Error getting users:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return c.json({ error: `Failed to get users: ${error?.message}` }, 500);
  }
});

// Update user (admin only)
app.put("/make-server-dec0bed9/admin/users/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const userId = c.req.param('id');
    const targetUser = await kv.get(`user:${userId}`);

    if (!targetUser) {
      return c.json({ error: "User not found" }, 404);
    }

    const body = await c.req.json();
    const updatedUser = {
      ...targetUser,
      name: body.name || targetUser.name,
      email: body.email || targetUser.email,
      role: body.role || targetUser.role,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, updatedUser);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return c.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.log('Error updating user:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Delete user (admin only)
app.delete("/make-server-dec0bed9/admin/users/:id", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const userId = c.req.param('id');
    await kv.del(`user:${userId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting user:', error);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

// Update user subscription (admin only)
app.post("/make-server-dec0bed9/admin/users/:userId/subscription", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ 
        error: "Admin access required",
        error_ar: "يتطلب صلاحيات المسؤول",
        error_en: "Admin access required"
      }, 403);
    }

    const userId = c.req.param('userId');
    const targetUser = await kv.get(`user:${userId}`);

    if (!targetUser) {
      return c.json({ 
        error: "User not found",
        error_ar: "المستخدم غير موجود",
        error_en: "User not found"
      }, 404);
    }

    const body = await c.req.json();
    const { subscription_plan, searches_limit, subscription_expires_at, payment_status } = body;

    // Validate subscription plan
    if (subscription_plan && !['free', 'basic', 'pro'].includes(subscription_plan)) {
      return c.json({ 
        error: "Invalid subscription plan",
        error_ar: "باقة اشتراك غير صالحة",
        error_en: "Invalid subscription plan"
      }, 400);
    }

    const now = Date.now();

    // Update subscription fields
    if (subscription_plan) {
      targetUser.subscription_plan = subscription_plan;
      
      // Auto-set search limits if not provided
      if (!searches_limit) {
        if (subscription_plan === 'free') targetUser.searches_limit = 5;
        else if (subscription_plan === 'basic') targetUser.searches_limit = 100;
        else if (subscription_plan === 'pro') targetUser.searches_limit = 999999;
      }
    }

    if (searches_limit !== undefined) {
      targetUser.searches_limit = parseInt(searches_limit);
    }

    if (subscription_expires_at !== undefined) {
      targetUser.subscription_expires_at = subscription_expires_at;
    }

    if (payment_status) {
      targetUser.payment_status = payment_status;
    }

    // Reset search count and last reset time
    targetUser.searches_count = 0;
    targetUser.last_search_reset = now;
    targetUser.updatedAt = new Date().toISOString();

    await kv.set(`user:${userId}`, targetUser);

    console.log(`✅ Admin updated subscription for user ${targetUser.email} to ${targetUser.subscription_plan} plan`);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = targetUser;

    return c.json({ 
      success: true, 
      message_en: `Subscription updated successfully for ${targetUser.email}`,
      message_ar: `تم تحديث الاشتراك بنجاح لـ ${targetUser.email}`,
      user: userWithoutPassword 
    });
  } catch (error: any) {
    console.error('❌ Error updating user subscription:', error);
    return c.json({ error: `Failed to update subscription: ${error?.message}` }, 500);
  }
});

// Get settings (admin only)
app.get("/make-server-dec0bed9/admin/settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const settings = await kv.get('settings:global') || {
      siteName: 'Outfred',
      siteDescription: 'Fashion platform with AI-powered search',
      primaryColor: '#6366f1',
      secondaryColor: '#ec4899',
      headerLinks: [
        { label: { en: 'Home', ar: 'الرئيسية' }, url: '/' },
        { label: { en: 'Merchants', ar: 'المتاجر' }, url: '/merchants' },
        { label: { en: 'Account', ar: 'الحساب' }, url: '/account' },
      ]
    };

    return c.json({ settings });
  } catch (error) {
    console.log('Error getting settings:', error);
    return c.json({ error: 'Failed to get settings' }, 500);
  }
});

// Update settings (admin only)
app.post("/make-server-dec0bed9/admin/settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    await kv.set('settings:global', body);

    return c.json({ success: true, settings: body });
  } catch (error) {
    console.log('Error updating settings:', error);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// Get analytics (admin only)
app.get("/make-server-dec0bed9/admin/analytics", async (c) => {
  try {
    console.log('📊 Fetching analytics...');
    const user = await authenticate(c);
    if (!user) {
      console.log('❌ No user authenticated');
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('✅ User authenticated:', user.id);
    const userData = await kv.get(`user:${user.id}`);
    console.log('👤 User role:', userData?.role);
    
    if (userData?.role !== 'admin') {
      console.log('❌ User is not admin');
      return c.json({ error: "Admin access required" }, 403);
    }

    console.log('🔍 Getting data from database...');
    const users = await kv.getByPrefix('user:');
    const merchants = await kv.getByPrefix('merchant:');
    const products = await kv.getByPrefix('product:');

    console.log('📊 Raw counts - Users:', users.length, 'Merchants:', merchants.length, 'Products:', products.length);

    const validMerchants = merchants.filter((m: any) => m);

    const analytics = {
      totalUsers: users.filter((u: any) => u).length,
      totalMerchants: validMerchants.length,
      totalProducts: products.filter((p: any) => p).length,
      pendingMerchants: validMerchants.filter((m: any) => m.status === 'pending').length,
      approvedMerchants: validMerchants.filter((m: any) => m.status === 'approved').length,
    };

    console.log('✅ Analytics calculated:', analytics);
    return c.json({ analytics });
  } catch (error: any) {
    console.error('❌ Error getting analytics:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return c.json({ error: `Failed to get analytics: ${error?.message}` }, 500);
  }
});

// ======================
// ADMIN CMS & SETTINGS
// ======================

// Site Settings (SEO, Branding, Social)
app.get("/make-server-dec0bed9/admin/site-settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const settings = await kv.get('settings:site') || {
      siteName: 'Outfred',
      siteDescription: 'AI-powered fashion discovery platform',
      siteKeywords: 'fashion, AI, shopping, outfits',
      siteLogo: '',
      siteFavicon: '',
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    };

    return c.json({ settings });
  } catch (error) {
    console.error('Error getting site settings:', error);
    return c.json({ error: 'Failed to get site settings' }, 500);
  }
});

app.post("/make-server-dec0bed9/admin/site-settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    await kv.set('settings:site', body);

    return c.json({ success: true, settings: body });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return c.json({ error: 'Failed to update site settings' }, 500);
  }
});

// CMS Pages
app.get("/make-server-dec0bed9/admin/cms", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const pages = await kv.get('cms:pages') || [
      {
        id: 'about',
        title: { en: 'About Us', ar: 'عنا' },
        content: { en: 'Welcome to Outfred', ar: 'مرحباً بكم في Outfred' },
        slug: 'about'
      },
      {
        id: 'privacy',
        title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
        content: { en: 'Privacy policy content', ar: 'محتوى سياسة الخصوصية' },
        slug: 'privacy'
      },
      {
        id: 'contact',
        title: { en: 'Contact Us', ar: 'اتصل بنا' },
        content: { en: 'Contact information', ar: 'معلومات الاتصال' },
        slug: 'contact'
      }
    ];

    return c.json({ pages });
  } catch (error) {
    console.error('Error getting CMS pages:', error);
    return c.json({ error: 'Failed to get CMS pages' }, 500);
  }
});

app.post("/make-server-dec0bed9/admin/cms", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    await kv.set('cms:pages', body);

    return c.json({ success: true, pages: body });
  } catch (error) {
    console.error('Error updating CMS pages:', error);
    return c.json({ error: 'Failed to update CMS pages' }, 500);
  }
});

// Payment Settings (Paymob)
app.get("/make-server-dec0bed9/admin/payment-settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const settings = await kv.get('settings:payment') || {
      paymob: {
        apiKey: '',
        integrationId: '',
        iframeId: '',
        hmacSecret: '',
        enabled: false
      }
    };

    return c.json({ settings });
  } catch (error) {
    console.error('Error getting payment settings:', error);
    return c.json({ error: 'Failed to get payment settings' }, 500);
  }
});

app.post("/make-server-dec0bed9/admin/payment-settings", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    await kv.set('settings:payment', body);

    return c.json({ success: true, settings: body });
  } catch (error) {
    console.error('Error updating payment settings:', error);
    return c.json({ error: 'Failed to update payment settings' }, 500);
  }
});

// SMTP Settings
app.get("/make-server-dec0bed9/admin/smtp", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const settings = await kv.get('settings:smtp') || {
      host: '',
      port: 587,
      username: '',
      password: '',
      fromEmail: '',
      fromName: 'Outfred',
      enabled: false
    };

    return c.json({ settings });
  } catch (error) {
    console.error('Error getting SMTP settings:', error);
    return c.json({ error: 'Failed to get SMTP settings' }, 500);
  }
});

app.post("/make-server-dec0bed9/admin/smtp", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user || (await kv.get(`user:${user.id}`))?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const body = await c.req.json();
    await kv.set('settings:smtp', body);

    return c.json({ success: true, settings: body });
  } catch (error) {
    console.error('Error updating SMTP settings:', error);
    return c.json({ error: 'Failed to update SMTP settings' }, 500);
  }
});

// ======================
// PRODUCT IMPORT SYSTEM
// ======================

// Helper: Normalize text for comparison
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF\s]/gi, '') // Keep alphanumeric + Arabic
    .replace(/\s+/g, ' ');
};

// Helper: Extract keywords from text
const extractKeywords = (text: string): string[] => {
  const normalized = normalizeText(text);
  return normalized.split(' ').filter(word => word.length > 2);
};

// Helper: Calculate text similarity (simple Jaccard similarity)
const calculateSimilarity = (text1: string, text2: string): number => {
  const words1 = new Set(extractKeywords(text1));
  const words2 = new Set(extractKeywords(text2));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
};

// Helper: Generate product slug
const generateSlug = (brand: string, name: string, color?: string): string => {
  const parts = [brand, name, color].filter(Boolean);
  return normalizeText(parts.join(' ')).replace(/\s+/g, '-');
};

// Helper: Parse CSV data
const parseCSV = (csvText: string): any[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const products: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const product: any = {};
    
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });
    
    products.push(product);
  }
  
  return products;
};

// Helper: Fetch data from URL (real HTML scraping)
const fetchFromURL = async (url: string): Promise<any[]> => {
  try {
    console.log('📡 Fetching products from URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    console.log(`✅ Fetched ${html.length} chars`);
    
    const products: any[] = [];
    
    // Extract prices with context
    const pricePatterns = html.matchAll(/(?:EGP|LE|SR|SAR|AED|USD|\$|£|€)\s*(\d+[,.]?\d*)/gi);
    const pricesFound = Array.from(pricePatterns).slice(0, 100);
    
    console.log(`Found ${pricesFound.length} prices`);
    
    for (const priceMatch of pricesFound) {
      const priceIndex = priceMatch.index || 0;
      const contextStart = Math.max(0, priceIndex - 600);
      const contextEnd = Math.min(html.length, priceIndex + 300);
      const context = html.substring(contextStart, contextEnd);
      
      // Find title
      const titleMatch = context.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i) ||
                        context.match(/<a[^>]*title=["\'](.*?)["\']/i) ||
                        context.match(/alt=["\'](.*?)["\']/i) ||
                        context.match(/product-title["\'][^>]*>(.*?)</i);
      
      // Find image
      const imageMatch = context.match(/<img[^>]*src=["\'](.*?)["\']/) ||
                        context.match(/data-src=["\'](.*?)["\']/);
      
      if (titleMatch) {
        const name = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, '').trim();
        const price = priceMatch[1].replace(/[^\d.]/g, '');
        let image = imageMatch ? imageMatch[1] : '';
        
        // Fix relative URLs
        if (image && !image.startsWith('http')) {
          try {
            const baseUrl = new URL(url);
            image = new URL(image, baseUrl.origin).href;
          } catch (e) {
            image = '';
          }
        }
        
        if (name && name.length > 3 && name.length < 200 && parseFloat(price) > 0) {
          products.push({
            name,
            price,
            image,
            url,
            category: 'fashion',
            description: name
          });
        }
      }
    }
    
    // Remove duplicates
    const seen = new Set();
    const unique = products.filter(p => {
      const key = p.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    
    console.log(`✅ Extracted ${unique.length} products`);
    return unique;
    
  } catch (error: any) {
    console.error('❌ Scraping error:', error?.message);
    throw new Error(`Scraping failed: ${error?.message}`);
  }
};

// Helper: Check for duplicate products
const checkDuplicate = async (merchantId: string, productData: any): Promise<{ isDuplicate: boolean; existingId?: string; similarity?: number }> => {
  const allProducts = await kv.getByPrefix('product:');
  const merchantProducts = allProducts.filter((p: any) => p && p.merchantId === merchantId);
  
  for (const existing of merchantProducts) {
    // Check by name similarity
    const similarity = calculateSimilarity(productData.name, existing.name);
    
    if (similarity > 0.85) {
      return {
        isDuplicate: true,
        existingId: existing.id,
        similarity
      };
    }
    
    // Check by exact match of normalized name + color
    const slug1 = generateSlug(merchantId, productData.name, productData.color);
    const slug2 = generateSlug(merchantId, existing.name, existing.color);
    
    if (slug1 === slug2) {
      return {
        isDuplicate: true,
        existingId: existing.id,
        similarity: 1.0
      };
    }
  }
  
  return { isDuplicate: false };
};

// Initialize default connectors
const initConnectors = async () => {
  const initialized = await kv.get('connectors:initialized');
  if (initialized) return;
  
  const connectors = [
    {
      slug: 'shopify',
      name: 'Shopify',
      type: 'api',
      fields: {
        apiKey: 'API Key',
        storeUrl: 'Store URL',
        apiVersion: '2024-01'
      },
      mapping: {
        title: 'name',
        vendor: 'brand',
        'variants[0].price': 'price',
        'images[0].src': 'image'
      }
    },
    {
      slug: 'woocommerce',
      name: 'WooCommerce',
      type: 'api',
      fields: {
        consumerKey: 'Consumer Key',
        consumerSecret: 'Consumer Secret',
        storeUrl: 'Store URL'
      },
      mapping: {
        name: 'name',
        price: 'price',
        'images[0].src': 'image'
      }
    },
    {
      slug: 'csv',
      name: 'CSV/Excel',
      type: 'file',
      fields: {},
      mapping: {
        name: 'name',
        price: 'price',
        image_url: 'image',
        color: 'color',
        size: 'sizes'
      }
    },
    {
      slug: 'website',
      name: 'Website Scraper',
      type: 'scraper',
      fields: {
        url: 'Website URL'
      },
      mapping: {}
    }
  ];
  
  for (const connector of connectors) {
    await kv.set(`connector:${connector.slug}`, connector);
  }
  
  await kv.set('connectors:initialized', true);
  console.log('✅ Connectors initialized');
};

// Initialize connectors on server start
initConnectors().catch(console.error);

// Get available connectors
app.get("/make-server-dec0bed9/products/import/connectors", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const connectors = await kv.getByPrefix('connector:');
    return c.json({ connectors: connectors.filter((c: any) => c) });
  } catch (error: any) {
    console.error('Error fetching connectors:', error);
    return c.json({ error: 'Failed to fetch connectors' }, 500);
  }
});

// Start import session
app.post("/make-server-dec0bed9/products/import/start", async (c) => {
  try {
    console.log('📦 Starting product import...');
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const body = await c.req.json();
    const { merchantId, sourceType, sourceData, options = {} } = body;
    
    if (!merchantId || !sourceType) {
      return c.json({ error: "Missing required fields: merchantId, sourceType" }, 400);
    }
    
    // Verify merchant exists
    const merchant = await kv.get(`merchant:${merchantId}`);
    if (!merchant) {
      return c.json({ error: "Merchant not found" }, 404);
    }
    
    // Create import session
    const sessionId = `import_${Date.now()}_${generateId().slice(0, 8)}`;
    const session = {
      id: sessionId,
      merchantId,
      userId: user.id,
      sourceType,
      sourceData,
      options,
      status: 'processing',
      startedAt: new Date().toISOString(),
      stats: {
        total: 0,
        added: 0,
        updated: 0,
        duplicates: 0,
        failed: 0
      },
      logs: [],
      products: []
    };
    
    await kv.set(`import_session:${sessionId}`, session);
    
    console.log('✅ Import session created:', sessionId);
    
    // Process import asynchronously
    processImport(sessionId, merchantId, sourceType, sourceData, options).catch(error => {
      console.error('❌ Import processing error:', error);
    });
    
    return c.json({ 
      success: true, 
      sessionId,
      message: 'Import started. Check status at /products/import/status/' + sessionId
    });
  } catch (error: any) {
    console.error('❌ Error starting import:', error);
    return c.json({ error: `Failed to start import: ${error?.message}` }, 500);
  }
});

// Process import (background task)
const processImport = async (
  sessionId: string,
  merchantId: string,
  sourceType: string,
  sourceData: any,
  options: any
) => {
  console.log('🔄 Processing import session:', sessionId);
  
  try {
    const session = await kv.get(`import_session:${sessionId}`);
    if (!session) throw new Error('Session not found');
    
    // Fetch raw data based on source type
    let rawProducts: any[] = [];
    
    session.logs.push({ time: new Date().toISOString(), message: 'Fetching data from source...' });
    await kv.set(`import_session:${sessionId}`, session);
    
    try {
      if (sourceType === 'csv' || sourceType === 'file') {
        // Parse CSV data
        session.logs.push({ time: new Date().toISOString(), message: 'Parsing CSV data...' });
        await kv.set(`import_session:${sessionId}`, session);
        rawProducts = parseCSV(sourceData.csvContent || '');
      } else if (sourceType === 'website' || sourceType === 'scraper') {
        // Scrape website
        const targetUrl = sourceData.url || '';
        session.logs.push({ time: new Date().toISOString(), message: `Scraping from: ${targetUrl}` });
        await kv.set(`import_session:${sessionId}`, session);
        rawProducts = await fetchProductsFromURL(targetUrl);
      } else if (sourceType === 'api') {
        // Call API
        session.logs.push({ time: new Date().toISOString(), message: `Fetching from API: ${sourceData.apiUrl}` });
        await kv.set(`import_session:${sessionId}`, session);
        rawProducts = await fetchProductsFromURL(sourceData.apiUrl || '');
      }
    } catch (fetchError: any) {
      session.logs.push({ 
        time: new Date().toISOString(), 
        message: `❌ Error fetching data: ${fetchError?.message}` 
      });
      await kv.set(`import_session:${sessionId}`, session);
      throw fetchError;
    }
    
    session.stats.total = rawProducts.length;
    session.logs.push({ time: new Date().toISOString(), message: `Found ${rawProducts.length} products` });
    await kv.set(`import_session:${sessionId}`, session);
    
    if (rawProducts.length === 0) {
      session.logs.push({ 
        time: new Date().toISOString(), 
        message: '⚠️ No products found. Check if the URL is correct and accessible.' 
      });
      await kv.set(`import_session:${sessionId}`, session);
    }
    
    // Get merchant info
    const merchant = await kv.get(`merchant:${merchantId}`);
    const brandName = merchant?.brandName || 'Unknown';
    
    // Process each product
    for (const rawProduct of rawProducts) {
      try {
        // Normalize product data
        const parsedStock = parseInt(rawProduct.stock);
        const productData = {
          name: rawProduct.name || rawProduct.title || '',
          description: rawProduct.description || '',
          price: parseFloat(rawProduct.price) || 0,
          category: rawProduct.category || 'uncategorized',
          merchantId,
          brand: brandName,
          imageUrl: rawProduct.image || rawProduct.image_url || rawProduct.imageUrl || '',
          stock: Number.isFinite(parsedStock) ? parsedStock : 100,
          color: rawProduct.color || '',
          sizes: typeof rawProduct.sizes === 'string' ? rawProduct.sizes.split(',') : (rawProduct.sizes || []),
          fit: rawProduct.fit || 'regular',
          status: 'active',
          isActive: true,
          views: 0,
          // Store product URL in multiple fields for compatibility
          url: rawProduct.url || rawProduct.product_url || rawProduct.productUrl || '',
          productUrl: rawProduct.url || rawProduct.product_url || rawProduct.productUrl || '',
          originalUrl: rawProduct.url || rawProduct.product_url || rawProduct.productUrl || '',
          sourceUrl: rawProduct.url || rawProduct.product_url || rawProduct.productUrl || ''
        };
        
        if (!productData.name) {
          session.stats.failed++;
          session.logs.push({ time: new Date().toISOString(), message: `⚠️ Skipped: Missing product name` });
          continue;
        }
        
        // Check for duplicates
        const duplicateCheck = await checkDuplicate(merchantId, productData);
        
        if (duplicateCheck.isDuplicate && !options.updateExisting) {
          session.stats.duplicates++;
          session.logs.push({ 
            time: new Date().toISOString(), 
            message: `🔁 Duplicate found: ${productData.name} (${Math.round(duplicateCheck.similarity! * 100)}% match)` 
          });
          continue;
        }
        
        if (duplicateCheck.isDuplicate && options.updateExisting) {
          // Update existing product
          const existingProduct = await kv.get(`product:${duplicateCheck.existingId}`);
          const updatedProduct = {
            ...existingProduct,
            ...productData,
            updatedAt: new Date().toISOString(),
            lastSyncedAt: new Date().toISOString()
          };
          await kv.set(`product:${duplicateCheck.existingId}`, updatedProduct);
          session.stats.updated++;
          session.logs.push({ time: new Date().toISOString(), message: `✏️ Updated: ${productData.name}` });
          session.products.push(duplicateCheck.existingId);
        } else {
          // Add new product
          const productId = generateId();
          const newProduct = {
            id: productId,
            ...productData,
            slug: generateSlug(brandName, productData.name, productData.color),
            createdAt: new Date().toISOString(),
            importedFrom: sourceType,
            importSessionId: sessionId
          };
          await kv.set(`product:${productId}`, newProduct);
          session.stats.added++;
          session.logs.push({ time: new Date().toISOString(), message: `✅ Added: ${productData.name}` });
          session.products.push(productId);
        }
      } catch (productError: any) {
        session.stats.failed++;
        session.logs.push({ 
          time: new Date().toISOString(), 
          message: `❌ Error processing product: ${productError?.message}` 
        });
        console.error('Product processing error:', productError);
      }
    }
    
    // Mark session as completed
    session.status = 'completed';
    session.completedAt = new Date().toISOString();
    session.duration = Date.now() - new Date(session.startedAt).getTime();
    session.logs.push({ 
      time: new Date().toISOString(), 
      message: `✅ Import completed: ${session.stats.added} added, ${session.stats.updated} updated, ${session.stats.duplicates} duplicates, ${session.stats.failed} failed` 
    });
    
    await kv.set(`import_session:${sessionId}`, session);
    console.log('✅ Import session completed:', sessionId);
    
  } catch (error: any) {
    console.error('❌ Import processing failed:', error);
    const session = await kv.get(`import_session:${sessionId}`);
    if (session) {
      session.status = 'failed';
      session.error = error?.message;
      session.completedAt = new Date().toISOString();
      session.logs.push({ 
        time: new Date().toISOString(), 
        message: `❌ Import failed: ${error?.message}` 
      });
      await kv.set(`import_session:${sessionId}`, session);
    }
  }
};

// Get import session status
app.get("/make-server-dec0bed9/products/import/status/:sessionId", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const sessionId = c.req.param('sessionId');
    const session = await kv.get(`import_session:${sessionId}`);
    
    if (!session) {
      return c.json({ error: "Session not found" }, 404);
    }
    
    // Verify user has access to this session
    if (session.userId !== user.id) {
      const userData = await kv.get(`user:${user.id}`);
      if (userData?.role !== 'admin') {
        return c.json({ error: "Access denied" }, 403);
      }
    }
    
    return c.json({ session });
  } catch (error: any) {
    console.error('Error fetching session status:', error);
    return c.json({ error: 'Failed to fetch session status' }, 500);
  }
});

// Get import history
app.get("/make-server-dec0bed9/products/import/history", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const merchantId = c.req.query('merchantId');
    const allSessions = await kv.getByPrefix('import_session:');
    
    let sessions = allSessions.filter((s: any) => s);
    
    // Filter by merchant if specified
    if (merchantId) {
      sessions = sessions.filter((s: any) => s.merchantId === merchantId);
    }
    
    // Filter by user (unless admin)
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      sessions = sessions.filter((s: any) => s.userId === user.id);
    }
    
    // Sort by date (newest first)
    sessions.sort((a: any, b: any) => {
      return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
    });
    
    return c.json({ sessions });
  } catch (error: any) {
    console.error('Error fetching import history:', error);
    return c.json({ error: 'Failed to fetch import history' }, 500);
  }
});

// Delete import session
app.delete("/make-server-dec0bed9/products/import/session/:sessionId", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const sessionId = c.req.param('sessionId');
    const session = await kv.get(`import_session:${sessionId}`);
    
    if (!session) {
      return c.json({ error: "Session not found" }, 404);
    }
    
    // Verify user has access
    if (session.userId !== user.id) {
      const userData = await kv.get(`user:${user.id}`);
      if (userData?.role !== 'admin') {
        return c.json({ error: "Access denied" }, 403);
      }
    }
    
    await kv.del(`import_session:${sessionId}`);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting session:', error);
    return c.json({ error: 'Failed to delete session' }, 500);
  }
});

// Initialize demo data on server start
console.log('🚀 Starting Outfred server...');
initDemoData().then(() => {
  console.log('✅ Server initialization complete');
}).catch((error) => {
  console.error('❌ Server initialization failed:', error);
});

// ======================
// STATISTICS ROUTES
// ======================

// Record search query
app.post("/make-server-dec0bed9/stats/search", async (c) => {
  try {
    const body = await c.req.json();
    const { query, language = 'en' } = body;

    if (!query) {
      return c.json({ error: "Missing search query" }, 400);
    }

    const searchId = generateId();
    const searchRecord = {
      id: searchId,
      query,
      language,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // For daily grouping
    };

    await kv.set(`stats:search:${searchId}`, searchRecord);
    console.log('📊 Recorded search:', query, 'Language:', language);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error recording search:', error);
    return c.json({ error: 'Failed to record search' }, 500);
  }
});

// Record product view
app.post("/make-server-dec0bed9/stats/product-view", async (c) => {
  try {
    const body = await c.req.json();
    const { productId } = body;

    if (!productId) {
      return c.json({ error: "Missing productId" }, 400);
    }

    const viewId = generateId();
    const viewRecord = {
      id: viewId,
      productId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // For daily grouping
    };

    await kv.set(`stats:view:${viewId}`, viewRecord);
    console.log('📊 Recorded product view:', productId);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error recording product view:', error);
    return c.json({ error: 'Failed to record product view' }, 500);
  }
});

// Get statistics summary (admin only)
app.get("/make-server-dec0bed9/stats/summary", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    console.log('📊 Fetching statistics summary...');

    // Get all search and view records
    const searches = await kv.getByPrefix('stats:search:');
    const views = await kv.getByPrefix('stats:view:');

    // Calculate statistics
    const totalSearches = searches.filter((s: any) => s).length;
    const totalViews = views.filter((v: any) => v).length;

    // Get top search queries
    const queryCount: Record<string, number> = {};
    searches.forEach((search: any) => {
      if (search && search.query) {
        const normalized = search.query.toLowerCase().trim();
        queryCount[normalized] = (queryCount[normalized] || 0) + 1;
      }
    });

    const topSearches = Object.entries(queryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    // Get top viewed products
    const productViewCount: Record<string, number> = {};
    views.forEach((view: any) => {
      if (view && view.productId) {
        productViewCount[view.productId] = (productViewCount[view.productId] || 0) + 1;
      }
    });

    const topViewedProducts = Object.entries(productViewCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([productId, count]) => ({ productId, count }));

    // Get statistics by date (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const searchesByDate: Record<string, number> = {};
    const viewsByDate: Record<string, number> = {};

    searches.forEach((search: any) => {
      if (search && search.date) {
        const searchDate = new Date(search.date);
        if (searchDate >= thirtyDaysAgo) {
          searchesByDate[search.date] = (searchesByDate[search.date] || 0) + 1;
        }
      }
    });

    views.forEach((view: any) => {
      if (view && view.date) {
        const viewDate = new Date(view.date);
        if (viewDate >= thirtyDaysAgo) {
          viewsByDate[view.date] = (viewsByDate[view.date] || 0) + 1;
        }
      }
    });

    // Get language distribution
    const languageStats: Record<string, number> = {};
    searches.forEach((search: any) => {
      if (search && search.language) {
        languageStats[search.language] = (languageStats[search.language] || 0) + 1;
      }
    });

    const summary = {
      totalSearches,
      totalViews,
      topSearches,
      topViewedProducts,
      searchesByDate: Object.entries(searchesByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
      viewsByDate: Object.entries(viewsByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
      languageStats: Object.entries(languageStats).map(([language, count]) => ({ language, count })),
    };

    console.log('✅ Statistics summary generated');
    return c.json({ summary });
  } catch (error: any) {
    console.error('❌ Error getting statistics:', error);
    return c.json({ error: `Failed to get statistics: ${error?.message}` }, 500);
  }
});

// Get product view count
app.get("/make-server-dec0bed9/stats/product/:id/views", async (c) => {
  try {
    const productId = c.req.param('id');
    
    const views = await kv.getByPrefix('stats:view:');
    const productViews = views.filter((v: any) => v && v.productId === productId);
    
    return c.json({ 
      productId,
      viewCount: productViews.length,
      views: productViews.slice(0, 100) // Return last 100 views
    });
  } catch (error) {
    console.log('Error getting product views:', error);
    return c.json({ error: 'Failed to get product views' }, 500);
  }
});

// Record merchant page view
app.post("/make-server-dec0bed9/merchant-page-view", async (c) => {
  try {
    const body = await c.req.json();
    const { merchantId } = body;

    if (!merchantId) {
      return c.json({ error: "Missing merchantId" }, 400);
    }

    const viewId = generateId();
    const viewRecord = {
      id: viewId,
      merchantId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // For daily grouping
    };

    await kv.set(`stats:merchant-view:${viewId}`, viewRecord);
    console.log('📊 Recorded merchant page view:', merchantId);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error recording merchant page view:', error);
    return c.json({ error: 'Failed to record merchant page view' }, 500);
  }
});

// Get merchant page view count
app.get("/make-server-dec0bed9/merchant-page-views/:merchantId", async (c) => {
  try {
    const merchantId = c.req.param('merchantId');
    
    const views = await kv.getByPrefix('stats:merchant-view:');
    const merchantViews = views.filter((v: any) => v && v.merchantId === merchantId);
    
    // Group by date
    const viewsByDate: Record<string, number> = {};
    merchantViews.forEach((view: any) => {
      if (view && view.date) {
        viewsByDate[view.date] = (viewsByDate[view.date] || 0) + 1;
      }
    });
    
    return c.json({ 
      merchantId,
      totalViews: merchantViews.length,
      viewsByDate: Object.entries(viewsByDate)
        .sort(([a], [b]) => b.localeCompare(a)) // Sort by date descending
        .map(([date, count]) => ({ date, count })),
      recentViews: merchantViews
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 100) // Return last 100 views
    });
  } catch (error) {
    console.log('Error getting merchant page views:', error);
    return c.json({ error: 'Failed to get merchant page views' }, 500);
  }
});

// Record search query (for statistics)
app.post("/make-server-dec0bed9/search-record", async (c) => {
  try {
    const body = await c.req.json();
    const { query, language } = body;

    if (!query) {
      return c.json({ error: "Missing search query" }, 400);
    }

    const searchId = generateId();
    const searchRecord = {
      id: searchId,
      query,
      language: language || 'en',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
    };

    await kv.set(`stats:search:${searchId}`, searchRecord);
    console.log('📊 Recorded search:', query);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error recording search:', error);
    return c.json({ error: 'Failed to record search' }, 500);
  }
});

// Get search statistics
app.get("/make-server-dec0bed9/search-stats", async (c) => {
  try {
    const searches = await kv.getByPrefix('stats:search:');
    
    // Group by date
    const searchesByDate: Record<string, number> = {};
    const topQueries: Record<string, number> = {};
    
    searches.forEach((search: any) => {
      if (search && search.date) {
        searchesByDate[search.date] = (searchesByDate[search.date] || 0) + 1;
      }
      if (search && search.query) {
        const normalizedQuery = search.query.toLowerCase().trim();
        topQueries[normalizedQuery] = (topQueries[normalizedQuery] || 0) + 1;
      }
    });
    
    // Get top 10 queries
    const top10Queries = Object.entries(topQueries)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
    
    return c.json({ 
      totalSearches: searches.length,
      searchesByDate: Object.entries(searchesByDate)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([date, count]) => ({ date, count })),
      topQueries: top10Queries,
    });
  } catch (error) {
    console.log('Error getting search stats:', error);
    return c.json({ error: 'Failed to get search stats' }, 500);
  }
});

// Get merchant statistics (for merchant dashboard)
app.get("/make-server-dec0bed9/merchant-stats/:merchantId", async (c) => {
  try {
    const user = await authenticate(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const merchantId = c.req.param('merchantId');
    const merchant = await kv.get(`merchant:${merchantId}`);
    
    if (!merchant) {
      return c.json({ error: "Merchant not found" }, 404);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    // Check if user is admin OR if user is the merchant owner
    const isAdmin = userData?.role === 'admin';
    const isMerchantOwner = 
      userData?.role === 'merchant' && 
      (merchant.userId === user.id || merchant.contactEmail === userData.email);

    if (!isAdmin && !isMerchantOwner) {
      return c.json({ error: "Access denied" }, 403);
    }

    // Get products for this merchant
    const allProducts = await kv.getByPrefix('product:');
    const merchantProducts = allProducts.filter((p: any) => p && p.merchantId === merchantId);
    
    // Get page views
    const allPageViews = await kv.getByPrefix('stats:merchant-view:');
    const merchantPageViews = allPageViews.filter((v: any) => v && v.merchantId === merchantId);
    
    // Get product views for all merchant products
    const allProductViews = await kv.getByPrefix('stats:view:');
    const merchantProductIds = new Set(merchantProducts.map((p: any) => p.id));
    const merchantProductViews = allProductViews.filter((v: any) => 
      v && merchantProductIds.has(v.productId)
    );
    
    // Group product views by product
    const viewsByProduct: Record<string, number> = {};
    merchantProductViews.forEach((view: any) => {
      if (view && view.productId) {
        viewsByProduct[view.productId] = (viewsByProduct[view.productId] || 0) + 1;
      }
    });
    
    // Get top 5 viewed products
    const topProducts = Object.entries(viewsByProduct)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([productId, views]) => {
        const product = merchantProducts.find((p: any) => p.id === productId);
        return {
          productId,
          productName: product?.name || 'Unknown',
          views,
        };
      });
    
    return c.json({
      merchantId,
      totalProducts: merchantProducts.length,
      activeProducts: merchantProducts.filter((p: any) => p.status === 'active').length,
      totalPageViews: merchantPageViews.length,
      totalProductViews: merchantProductViews.length,
      topProducts,
    });
  } catch (error: any) {
    console.error('Error getting merchant stats:', error);
    return c.json({ error: `Failed to get merchant stats: ${error?.message}` }, 500);
  }
});

// Middleware to attach user to context for admin routes
app.use('/make-server-dec0bed9/admin/*', async (c, next) => {
  const user = await authenticate(c);
  c.set('user', user);
  await next();
});

// Mount admin routes
app.route('/make-server-dec0bed9/admin', adminRoutes);

Deno.serve(app.fetch);
