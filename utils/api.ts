import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-dec0bed9`;

interface ApiOptions {
  method?: string;
  body?: any;
  requireAuth?: boolean;
}

export const api = async (endpoint: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, requireAuth = false } = options;
  
  console.log(`📡 API Call: ${method} ${endpoint}`, { requireAuth });
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // Always send Supabase anon key for Edge Function authentication
    'Authorization': `Bearer ${publicAnonKey}`,
  };

  // Add custom access token header if auth is required
  if (requireAuth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('🔑 Using stored access token in X-Access-Token header');
      headers['X-Access-Token'] = token;
    } else {
      console.warn('⚠️ No access token found in localStorage');
      console.warn('💡 Solution: Login at /#login or use Debug Panel at /#debug');
      console.warn('📧 Demo credentials: admin@outfred.com / admin123');
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const url = `${API_BASE}${endpoint}`;
    console.log('🌐 Fetching:', url);
    
    const response = await fetch(url, config);
    
    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response:', parseError);
      throw new Error('Server returned invalid response');
    }

    console.log(`📥 Response status: ${response.status}`, data);

    if (!response.ok) {
      console.error('❌ API Error:', data);
      
      // Provide more detailed error message
      const errorMessage = data.error || `API request failed with status ${response.status}`;
      
      // Special handling for Unauthorized errors
      if (response.status === 401 && errorMessage.includes('Unauthorized')) {
        console.error('🔐 Authentication Error!');
        console.error('💡 You need to login first. Go to /#login');
        console.error('📧 Demo credentials: admin@outfred.com / admin123');
        console.error('🔧 Or use Debug Panel: /#debug');
      }
      
      // If debug info is available, log it
      if (data.debug) {
        console.error('🔍 Debug info:', data.debug);
      }
      
      throw new Error(errorMessage);
    }

    console.log('✅ API Success');
    return data;
  } catch (error: any) {
    console.error(`❌ API Error on ${endpoint}:`, error);
    
    // Enhance error message for network errors
    if (error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to server. Please check your internet connection.`);
    }
    
    throw error;
  }
};

// Auth APIs
export const authApi = {
  register: (userData: any) => api('/auth/register', { method: 'POST', body: userData }),
  login: (credentials: any) => api('/auth/login', { method: 'POST', body: credentials }),
  getCurrentUser: () => api('/auth/me', { requireAuth: true }),
};

// Merchants APIs
export const merchantsApi = {
  create: (merchantData: any) => api('/merchants/create', { method: 'POST', body: merchantData }),
  list: (status?: string) => api(`/merchants/list${status ? `?status=${status}` : ''}`),
  getUserMerchant: () => api('/merchants/my-merchant', { requireAuth: true }),
  approve: (id: string) => api(`/merchants/approve/${id}`, { method: 'POST', requireAuth: true }),
  reject: (id: string) => api(`/merchants/reject/${id}`, { method: 'POST', requireAuth: true }),
  delete: (id: string) => api(`/merchants/delete/${id}`, { method: 'DELETE', requireAuth: true }),
  update: (id: string, merchantData: any) => api(`/merchants/update/${id}`, { method: 'PUT', body: merchantData, requireAuth: true }),
};

// Products APIs
export const productsApi = {
  search: (query: string, language: string = 'en') => 
    api('/products/search', { method: 'POST', body: { query, language } }),
  aiSearch: (imageUrl: string, features?: any) => 
    api('/products/ai-search', { method: 'POST', body: { imageUrl, features } }),
  generateOutfit: (productId: string, style?: string, occasion?: string) =>
    api('/products/outfit-generator', { method: 'POST', body: { productId, style, occasion } }),
  import: (merchantId: string, url: string) =>
    api('/products/import', { method: 'POST', body: { merchantId, url }, requireAuth: true }),
  list: (merchantId?: string) => api(`/products/list${merchantId ? `?merchantId=${merchantId}` : ''}`),
  create: (productData: any) => api('/products/create', { method: 'POST', body: productData, requireAuth: true }),
  update: (id: string, productData: any) => api(`/products/update/${id}`, { method: 'PUT', body: productData, requireAuth: true }),
  delete: (id: string) => api(`/products/delete/${id}`, { method: 'DELETE', requireAuth: true }),
  
  // Import System APIs
  importStart: (importData: any) => api('/products/import/start', { method: 'POST', body: importData, requireAuth: true }),
  importStatus: (sessionId: string) => api(`/products/import/status/${sessionId}`, { requireAuth: true }),
  importHistory: (merchantId?: string) => api(`/products/import/history${merchantId ? `?merchantId=${merchantId}` : ''}`, { requireAuth: true }),
  importDelete: (sessionId: string) => api(`/products/import/session/${sessionId}`, { method: 'DELETE', requireAuth: true }),
  importConnectors: () => api('/products/import/connectors', { requireAuth: true }),
  
  // Statistics APIs
  recordSearch: (query: string, language: string = 'en') => 
    api('/search-record', { method: 'POST', body: { query, language } }),
  recordView: (productId: string) => 
    api('/stats/product-view', { method: 'POST', body: { productId } }),
};

// Admin APIs
export const adminApi = {
  getUsers: () => api('/admin/users', { requireAuth: true }),
  updateUser: (id: string, userData: any) => api(`/admin/users/${id}`, { method: 'PUT', body: userData, requireAuth: true }),
  deleteUser: (id: string) => api(`/admin/users/${id}`, { method: 'DELETE', requireAuth: true }),
  getSettings: () => api('/admin/settings', { requireAuth: true }),
  updateSettings: (settings: any) => api('/admin/settings', { method: 'POST', body: settings, requireAuth: true }),
  getAnalytics: () => api('/admin/analytics', { requireAuth: true }),
};

// Statistics APIs
export const statsApi = {
  getSummary: () => api('/stats/summary', { requireAuth: true }),
  getProductViews: (productId: string) => api(`/stats/product/${productId}/views`),
};
