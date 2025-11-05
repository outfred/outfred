# 🔐 Authentication System - Outfred

## Overview
This project uses a **custom token-based authentication** system instead of Supabase Auth.

## Why Custom Headers?

### Problem
Supabase Edge Functions automatically validate JWT tokens in the `Authorization` header. Our simple base64-encoded tokens would fail this validation with "Invalid JWT" error.

### Solution
We use a **custom header** `X-Access-Token` for our authentication tokens:
- `Authorization: Bearer ${SUPABASE_ANON_KEY}` - Always sent for Edge Function access
- `X-Access-Token: ${USER_TOKEN}` - Sent only for authenticated requests

## Token Format

Our tokens are simple base64-encoded JSON:
\`\`\`javascript
{
  userId: "uuid",
  timestamp: 1234567890
}
\`\`\`

Tokens expire after **30 days**.

## Headers Flow

### Public Endpoints (no auth required)
\`\`\`javascript
headers: {
  'Authorization': 'Bearer ${SUPABASE_ANON_KEY}',
  'Content-Type': 'application/json'
}
\`\`\`

### Protected Endpoints (auth required)
\`\`\`javascript
headers: {
  'Authorization': 'Bearer ${SUPABASE_ANON_KEY}',
  'X-Access-Token': '${USER_TOKEN}',
  'Content-Type': 'application/json'
}
\`\`\`

## Server-side Authentication

\`\`\`typescript
const authenticate = async (c: any) => {
  const accessToken = c.req.header('X-Access-Token');
  // Verify token and return user data
}
\`\`\`

## Client-side Usage

### Login
\`\`\`typescript
const { accessToken, user } = await authApi.login({ email, password });
localStorage.setItem('accessToken', accessToken);
\`\`\`

### Making Authenticated Requests
\`\`\`typescript
api('/admin/users', { requireAuth: true })
// Automatically adds X-Access-Token header
\`\`\`

## CORS Configuration

The server allows these headers:
- `Content-Type`
- `Authorization`
- `X-Access-Token` ← Custom header

## Demo Credentials

**Admin Account:**
- Email: `admin@outfred.com`
- Password: `admin123`
- **Status**: ✅ Active (created by default)

**Note:** Currently only the admin account is available. Additional accounts can be created through registration.

## Troubleshooting

If you encounter **"Invalid credentials"** error:

1. **Check Database Status**
   - Open the Debug Panel (`/debug`)
   - Click "Check DB Status"
   - Verify that users exist in database

2. **Reset Demo Data**
   - If no users found, click "Reset Demo Data"
   - This will re-create the admin account

3. **Verify Credentials**
   - Make sure you're using: `admin@outfred.com` / `admin123`
   - Check for typos or extra spaces

4. **Check Browser Console**
   - Open DevTools (F12)
   - Look for detailed error messages
   - Check Network tab for API responses

For detailed troubleshooting guide, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Testing

Use the **Debug Panel** to test authentication:
1. Test Login - Creates token and stores it
2. Test Authentication - Verifies stored token
3. Test Admin Analytics - Tests protected endpoint

## Important Notes

⚠️ **Do not remove** the `Authorization` header - Supabase needs it for Edge Function access
⚠️ **Always use** `X-Access-Token` for user authentication
⚠️ **Never send** user tokens in `Authorization` header
