// Database helper functions
// Uses Supabase PostgreSQL for structured data storage

interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
}

// Get database connection from environment
const getDbUrl = () => {
  return Deno.env.get('DATABASE_URL') || Deno.env.get('SUPABASE_DB_URL');
};

// Execute SQL query
export async function query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
  try {
    const dbUrl = getDbUrl();
    if (!dbUrl) {
      console.error('❌ No DATABASE_URL found');
      return { rows: [], rowCount: 0 };
    }

    // For Supabase Edge Functions, we use the Postgres client
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('📊 Executing SQL query:', sql.substring(0, 100) + '...');
    
    // Execute query using Supabase RPC or direct SQL
    const { data, error } = await supabase.rpc('execute_sql', { 
      query: sql, 
      parameters: params 
    });

    if (error) {
      console.error('❌ Database query error:', error);
      return { rows: [], rowCount: 0 };
    }

    return { 
      rows: data || [], 
      rowCount: data?.length || 0 
    };
  } catch (error: any) {
    console.error('❌ Database error:', error.message);
    return { rows: [], rowCount: 0 };
  }
}

// Helper: Get single row
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const result = await query<T>(sql, params);
  return result.rows[0] || null;
}

// Helper: Execute INSERT/UPDATE/DELETE
export async function execute(sql: string, params: any[] = []): Promise<boolean> {
  try {
    const result = await query(sql, params);
    return true;
  } catch (error) {
    console.error('❌ Execute error:', error);
    return false;
  }
}

// CMS Pages queries
export const cmsPages = {
  async getAll() {
    return await query('SELECT * FROM cms_pages ORDER BY page_key');
  },
  
  async getByKey(pageKey: string) {
    return await queryOne('SELECT * FROM cms_pages WHERE page_key = $1', [pageKey]);
  },
  
  async update(pageKey: string, data: any, userId: string) {
    const sql = `
      UPDATE cms_pages 
      SET title_en = $1, title_ar = $2, content_en = $3, content_ar = $4,
          meta_description_en = $5, meta_description_ar = $6, is_published = $7,
          updated_at = NOW(), updated_by = $8
      WHERE page_key = $9
      RETURNING *
    `;
    return await queryOne(sql, [
      data.title_en, data.title_ar, data.content_en, data.content_ar,
      data.meta_description_en, data.meta_description_ar, data.is_published,
      userId, pageKey
    ]);
  }
};

// Site Settings queries
export const siteSettings = {
  async get(settingKey: string) {
    return await queryOne('SELECT * FROM site_settings WHERE setting_key = $1', [settingKey]);
  },
  
  async getAll() {
    return await query('SELECT * FROM site_settings');
  },
  
  async upsert(settingKey: string, value: any, userId: string) {
    const sql = `
      INSERT INTO site_settings (setting_key, setting_value, updated_by)
      VALUES ($1, $2, $3)
      ON CONFLICT (setting_key) 
      DO UPDATE SET setting_value = $2, updated_at = NOW(), updated_by = $3
      RETURNING *
    `;
    return await queryOne(sql, [settingKey, JSON.stringify(value), userId]);
  }
};

// Payment Settings queries
export const paymentSettings = {
  async get() {
    return await queryOne('SELECT * FROM payment_settings LIMIT 1');
  },
  
  async upsert(data: any, userId: string) {
    const existing = await this.get();
    
    if (existing) {
      const sql = `
        UPDATE payment_settings 
        SET api_key = $1, secret_key = $2, integration_id = $3, hmac_secret = $4,
            iframe_id = $5, is_test_mode = $6, is_enabled = $7, config = $8,
            updated_at = NOW(), updated_by = $9
        RETURNING *
      `;
      return await queryOne(sql, [
        data.api_key, data.secret_key, data.integration_id, data.hmac_secret,
        data.iframe_id, data.is_test_mode, data.is_enabled, JSON.stringify(data.config || {}),
        userId
      ]);
    } else {
      const sql = `
        INSERT INTO payment_settings 
        (api_key, secret_key, integration_id, hmac_secret, iframe_id, is_test_mode, is_enabled, config, updated_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      return await queryOne(sql, [
        data.api_key, data.secret_key, data.integration_id, data.hmac_secret,
        data.iframe_id, data.is_test_mode, data.is_enabled, JSON.stringify(data.config || {}),
        userId
      ]);
    }
  }
};

// SMTP Settings queries
export const smtpSettings = {
  async get() {
    return await queryOne('SELECT * FROM smtp_settings LIMIT 1');
  },
  
  async upsert(data: any, userId: string) {
    const existing = await this.get();
    
    if (existing) {
      const sql = `
        UPDATE smtp_settings 
        SET host = $1, port = $2, username = $3, password = $4, from_email = $5,
            from_name = $6, encryption = $7, is_enabled = $8, config = $9,
            updated_at = NOW(), updated_by = $10
        RETURNING *
      `;
      return await queryOne(sql, [
        data.host, data.port, data.username, data.password, data.from_email,
        data.from_name, data.encryption, data.is_enabled, JSON.stringify(data.config || {}),
        userId
      ]);
    } else {
      const sql = `
        INSERT INTO smtp_settings 
        (host, port, username, password, from_email, from_name, encryption, is_enabled, config, updated_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      return await queryOne(sql, [
        data.host, data.port, data.username, data.password, data.from_email,
        data.from_name, data.encryption, data.is_enabled, JSON.stringify(data.config || {}),
        userId
      ]);
    }
  }
};

// Subscription Plans queries
export const subscriptionPlans = {
  async getAll(planType?: 'user' | 'merchant') {
    if (planType) {
      return await query(
        'SELECT * FROM subscription_plans WHERE plan_type = $1 AND is_active = true ORDER BY sort_order',
        [planType]
      );
    }
    return await query('SELECT * FROM subscription_plans WHERE is_active = true ORDER BY plan_type, sort_order');
  },
  
  async getById(id: string) {
    return await queryOne('SELECT * FROM subscription_plans WHERE id = $1', [id]);
  },
  
  async getFeatures(planId: string) {
    return await query(
      'SELECT * FROM subscription_features WHERE plan_id = $1 AND is_enabled = true ORDER BY sort_order',
      [planId]
    );
  },
  
  async update(id: string, data: any) {
    const sql = `
      UPDATE subscription_plans 
      SET display_name_en = $1, display_name_ar = $2, description_en = $3, description_ar = $4,
          price = $5, is_active = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `;
    return await queryOne(sql, [
      data.display_name_en, data.display_name_ar, data.description_en, data.description_ar,
      data.price, data.is_active, id
    ]);
  }
};
