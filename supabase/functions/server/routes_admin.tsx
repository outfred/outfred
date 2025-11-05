// Admin Routes Module
// Backend endpoints for admin panel features

import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const adminRoutes = new Hono();

// Helper: Verify admin role
const requireAdmin = async (c: any, next: any) => {
  const user = c.get('user');
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }
  await next();
};

// Helper: Get database client
const getDb = async () => {
  const dbUrl = Deno.env.get('DATABASE_URL');
  if (!dbUrl) throw new Error('DATABASE_URL not found');
  
  // Import Postgres client
  const { Client } = await import('https://deno.land/x/postgres@v0.17.0/mod.ts');
  const client = new Client(dbUrl);
  await client.connect();
  return client;
};

// =============================================================================
// CMS ROUTES
// =============================================================================

// Get all CMS pages
adminRoutes.get('/cms', requireAdmin, async (c) => {
  let client;
  try {
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM cms_pages ORDER BY page_key'
    );
    
    return c.json({ pages: result.rows });
  } catch (error: any) {
    console.error('Error fetching CMS pages:', error);
    return c.json({ error: 'Failed to fetch CMS pages' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Get single CMS page
adminRoutes.get('/cms/:pageKey', requireAdmin, async (c) => {
  let client;
  try {
    const pageKey = c.req.param('pageKey');
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM cms_pages WHERE page_key = $1',
      [pageKey]
    );
    
    if (result.rows.length === 0) {
      return c.json({ error: 'Page not found' }, 404);
    }
    
    return c.json({ page: result.rows[0] });
  } catch (error: any) {
    console.error('Error fetching CMS page:', error);
    return c.json({ error: 'Failed to fetch CMS page' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Update CMS page
adminRoutes.put('/cms/:pageKey', requireAdmin, async (c) => {
  let client;
  try {
    const pageKey = c.req.param('pageKey');
    const user = c.get('user');
    const body = await c.req.json();
    
    client = await getDb();
    const result = await client.queryObject(
      `UPDATE cms_pages 
       SET title_en = $1, title_ar = $2, content_en = $3, content_ar = $4,
           meta_description_en = $5, meta_description_ar = $6, is_published = $7,
           updated_at = NOW(), updated_by = $8
       WHERE page_key = $9
       RETURNING *`,
      [
        body.title_en, body.title_ar, body.content_en, body.content_ar,
        body.meta_description_en || '', body.meta_description_ar || '', 
        body.is_published !== false, user.id, pageKey
      ]
    );
    
    if (result.rows.length === 0) {
      return c.json({ error: 'Page not found' }, 404);
    }
    
    return c.json({ success: true, page: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating CMS page:', error);
    return c.json({ error: 'Failed to update CMS page' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// =============================================================================
// SITE SETTINGS ROUTES
// =============================================================================

// Get all site settings
adminRoutes.get('/site-settings', requireAdmin, async (c) => {
  let client;
  try {
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM site_settings ORDER BY setting_key'
    );
    
    // Transform to key-value object
    const settings: any = {};
    for (const row of result.rows) {
      const r = row as any;
      settings[r.setting_key] = r.setting_value;
    }
    
    return c.json({ settings });
  } catch (error: any) {
    console.error('Error fetching site settings:', error);
    return c.json({ error: 'Failed to fetch site settings' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Update site setting
adminRoutes.put('/site-settings/:key', requireAdmin, async (c) => {
  let client;
  try {
    const settingKey = c.req.param('key');
    const user = c.get('user');
    const body = await c.req.json();
    
    client = await getDb();
    const result = await client.queryObject(
      `INSERT INTO site_settings (setting_key, setting_value, updated_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (setting_key) 
       DO UPDATE SET setting_value = $2, updated_at = NOW(), updated_by = $3
       RETURNING *`,
      [settingKey, JSON.stringify(body.value), user.id]
    );
    
    return c.json({ success: true, setting: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating site setting:', error);
    return c.json({ error: 'Failed to update site setting' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// =============================================================================
// PAYMENT SETTINGS ROUTES
// =============================================================================

// Get payment settings
adminRoutes.get('/payment-settings', requireAdmin, async (c) => {
  let client;
  try {
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM payment_settings LIMIT 1'
    );
    
    return c.json({ settings: result.rows[0] || null });
  } catch (error: any) {
    console.error('Error fetching payment settings:', error);
    return c.json({ error: 'Failed to fetch payment settings' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Update payment settings
adminRoutes.put('/payment-settings', requireAdmin, async (c) => {
  let client;
  try {
    const user = c.get('user');
    const body = await c.req.json();
    
    client = await getDb();
    
    // Check if settings exist
    const existing = await client.queryObject('SELECT id FROM payment_settings LIMIT 1');
    
    let result;
    if (existing.rows.length > 0) {
      result = await client.queryObject(
        `UPDATE payment_settings 
         SET api_key = $1, secret_key = $2, integration_id = $3, hmac_secret = $4,
             iframe_id = $5, is_test_mode = $6, is_enabled = $7, config = $8,
             updated_at = NOW(), updated_by = $9
         RETURNING *`,
        [
          body.api_key || '', body.secret_key || '', body.integration_id || '', 
          body.hmac_secret || '', body.iframe_id || '', body.is_test_mode !== false, 
          body.is_enabled === true, JSON.stringify(body.config || {}), user.id
        ]
      );
    } else {
      result = await client.queryObject(
        `INSERT INTO payment_settings 
         (api_key, secret_key, integration_id, hmac_secret, iframe_id, is_test_mode, is_enabled, config, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          body.api_key || '', body.secret_key || '', body.integration_id || '', 
          body.hmac_secret || '', body.iframe_id || '', body.is_test_mode !== false, 
          body.is_enabled === true, JSON.stringify(body.config || {}), user.id
        ]
      );
    }
    
    return c.json({ success: true, settings: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating payment settings:', error);
    return c.json({ error: 'Failed to update payment settings' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// =============================================================================
// SMTP SETTINGS ROUTES
// =============================================================================

// Get SMTP settings
adminRoutes.get('/smtp', requireAdmin, async (c) => {
  let client;
  try {
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM smtp_settings LIMIT 1'
    );
    
    return c.json({ settings: result.rows[0] || null });
  } catch (error: any) {
    console.error('Error fetching SMTP settings:', error);
    return c.json({ error: 'Failed to fetch SMTP settings' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Update SMTP settings
adminRoutes.put('/smtp', requireAdmin, async (c) => {
  let client;
  try {
    const user = c.get('user');
    const body = await c.req.json();
    
    client = await getDb();
    
    // Check if settings exist
    const existing = await client.queryObject('SELECT id FROM smtp_settings LIMIT 1');
    
    let result;
    if (existing.rows.length > 0) {
      result = await client.queryObject(
        `UPDATE smtp_settings 
         SET host = $1, port = $2, username = $3, password = $4, from_email = $5,
             from_name = $6, encryption = $7, is_enabled = $8, config = $9,
             updated_at = NOW(), updated_by = $10
         RETURNING *`,
        [
          body.host, body.port || 587, body.username, body.password, body.from_email,
          body.from_name || '', body.encryption || 'tls', body.is_enabled === true, 
          JSON.stringify(body.config || {}), user.id
        ]
      );
    } else {
      result = await client.queryObject(
        `INSERT INTO smtp_settings 
         (host, port, username, password, from_email, from_name, encryption, is_enabled, config, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          body.host, body.port || 587, body.username, body.password, body.from_email,
          body.from_name || '', body.encryption || 'tls', body.is_enabled === true, 
          JSON.stringify(body.config || {}), user.id
        ]
      );
    }
    
    return c.json({ success: true, settings: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating SMTP settings:', error);
    return c.json({ error: 'Failed to update SMTP settings' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Send test email
adminRoutes.post('/smtp/test', requireAdmin, async (c) => {
  let client;
  try {
    const body = await c.req.json();
    const { to_email } = body;
    
    if (!to_email) {
      return c.json({ error: 'Recipient email is required' }, 400);
    }
    
    // Get SMTP settings
    client = await getDb();
    const result = await client.queryObject(
      'SELECT * FROM smtp_settings WHERE is_enabled = true LIMIT 1'
    );
    
    if (result.rows.length === 0) {
      return c.json({ error: 'SMTP is not configured or enabled' }, 400);
    }
    
    const settings = result.rows[0] as any;
    
    // TODO: Implement actual email sending
    // For now, just validate settings and return success
    console.log('📧 Test email would be sent to:', to_email);
    console.log('📧 SMTP config:', { 
      host: settings.host, 
      port: settings.port, 
      from: settings.from_email 
    });
    
    return c.json({ 
      success: true, 
      message: `Test email sent to ${to_email}`,
      note: 'Email sending not yet implemented - this is a simulation'
    });
  } catch (error: any) {
    console.error('Error sending test email:', error);
    return c.json({ error: 'Failed to send test email' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// =============================================================================
// SUBSCRIPTION ROUTES
// =============================================================================

// Get all subscription plans
adminRoutes.get('/subscriptions', requireAdmin, async (c) => {
  let client;
  try {
    const planType = c.req.query('type'); // 'user' or 'merchant'
    
    client = await getDb();
    let result;
    
    if (planType) {
      result = await client.queryObject(
        'SELECT * FROM subscription_plans WHERE plan_type = $1 ORDER BY sort_order',
        [planType]
      );
    } else {
      result = await client.queryObject(
        'SELECT * FROM subscription_plans ORDER BY plan_type, sort_order'
      );
    }
    
    return c.json({ plans: result.rows });
  } catch (error: any) {
    console.error('Error fetching subscription plans:', error);
    return c.json({ error: 'Failed to fetch subscription plans' }, 500);
  } finally {
    if (client) await client.end();
  }
});

// Update subscription plan
adminRoutes.put('/subscriptions/:id', requireAdmin, async (c) => {
  let client;
  try {
    const planId = c.req.param('id');
    const body = await c.req.json();
    
    client = await getDb();
    const result = await client.queryObject(
      `UPDATE subscription_plans 
       SET display_name_en = $1, display_name_ar = $2, description_en = $3, description_ar = $4,
           price = $5, is_active = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [
        body.display_name_en, body.display_name_ar, body.description_en, body.description_ar,
        body.price, body.is_active !== false, planId
      ]
    );
    
    if (result.rows.length === 0) {
      return c.json({ error: 'Plan not found' }, 404);
    }
    
    return c.json({ success: true, plan: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating subscription plan:', error);
    return c.json({ error: 'Failed to update subscription plan' }, 500);
  } finally {
    if (client) await client.end();
  }
});

export default adminRoutes;
