# 🔌 Outfred API Documentation - Product Import System

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Import Endpoints](#import-endpoints)
3. [Data Models](#data-models)
4. [Error Handling](#error-handling)
5. [Examples](#examples)

---

## 🔐 Authentication

All import endpoints require authentication using the `X-Access-Token` header.

### Getting Access Token

**Login:**
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "merchant@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "merchant@example.com",
    "name": "Merchant Name",
    "role": "merchant"
  }
}
\`\`\`

**Using the token:**
\`\`\`http
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

---

## 🔌 Import Endpoints

### 1. Get Available Connectors

Get list of supported import sources.

**Endpoint:**
\`\`\`http
GET /products/import/connectors
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

**Response:**
\`\`\`json
{
  "connectors": [
    {
      "slug": "csv",
      "name": "CSV/Excel",
      "type": "file",
      "fields": {},
      "mapping": {
        "name": "name",
        "price": "price",
        "image_url": "image"
      }
    },
    {
      "slug": "shopify",
      "name": "Shopify",
      "type": "api",
      "fields": {
        "apiKey": "API Key",
        "storeUrl": "Store URL"
      },
      "mapping": {
        "title": "name",
        "variants[0].price": "price"
      }
    }
  ]
}
\`\`\`

---

### 2. Start Import Session

Initialize a new product import session.

**Endpoint:**
\`\`\`http
POST /products/import/start
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

**Request Body:**
\`\`\`json
{
  "merchantId": "merchant-123",
  "sourceType": "csv",
  "sourceData": {
    "csvContent": "name,price,color,sizes...\nProduct 1,100,black,S|M|L\n..."
  },
  "options": {
    "updateExisting": true,
    "autoSync": false
  }
}
\`\`\`

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `merchantId` | string | ✅ | ID of the merchant |
| `sourceType` | string | ✅ | Type: `csv`, `website`, `api` |
| `sourceData` | object | ✅ | Source-specific data |
| `options` | object | ❌ | Import options |

**Source Data by Type:**

**CSV:**
\`\`\`json
{
  "csvContent": "name,price,...\n..."
}
\`\`\`

**Website:**
\`\`\`json
{
  "url": "https://www.example.com/products"
}
\`\`\`

**API:**
\`\`\`json
{
  "apiUrl": "https://api.example.com/products",
  "apiKey": "optional-key"
}
\`\`\`

**Options:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `updateExisting` | boolean | `false` | Update existing products |
| `autoSync` | boolean | `false` | Enable daily auto-sync |

**Response:**
\`\`\`json
{
  "success": true,
  "sessionId": "import_20251102_001a2b3c",
  "message": "Import started. Check status at /products/import/status/import_20251102_001a2b3c"
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "error": "Merchant not found"
}
\`\`\`

**Status Codes:**
- `200` - Success
- `400` - Bad Request (missing fields)
- `401` - Unauthorized
- `404` - Merchant not found
- `500` - Server error

---

### 3. Get Import Session Status

Get the current status of an import session.

**Endpoint:**
\`\`\`http
GET /products/import/status/:sessionId
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | string | Session ID from start import |

**Response:**
\`\`\`json
{
  "session": {
    "id": "import_20251102_001a2b3c",
    "merchantId": "merchant-123",
    "userId": "user-456",
    "sourceType": "csv",
    "sourceData": {
      "csvContent": "..."
    },
    "status": "processing",
    "startedAt": "2025-11-02T10:00:00.000Z",
    "completedAt": null,
    "duration": null,
    "stats": {
      "total": 100,
      "added": 45,
      "updated": 10,
      "duplicates": 5,
      "failed": 2
    },
    "logs": [
      {
        "time": "2025-11-02T10:00:01.000Z",
        "message": "Fetching data from source..."
      },
      {
        "time": "2025-11-02T10:00:03.000Z",
        "message": "Found 100 products"
      },
      {
        "time": "2025-11-02T10:00:05.000Z",
        "message": "✅ Added: Black Hoodie"
      }
    ],
    "products": [
      "product-id-1",
      "product-id-2"
    ]
  }
}
\`\`\`

**Session Status:**
- `processing` - Import in progress
- `completed` - Import completed successfully
- `failed` - Import failed

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Access denied (not your session)
- `404` - Session not found

---

### 4. Get Import History

Get list of all import sessions.

**Endpoint:**
\`\`\`http
GET /products/import/history?merchantId={merchantId}
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

**Query Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `merchantId` | string | ❌ | Filter by merchant ID |

**Response:**
\`\`\`json
{
  "sessions": [
    {
      "id": "import_20251102_001a2b3c",
      "merchantId": "merchant-123",
      "userId": "user-456",
      "sourceType": "csv",
      "status": "completed",
      "startedAt": "2025-11-02T10:00:00.000Z",
      "completedAt": "2025-11-02T10:02:30.000Z",
      "duration": 150000,
      "stats": {
        "total": 100,
        "added": 85,
        "updated": 10,
        "duplicates": 3,
        "failed": 2
      },
      "logs": [...],
      "products": [...]
    }
  ]
}
\`\`\`

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### 5. Delete Import Session

Delete an import session from history.

**Endpoint:**
\`\`\`http
DELETE /products/import/session/:sessionId
Authorization: Bearer {publicAnonKey}
X-Access-Token: {accessToken}
\`\`\`

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | string | Session ID to delete |

**Response:**
\`\`\`json
{
  "success": true
}
\`\`\`

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Access denied
- `404` - Session not found

---

## 📊 Data Models

### Import Session

\`\`\`typescript
interface ImportSession {
  id: string;                    // Unique session ID
  merchantId: string;            // Merchant ID
  userId: string;                // User who started import
  sourceType: 'csv' | 'website' | 'api';
  sourceData: {
    csvContent?: string;         // For CSV
    url?: string;                // For website/API
    apiKey?: string;             // For API
  };
  options: {
    updateExisting: boolean;     // Update duplicates
    autoSync: boolean;           // Daily sync
  };
  status: 'processing' | 'completed' | 'failed';
  startedAt: string;             // ISO 8601
  completedAt?: string;          // ISO 8601
  duration?: number;             // Milliseconds
  stats: {
    total: number;               // Total products found
    added: number;               // New products added
    updated: number;             // Products updated
    duplicates: number;          // Duplicates skipped
    failed: number;              // Failed to import
  };
  logs: Array<{
    time: string;                // ISO 8601
    message: string;             // Log message
  }>;
  products: string[];            // Array of product IDs
  error?: string;                // Error message if failed
}
\`\`\`

### Product (Enhanced)

\`\`\`typescript
interface Product {
  id: string;
  name: string;
  slug: string;                  // Generated slug
  description?: string;
  price: number;
  category?: string;
  merchantId: string;
  brand: string;
  imageUrl?: string;
  stock: number;
  color?: string;
  sizes?: string[];
  fit?: string;
  sourceUrl?: string;            // Original product URL
  importedFrom?: 'csv' | 'website' | 'api';
  importSessionId?: string;      // Session that imported it
  createdAt: string;             // ISO 8601
  updatedAt?: string;            // ISO 8601
  lastSyncedAt?: string;         // ISO 8601
}
\`\`\`

### Connector

\`\`\`typescript
interface Connector {
  slug: string;                  // Unique identifier
  name: string;                  // Display name
  type: 'api' | 'file' | 'scraper';
  fields: {
    [key: string]: string;       // Field definitions
  };
  mapping: {
    [sourceField: string]: string; // Field mappings
  };
}
\`\`\`

---

## ⚠️ Error Handling

### Error Response Format

\`\`\`json
{
  "error": "Error message",
  "debug": {
    "additionalInfo": "..."
  }
}
\`\`\`

### Common Errors

| Code | Error | Description |
|------|-------|-------------|
| `400` | Bad Request | Missing required fields |
| `401` | Unauthorized | Not authenticated |
| `403` | Forbidden | Not authorized for this resource |
| `404` | Not Found | Resource not found |
| `500` | Server Error | Internal server error |

### Error Examples

**Missing Fields:**
\`\`\`json
{
  "error": "Missing required fields: merchantId, sourceType"
}
\`\`\`

**Unauthorized:**
\`\`\`json
{
  "error": "Unauthorized"
}
\`\`\`

**Merchant Not Found:**
\`\`\`json
{
  "error": "Merchant not found"
}
\`\`\`

---

## 💡 Examples

### Example 1: CSV Import

**Step 1: Login**
\`\`\`javascript
const loginResponse = await fetch('https://[project].supabase.co/functions/v1/make-server-dec0bed9/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer [publicAnonKey]'
  },
  body: JSON.stringify({
    email: 'merchant@example.com',
    password: 'password123'
  })
});

const { accessToken } = await loginResponse.json();
\`\`\`

**Step 2: Start Import**
\`\`\`javascript
const importResponse = await fetch('https://[project].supabase.co/functions/v1/make-server-dec0bed9/products/import/start', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer [publicAnonKey]',
    'X-Access-Token': accessToken
  },
  body: JSON.stringify({
    merchantId: 'merchant-123',
    sourceType: 'csv',
    sourceData: {
      csvContent: 'name,price,color,sizes\nBlack Hoodie,650,black,M|L|XL\n...'
    },
    options: {
      updateExisting: true,
      autoSync: false
    }
  })
});

const { sessionId } = await importResponse.json();
\`\`\`

**Step 3: Poll Status**
\`\`\`javascript
const pollStatus = async () => {
  const statusResponse = await fetch(`https://[project].supabase.co/functions/v1/make-server-dec0bed9/products/import/status/${sessionId}`, {
    headers: {
      'Authorization': 'Bearer [publicAnonKey]',
      'X-Access-Token': accessToken
    }
  });
  
  const { session } = await statusResponse.json();
  
  console.log('Status:', session.status);
  console.log('Progress:', session.stats);
  
  if (session.status === 'processing') {
    setTimeout(pollStatus, 2000); // Poll every 2 seconds
  } else {
    console.log('Import completed!');
    console.log('Results:', session.stats);
  }
};

