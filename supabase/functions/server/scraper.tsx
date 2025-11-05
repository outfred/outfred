// Product scraper with Shopify JSON API support

// Helper: Fetch products from Shopify JSON API
export const fetchFromShopifyJSON = async (url: string): Promise<any[]> => {
  try {
    console.log('🛍️ Trying Shopify JSON API...');
    
    const urlObj = new URL(url);
    
    // Construct JSON API URL
    let jsonUrl = url;
    if (url.includes('/collections/')) {
      // Convert collection URL to JSON format
      const collectionMatch = url.match(/\/collections\/([^\/\?]+)/);
      if (collectionMatch) {
        jsonUrl = `${urlObj.origin}/collections/${collectionMatch[1]}/products.json`;
      }
    } else if (url.includes('/products/')) {
      jsonUrl = `${urlObj.origin}/products.json`;
    } else {
      // Try generic products.json
      jsonUrl = `${urlObj.origin}/products.json`;
    }
    
    console.log('📡 JSON URL:', jsonUrl);
    
    // Fetch with pagination support (Shopify limits to 250 products per page)
    const allProducts: any[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 10) { // Limit to 10 pages (2500 products max)
      const pageUrl = `${jsonUrl}${jsonUrl.includes('?') ? '&' : '?'}limit=250&page=${page}`;
      console.log(`📄 Fetching page ${page}: ${pageUrl}`);
      
      const jsonResponse = await fetch(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      });
      
      if (!jsonResponse.ok) {
        if (page === 1) {
          throw new Error(`HTTP ${jsonResponse.status}`);
        } else {
          // If pagination fails, just stop
          break;
        }
      }
      
      const jsonData = await jsonResponse.json();
      console.log(`✅ Got JSON response for page ${page}`);
      console.log('📦 JSON data keys:', Object.keys(jsonData));
      
      const productsList = jsonData.products || [];
      
      console.log(`Found ${productsList.length} products on page ${page}`);
      
      if (productsList.length === 0) {
        if (page === 1) {
          console.log('⚠️ No products found in JSON response');
          console.log('JSON response:', JSON.stringify(jsonData).substring(0, 500));
        }
        hasMore = false;
      } else {
        allProducts.push(...productsList);
        // If we got less than 250, this is likely the last page
        if (productsList.length < 250) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
    
    console.log(`📊 Total products fetched: ${allProducts.length} from ${page} page(s)`);
    
    const products: any[] = [];
    
    for (const product of allProducts) {
      const variant = product.variants?.[0];
      const image = product.images?.[0];
      
      // Clean HTML from description
      const cleanDesc = (product.body_html || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
        .substring(0, 500);
      
      products.push({
        name: product.title || '',
        description: cleanDesc || product.title || '',
        price: variant?.price || product.price || '0',
        image: image?.src || '',
        category: product.product_type || 'fashion',
        url: `${urlObj.origin}/products/${product.handle}`,
        brand: product.vendor || '',
        stock: variant?.inventory_quantity || 100 // Default stock
      });
    }
    
    console.log(`✅ Extracted ${products.length} products from Shopify JSON API`);
    return products;
  } catch (error: any) {
    console.log('⚠️ Shopify JSON API error:', error?.message);
    throw error;
  }
};

// Helper: Fetch products from HTML (fallback)
export const fetchFromHTML = async (url: string): Promise<any[]> => {
  try {
    console.log('📄 Fetching HTML...');
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
    
    console.log(`Found ${pricesFound.length} prices in HTML`);
    
    const urlObj = new URL(url);
    
    for (const priceMatch of pricesFound) {
      const priceIndex = priceMatch.index || 0;
      const contextStart = Math.max(0, priceIndex - 600);
      const contextEnd = Math.min(html.length, priceIndex + 300);
      const context = html.substring(contextStart, contextEnd);
      
      // Find title
      const titleMatch = context.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i) ||
                        context.match(/<a[^>]*title=["'](.*?)["']/i) ||
                        context.match(/alt=["'](.*?)["']/i) ||
                        context.match(/product-title["'][^>]*>(.*?)</i);
      
      // Find image
      const imageMatch = context.match(/<img[^>]*src=["'](.*?)["']/) ||
                        context.match(/data-src=["'](.*?)["']/) ||
                        context.match(/srcset=["'](.*?)["']/)?.map((m: any) => m.split(' ')[0])[0];
      
      if (titleMatch) {
        const name = titleMatch[1].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, '').trim();
        const price = priceMatch[1].replace(/[^\d.]/g, '');
        let image = imageMatch ? imageMatch[1] : '';
        
        // Fix relative URLs
        if (image && !image.startsWith('http')) {
          try {
            image = new URL(image, urlObj.origin).href;
          } catch (e) {
            image = '';
          }
        }
        
        // Remove URL parameters from image (often used for resizing)
        if (image) {
          try {
            const imgUrl = new URL(image);
            // Keep only the pathname for cleaner URLs
            image = imgUrl.origin + imgUrl.pathname;
          } catch (e) {
            // Keep as is if URL parsing fails
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
    
    console.log(`✅ Extracted ${unique.length} unique products from HTML`);
    return unique;
  } catch (error: any) {
    console.error('❌ HTML scraping error:', error?.message);
    throw error;
  }
};

// Main function: Fetch products from URL (tries Shopify first, then HTML)
export const fetchProductsFromURL = async (url: string): Promise<any[]> => {
  console.log('📡 Starting product fetch from:', url);
  
  // Try Shopify JSON API first
  try {
    const products = await fetchFromShopifyJSON(url);
    if (products.length > 0) {
      return products;
    }
  } catch (shopifyError) {
    console.log('⚠️ Shopify JSON failed, trying HTML scraping...');
  }
  
  // Fallback to HTML scraping
  try {
    const products = await fetchFromHTML(url);
    return products;
  } catch (htmlError: any) {
    console.error('❌ Both Shopify and HTML scraping failed');
    throw new Error(`Failed to fetch products: ${htmlError?.message}`);
  }
};
