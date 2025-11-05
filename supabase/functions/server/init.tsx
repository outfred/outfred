// Initialize demo data
// This file sets up demo data for testing

import * as kv from "./kv_store.tsx";

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
};

export const initDemoData = async () => {
  try {
    // Check if demo data already initialized
    const initFlag = await kv.get('system:initialized');
    if (initFlag) {
      console.log('✅ Demo data already initialized');
      
      // Log existing users for debugging
      // Note: kv.getByPrefix returns array of values directly, not {key, value} objects
      const existingUsers = await kv.getByPrefix('user:');
      console.log('📊 Current users count:', existingUsers.length);
      
      // Check if we have any valid users
      const validUsers = existingUsers.filter((u: any) => u && u.email);
      console.log('✅ Valid users count:', validUsers.length);
      
      if (validUsers.length === 0) {
        console.log('⚠️ No valid users found, re-initializing...');
        await kv.del('system:initialized');
        // Continue to initialization below
      } else {
        validUsers.forEach((u: any) => {
          console.log('  - User:', u.email, '| Role:', u.role);
        });
        return;
      }
    }

    console.log('🚀 Initializing demo data...');

    // Create demo admin in KV store only
    const adminId = 'demo-admin-' + crypto.randomUUID();
    const hashedPassword = await hashPassword('admin123');

    const adminData = {
      id: adminId,
      email: 'admin@outfred.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      subscription_plan: 'pro',
      searches_count: 0,
      searches_limit: 999999,
      subscription_expires_at: null,
      payment_status: 'active',
      last_search_reset: Date.now(),
      createdAt: new Date().toISOString(),
      favorites: [],
      settings: {}
    };

    await kv.set(`user:${adminId}`, adminData);

    console.log('✅ Demo admin created in KV store');
    console.log('📧 Email: admin@outfred.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 Admin ID:', adminId);

    // Create some demo merchants
    const demoMerchants = [
      {
        id: crypto.randomUUID(),
        name: 'Sarah Johnson',
        brandName: 'Urban Threads',
        email: 'contact@urbanthreads.com',
        phone: '+1 555-0101',
        website: 'https://urbanthreads.com',
        description: 'Modern streetwear with sustainable materials. We focus on comfort, style, and environmental responsibility.',
        logo: '',
        status: 'approved',
        createdAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        products: []
      },
      {
        id: crypto.randomUUID(),
        name: 'Ahmed Al-Hassan',
        brandName: 'Desert Rose Fashion',
        email: 'info@desertrose.com',
        phone: '+966 50 123 4567',
        website: 'https://desertrose.com',
        description: 'Elegant Middle Eastern fashion blending traditional and contemporary styles. Premium fabrics and artisanal craftsmanship.',
        logo: '',
        status: 'approved',
        createdAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        products: []
      },
      {
        id: crypto.randomUUID(),
        name: 'Maria Garcia',
        brandName: 'Boutique Elegance',
        email: 'hello@boutiqueelegance.com',
        phone: '+1 555-0202',
        website: 'https://boutiqueelegance.com',
        description: 'Curated collection of luxury fashion pieces for the modern woman. Timeless elegance meets contemporary design.',
        logo: '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        products: []
      }
    ];

    for (const merchant of demoMerchants) {
      await kv.set(`merchant:${merchant.id}`, merchant);
    }

    console.log('✅ Demo merchants created (3 merchants)');

    // Mark initialization as complete
    await kv.set('system:initialized', {
      initialized: true,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Demo data initialization complete!');

  } catch (error) {
    console.error('❌ Error initializing demo data:', error);
  }
};