pollStatus();
\`\`\`

---

### Example 2: Website Import

\`\`\`javascript
await fetch('https://[project].supabase.co/functions/v1/make-server-dec0bed9/products/import/start', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer [publicAnonKey]',
    'X-Access-Token': accessToken
  },
  body: JSON.stringify({
    merchantId: 'merchant-123',
    sourceType: 'website',
    sourceData: {
      url: 'https://www.mybrand.com/products'
    },
    options: {
      updateExisting: true,
      autoSync: true  // Enable daily sync
    }
  })
});
\`\`\`

---

### Example 3: Using the API Client

\`\`\`typescript
import { productsApi } from './utils/api';

// Start import
const response = await productsApi.importStart({
  merchantId: 'merchant-123',
  sourceType: 'csv',
  sourceData: {
    csvContent: csvFileContent
  },
  options: {
    updateExisting: true,
    autoSync: false
  }
});

console.log('Session ID:', response.sessionId);

// Get status
const status = await productsApi.importStatus(response.sessionId);
console.log('Stats:', status.session.stats);

// Get history
const history = await productsApi.importHistory('merchant-123');
console.log('Past imports:', history.sessions);
\`\`\`

---

## 📝 Rate Limits

- **Import limit**: 1000 products per import session
- **Daily imports**: 10 sessions per merchant per day
- **Polling**: Recommended interval is 2-5 seconds

---

## 🔒 Security

- All endpoints require authentication
- Users can only access their own import sessions
- Admin users can access all sessions
- Sensitive data (API keys) are not returned in responses

---

## 📚 Additional Resources

- [Product Import System Documentation](/PRODUCT_IMPORT_SYSTEM.md)
- [Arabic Guide](/دليل_استيراد_المنتجات.md)
- [Sample CSV File](/examples/sample-products.csv)

---

**Last Updated: November 2, 2025**  
**API Version: 1.0**
