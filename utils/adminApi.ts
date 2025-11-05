// Admin API Helper Functions
// Frontend utilities for calling admin backend endpoints

import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dec0bed9`;

// Helper: Get auth token
const getToken = () => localStorage.getItem('token');

// Helper: Get from localStorage as fallback
function getFromLocalStorage(key: string, defaultValue: any = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper: Save to localStorage as fallback
function saveToLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// Helper: Make authenticated request with fallback to localStorage
async function apiRequest(endpoint: string, options: RequestInit = {}, fallbackKey?: string, fallbackDefault?: any) {
  const token = getToken();
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token || '',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      // If 404 and we have fallback, use localStorage
      if (response.status === 404 && fallbackKey) {
        console.warn(`⚠️ API endpoint ${endpoint} not found (404). Using localStorage fallback.`);
        
        // If it's a POST/PUT request, save to localStorage
        if (options.method === 'POST' || options.method === 'PUT') {
          const body = options.body ? JSON.parse(options.body as string) : {};
          saveToLocalStorage(fallbackKey, body);
          return { success: true, settings: body, fallback: true };
        }
        
        // If it's a GET request, return from localStorage
        const fallbackData = getFromLocalStorage(fallbackKey, fallbackDefault);
        return { settings: fallbackData, fallback: true };
      }
      
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Save successful GET responses to localStorage for future fallback
    if (options.method !== 'POST' && options.method !== 'PUT' && fallbackKey && data.settings) {
      saveToLocalStorage(fallbackKey, data.settings);
    }
    
    return data;
  } catch (error: any) {
    // Network error or backend down - use localStorage
    if (fallbackKey && (error.message?.includes('fetch') || error.message?.includes('network'))) {
      console.warn(`⚠️ API request failed: ${error.message}. Using localStorage fallback.`);
      
      if (options.method === 'POST' || options.method === 'PUT') {
        const body = options.body ? JSON.parse(options.body as string) : {};
        saveToLocalStorage(fallbackKey, body);
        return { success: true, settings: body, fallback: true };
      }
      
      const fallbackData = getFromLocalStorage(fallbackKey, fallbackDefault);
      return { settings: fallbackData, fallback: true };
    }
    
    throw error;
  }
}

// =============================================================================
// CMS API
// =============================================================================

const defaultCMSPages = [
  {
    id: 'about',
    title: { en: 'About Us', ar: 'عنا' },
    content: { en: 'Welcome to Outfred - AI-powered fashion discovery', ar: 'مرحباً بكم في Outfred - منصة اكتشاف الأزياء بالذكاء الاصطناعي' },
    slug: 'about'
  },
  {
    id: 'privacy',
    title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    content: { en: 'Your privacy is important to us', ar: 'خصوصيتك مهمة بالنسبة لنا' },
    slug: 'privacy'
  },
  {
    id: 'contact',
    title: { en: 'Contact Us', ar: 'اتصل بنا' },
    content: { en: 'Get in touch with our team', ar: 'تواصل مع فريقنا' },
    slug: 'contact'
  }
];

export const cmsApi = {
  async getAll() {
    return apiRequest('/admin/cms', {}, 'admin_cms_pages', defaultCMSPages);
  },
  
  async getPage(pageKey: string) {
    return apiRequest(`/admin/cms/${pageKey}`, {}, `admin_cms_page_${pageKey}`);
  },
  
  async updatePage(pageKey: string, data: any) {
    return apiRequest(`/admin/cms/${pageKey}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, `admin_cms_page_${pageKey}`);
  },
  
  async updateAll(pages: any[]) {
    return apiRequest('/admin/cms', {
      method: 'POST',
      body: JSON.stringify(pages),
    }, 'admin_cms_pages', defaultCMSPages);
  },
};

// =============================================================================
// Site Settings API
// =============================================================================

const defaultSiteSettings = {
  siteName: 'Outfred',
  siteDescription: 'AI-powered fashion discovery platform',
  siteKeywords: 'fashion, AI, shopping, outfits, style',
  siteLogo: '',
  siteFavicon: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  }
};

export const siteSettingsApi = {
  async getAll() {
    return apiRequest('/admin/site-settings', {}, 'admin_site_settings', defaultSiteSettings);
  },
  
  async update(data: any) {
    return apiRequest('/admin/site-settings', {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'admin_site_settings', defaultSiteSettings);
  },
};

// =============================================================================
// Payment Settings API
// =============================================================================

const defaultPaymentSettings = {
  paymob: {
    apiKey: '',
    integrationId: '',
    iframeId: '',
    hmacSecret: '',
    enabled: false
  }
};

export const paymentApi = {
  async get() {
    return apiRequest('/admin/payment-settings', {}, 'admin_payment_settings', defaultPaymentSettings);
  },
  
  async update(data: any) {
    return apiRequest('/admin/payment-settings', {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'admin_payment_settings', defaultPaymentSettings);
  },
};

// =============================================================================
// SMTP Settings API
// =============================================================================

const defaultSMTPSettings = {
  host: '',
  port: 587,
  username: '',
  password: '',
  fromEmail: '',
  fromName: 'Outfred',
  enabled: false
};

export const smtpApi = {
  async get() {
    return apiRequest('/admin/smtp', {}, 'admin_smtp_settings', defaultSMTPSettings);
  },
  
  async update(data: any) {
    return apiRequest('/admin/smtp', {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'admin_smtp_settings', defaultSMTPSettings);
  },
  
  async sendTest(toEmail: string) {
    return apiRequest('/admin/smtp/test', {
      method: 'POST',
      body: JSON.stringify({ to_email: toEmail }),
    });
  },
};

// =============================================================================
// Subscriptions API
// =============================================================================

const defaultSubscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    name_ar: 'مجاني',
    price: 0,
    searches_limit: 5,
    features: ['5 searches per month', 'Basic support'],
    features_ar: ['5 عمليات بحث شهرياً', 'دعم أساسي']
  },
  {
    id: 'basic',
    name: 'Basic',
    name_ar: 'أساسي',
    price: 29,
    searches_limit: 100,
    features: ['100 searches per month', 'Priority support', 'Advanced filters'],
    features_ar: ['100 عملية بحث شهرياً', 'دعم أولوية', 'فلاتر متقدمة']
  },
  {
    id: 'pro',
    name: 'Pro',
    name_ar: 'احترافي',
    price: 99,
    searches_limit: 999999,
    features: ['Unlimited searches', '24/7 support', 'All features', 'API access'],
    features_ar: ['بحث غير محدود', 'دعم 24/7', 'جميع المزايا', 'وصول API']
  }
];

export const subscriptionsApi = {
  async getAll(type?: 'user' | 'merchant') {
    const query = type ? `?type=${type}` : '';
    return apiRequest(`/admin/subscriptions${query}`, {}, 'admin_subscription_plans', defaultSubscriptionPlans);
  },
  
  async update(id: string, data: any) {
    return apiRequest(`/admin/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// =============================================================================
// User Subscription Management API
// =============================================================================

export const userSubscriptionApi = {
  async updateUserSubscription(userId: string, data: any) {
    return apiRequest(`/admin/users/${userId}/subscription`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
