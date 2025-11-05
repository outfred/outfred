-- Migration: Admin Settings Tables
-- Created: 2025-11-04
-- Description: Tables for CMS pages, site settings, payment configuration, SMTP, and subscriptions

-- CMS Pages Table
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key VARCHAR(50) UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  meta_description_en TEXT,
  meta_description_ar TEXT,
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cms_pages_key ON cms_pages(page_key);
CREATE INDEX idx_cms_pages_published ON cms_pages(is_published);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_site_settings_key ON site_settings(setting_key);

-- Payment Settings Table
CREATE TABLE IF NOT EXISTS payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider VARCHAR(50) NOT NULL DEFAULT 'paymob',
  api_key TEXT,
  secret_key TEXT,
  integration_id TEXT,
  hmac_secret TEXT,
  iframe_id TEXT,
  is_test_mode BOOLEAN DEFAULT true,
  is_enabled BOOLEAN DEFAULT false,
  config JSONB,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SMTP Settings Table
CREATE TABLE IF NOT EXISTS smtp_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host VARCHAR(255) NOT NULL,
  port INTEGER NOT NULL DEFAULT 587,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255),
  encryption VARCHAR(10) DEFAULT 'tls',
  is_enabled BOOLEAN DEFAULT false,
  config JSONB,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('user', 'merchant')),
  plan_name VARCHAR(50) NOT NULL,
  display_name_en VARCHAR(100) NOT NULL,
  display_name_ar VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'SAR',
  billing_period VARCHAR(20) DEFAULT 'monthly',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscription_plans_type ON subscription_plans(plan_type);
CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active);

-- Subscription Features Table
CREATE TABLE IF NOT EXISTS subscription_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  feature_key VARCHAR(100) NOT NULL,
  feature_name_en VARCHAR(255) NOT NULL,
  feature_name_ar VARCHAR(255) NOT NULL,
  feature_value TEXT,
  is_enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscription_features_plan ON subscription_features(plan_id);

-- Insert default CMS pages
INSERT INTO cms_pages (page_key, title_en, title_ar, content_en, content_ar, is_published) VALUES
('about', 'About Us', 'من نحن', 
 '<h2>Welcome to Outfred</h2><p>Your ultimate fashion discovery platform.</p>', 
 '<h2>مرحباً بكم في Outfred</h2><p>منصتكم الأمثل لاكتشاف الموضة.</p>', 
 true),
('privacy', 'Privacy Policy', 'سياسة الخصوصية',
 '<h2>Privacy Policy</h2><p>Your privacy is important to us.</p>',
 '<h2>سياسة الخصوصية</h2><p>خصوصيتك مهمة بالنسبة لنا.</p>',
 true),
('terms', 'Terms of Service', 'شروط الخدمة',
 '<h2>Terms of Service</h2><p>Please read these terms carefully.</p>',
 '<h2>شروط الخدمة</h2><p>يرجى قراءة هذه الشروط بعناية.</p>',
 true),
('contact', 'Contact Us', 'اتصل بنا',
 '<h2>Contact Us</h2><p>Get in touch with our team.</p>',
 '<h2>اتصل بنا</h2><p>تواصل مع فريقنا.</p>',
 true)
ON CONFLICT (page_key) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('seo', '{"siteName_en": "Outfred", "siteName_ar": "Outfred", "tagline_en": "Discover Fashion", "tagline_ar": "اكتشف الموضة", "metaDescription_en": "Your ultimate fashion discovery platform", "metaDescription_ar": "منصتك الأمثل لاكتشاف الموضة", "keywords_en": "fashion, shopping, saudi arabia", "keywords_ar": "موضة, تسوق, السعودية"}'),
('branding', '{"logoUrl": "", "faviconUrl": "", "primaryColor": "#3B1728", "accentColor": "#8B4665"}'),
('contact', '{"email": "info@outfred.com", "phone": "+966 XX XXX XXXX", "address_en": "Riyadh, Saudi Arabia", "address_ar": "الرياض، المملكة العربية السعودية"}'),
('social', '{"facebook": "", "twitter": "", "instagram": "", "linkedin": "", "tiktok": "", "snapchat": ""}'),
('footer', '{"copyrightText_en": "© 2024 Outfred. All rights reserved.", "copyrightText_ar": "© ٢٠٢٤ Outfred. جميع الحقوق محفوظة.", "showSocialLinks": true, "showNewsletter": true}')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default subscription plans (User Plans)
INSERT INTO subscription_plans (plan_type, plan_name, display_name_en, display_name_ar, description_en, description_ar, price, billing_period, sort_order) VALUES
('user', 'free', 'Free', 'مجاني', 'Basic features for casual shoppers', 'ميزات أساسية للمتسوقين العاديين', 0, 'monthly', 1),
('user', 'basic', 'Basic', 'أساسي', 'Enhanced features for regular users', 'ميزات محسنة للمستخدمين العاديين', 29, 'monthly', 2),
('user', 'pro', 'Pro', 'احترافي', 'Premium features for fashion enthusiasts', 'ميزات متميزة لعشاق الموضة', 99, 'monthly', 3)
ON CONFLICT DO NOTHING;

-- Insert default subscription plans (Merchant Plans)
INSERT INTO subscription_plans (plan_type, plan_name, display_name_en, display_name_ar, description_en, description_ar, price, billing_period, sort_order) VALUES
('merchant', 'basic', 'Basic Store', 'متجر أساسي', 'Essential features for small merchants', 'ميزات أساسية للتجار الصغار', 199, 'monthly', 1),
('merchant', 'silver', 'Silver Store', 'متجر فضي', 'Advanced features for growing businesses', 'ميزات متقدمة للأعمال المتنامية', 499, 'monthly', 2),
('merchant', 'gold', 'Gold Store', 'متجر ذهبي', 'Premium features for established brands', 'ميزات متميزة للعلامات التجارية الراسخة', 999, 'monthly', 3)
ON CONFLICT DO NOTHING;
