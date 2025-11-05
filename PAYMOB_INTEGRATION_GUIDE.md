# 🔌 Paymob Payment Integration Guide

This guide explains how to complete the Paymob payment integration for the subscription system.

## ⚠️ Current Status

The subscription system is **fully functional** with the following features:
- ✅ Free, Basic, and Pro plans configured in database
- ✅ Rate limiting based on subscription (5, 100, unlimited searches)
- ✅ Admin can manage user subscriptions
- ✅ Pricing page displays plans and allows upgrades
- ✅ Subscription expiration and auto-downgrade logic
- ⏳ **Paymob payment integration is in DEMO MODE**

Currently, when users click "Upgrade Now" on the Pricing page, the system:
1. Shows a loading animation
2. After 2 seconds, simulates successful payment
3. Upgrades the user's subscription
4. Shows success message

## 🎯 What You Need to Do

### Step 1: Get Paymob Credentials

1. Create an account at [Paymob Accept](https://accept.paymob.com/)
2. Complete KYC verification
3. Get your credentials:
   - **API Key**: From Dashboard → Settings → API Keys
   - **Integration ID**: From Dashboard → Settings → Payment Integrations
   - **iframe ID**: For hosted payment page

### Step 2: Configure Paymob in Admin Panel

1. Login as admin (`admin@outfred.com` / `admin123`)
2. Go to **Admin Panel → Configuration → Payment & SMTP**
3. Fill in Paymob settings:
   - API Key
   - Integration ID
   - iframe ID (optional)
   - HMAC Secret (for webhook verification)
4. Click **Save Settings**

### Step 3: Implement Payment Flow

The payment flow has 6 steps (see `pages/PaymobCheckout.tsx`):

#### Step 1: Authenticate
\`\`\`javascript
POST https://accept.paymob.com/api/auth/tokens
Body: { "api_key": "YOUR_API_KEY" }
Response: { "token": "auth_token" }
\`\`\`

#### Step 2: Create Order
\`\`\`javascript
POST https://accept.paymob.com/api/ecommerce/orders
Headers: { "Content-Type": "application/json" }
Body: {
  "auth_token": "token_from_step1",
  "delivery_needed": false,
  "amount_cents": 2900, // $29 = 2900 cents
  "currency": "SAR",
  "items": [{
    "name": "Basic Plan",
    "amount_cents": 2900,
    "description": "100 searches/month",
    "quantity": 1
  }]
}
Response: { "id": 123456 }
\`\`\`

#### Step 3: Generate Payment Key
\`\`\`javascript
POST https://accept.paymob.com/api/acceptance/payment_keys
Body: {
  "auth_token": "token_from_step1",
  "amount_cents": 2900,
  "expiration": 3600,
  "order_id": "order_id_from_step2",
  "billing_data": {
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+966500000000",
    "country": "SA",
    "city": "Riyadh",
    "street": "NA",
    "building": "NA",
    "floor": "NA",
    "apartment": "NA"
  },
  "currency": "SAR",
  "integration_id": YOUR_INTEGRATION_ID
}
Response: { "token": "payment_token_xyz" }
\`\`\`

#### Step 4: Redirect to Payment Page
\`\`\`javascript
// Option A: Using iframe
window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`;

// Option B: Using hosted payment page
window.location.href = `https://accept.paymob.com/api/acceptance/payments/${payment_token}`;
\`\`\`

#### Step 5: Handle Redirect Callback

After payment, Paymob redirects to your success/failure URLs with query params:
- Success: `https://yourdomain.com/payment/success?success=true`
- Failure: `https://yourdomain.com/payment/failed?success=false`

#### Step 6: Verify Webhook

**CRITICAL**: Always verify payments via webhook, not redirect URL!

Create endpoint: `POST /api/paymob/webhook`

\`\`\`javascript
// Verify HMAC signature
const hmac = crypto
  .createHmac('sha512', PAYMOB_HMAC_SECRET)
  .update(concatenated_string)
  .digest('hex');

if (hmac === received_hmac) {
  // Payment verified!
  // Update user subscription in database
}
\`\`\`

### Step 4: Update PaymobCheckout.tsx

Replace the TODO comments in `pages/PaymobCheckout.tsx` with actual Paymob API calls.

### Step 5: Create Webhook Endpoint

Create `supabase/functions/server/routes_paymob.tsx`:

\`\`\`typescript
import { Hono } from 'hono';
import * as kv from './kv_store.tsx';
import crypto from 'crypto';

export const paymobRoutes = new Hono();

paymobRoutes.post('/webhook', async (c) => {
  const payload = await c.req.json();
  
  // Get HMAC secret from settings
  const settings = await kv.get('admin:payment_settings');
  const hmacSecret = settings?.paymob_hmac_secret;
  
  // Verify HMAC
  const isValid = verifyPaymobHMAC(payload, hmacSecret);
  
  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401);
  }
  
  // Payment successful
  if (payload.success === true) {
    const userId = payload.order.items[0].description; // Store user ID here
    const plan = payload.order.items[0].name; // "Basic Plan"
    
    // Update user subscription
    const user = await kv.get(`user:${userId}`);
    user.subscription_plan = plan.toLowerCase().split(' ')[0];
    user.searches_count = 0;
    user.searches_limit = plan === 'Basic Plan' ? 100 : 999999;
    user.subscription_expires_at = Date.now() + 30 * 24 * 60 * 60 * 1000;
    user.payment_status = 'active';
    
    await kv.set(`user:${userId}`, user);
    
    // Save payment record
    await kv.set(`payment:${payload.id}`, {
      user_id: userId,
      plan: plan,
      amount: payload.amount_cents / 100,
      transaction_id: payload.id,
      status: 'success',
      paid_at: Date.now()
    });
  }
  
  return c.json({ success: true });
});

function verifyPaymobHMAC(payload: any, secret: string): boolean {
  // Concatenate specific fields as per Paymob docs
  const concatenated = [
    payload.amount_cents,
    payload.created_at,
    payload.currency,
    payload.error_occured,
    payload.has_parent_transaction,
    payload.id,
    payload.integration_id,
    payload.is_3d_secure,
    payload.is_auth,
    payload.is_capture,
    payload.is_refunded,
    payload.is_standalone_payment,
    payload.is_voided,
    payload.order.id,
    payload.owner,
    payload.pending,
    payload.source_data.pan,
    payload.source_data.sub_type,
    payload.source_data.type,
    payload.success
  ].join('');
  
  const hmac = crypto
    .createHmac('sha512', secret)
    .update(concatenated)
    .digest('hex');
  
  return hmac === payload.hmac;
}
\`\`\`

### Step 6: Add Routes to Main Server

In `supabase/functions/server/index.tsx`:

\`\`\`typescript
import { paymobRoutes } from './routes_paymob.tsx';

// Add after other routes
app.route('/api/paymob', paymobRoutes);
\`\`\`

### Step 7: Test Payment Flow

1. Go to Pricing page
2. Click "Upgrade Now" on Basic or Pro plan
3. Should redirect to Paymob payment page
4. Complete test payment using Paymob test cards
5. After successful payment, should redirect back and show success
6. Verify webhook was called and subscription updated

## 📋 Test Cards

Paymob provides test cards for development:

- **Success**: 4987654321098769
- **Declined**: 4111111111111111
- **3D Secure**: 5123456789012346

CVV: Any 3 digits
Expiry: Any future date

## 🔒 Security Checklist

- ✅ Store API keys in Admin Payment Settings (not in code)
- ✅ Always verify HMAC signature on webhook
- ✅ Use HTTPS for all API calls
- ✅ Never trust redirect URLs alone
- ✅ Log all payment transactions
- ✅ Handle edge cases (double payments, expired sessions)

## 📚 Resources

- [Paymob API Documentation](https://docs.paymob.com/)
- [Paymob Accept Dashboard](https://accept.paymob.com/)
- [Webhook Signature Verification](https://docs.paymob.com/docs/transaction-webhooks)

## 🚀 Production Deployment

Before going live:

1. Switch from test API keys to production keys
2. Configure production webhook URL in Paymob dashboard
3. Test with real small amounts
4. Set up error monitoring (Sentry, LogRocket)
5. Implement retry logic for failed API calls
6. Add email notifications for successful payments

---

**Need Help?** Contact Paymob support at support@paymob.com
