/**
 * Enhanced Service Worker for FinHux Blog CMS
 * --------------------------------------------
 * Advanced caching strategies for optimal performance
 * 
 * STRATEGIES:
 * - Static assets: Cache-first with long TTL
 * - Images: Cache-first with network fallback
 * - API/JSON: Network-first with cache fallback
 * - HTML pages: Network-first for freshness
 */

const CACHE_VERSION = 'v2';
const CACHE_NAMES = {
  STATIC: `static-${CACHE_VERSION}`,
  IMAGES: `images-${CACHE_VERSION}`,
  RUNTIME: `runtime-${CACHE_VERSION}`
};

// Core assets to cache on install
const CORE_ASSETS = [
  '/',
  '/offline/',
  '/manifest.json',
  '/favicon.svg',
  '/images/logo-light.svg',
  '/images/logo-dark.svg'
];

// Asset types and their cache strategies
const CACHE_STRATEGIES = {
  // Cache-first for static assets (CSS, JS, fonts)
  static: {
    pattern: /\.(css|js|woff2?|ttf|eot|otf)$/i,
    cacheName: CACHE_NAMES.STATIC,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  // Cache-first for images
  images: {
    pattern: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i,
    cacheName: CACHE_NAMES.IMAGES,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  // Network-first for HTML and API
  runtime: {
    pattern: /\.(html?|json)$/i,
    cacheName: CACHE_NAMES.RUNTIME,
    maxAge: 60 * 60 * 1000 // 1 hour
  }
};

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW Enhanced] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAMES.STATIC)
      .then((cache) => {
        console.log('[SW Enhanced] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .catch((error) => {
        console.error('[SW Enhanced] Error caching core assets:', error);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW Enhanced] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!Object.values(CACHE_NAMES).includes(cacheName)) {
              console.log('[SW Enhanced] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

// Helper: Determine cache strategy for a request
function getCacheStrategy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check each strategy pattern
  for (const [key, strategy] of Object.entries(CACHE_STRATEGIES)) {
    if (strategy.pattern.test(pathname)) {
      return strategy;
    }
  }
  
  // Default to runtime strategy for HTML
  if (request.mode === 'navigate' || pathname.endsWith('/')) {
    return CACHE_STRATEGIES.runtime;
  }
  
  return null;
}

// Helper: Check if cached response is still fresh
function isCacheFresh(response, maxAge) {
  if (!response) return false;
  
  const fetchDate = response.headers.get('date');
  if (!fetchDate) return true; // If no date header, assume fresh
  
  const age = Date.now() - new Date(fetchDate).getTime();
  return age < maxAge;
}

// Cache-first strategy
async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && isCacheFresh(cachedResponse, maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return stale cache if network fails
    if (cachedResponse) {
      console.log('[SW Enhanced] Serving stale cache for:', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Network-first strategy
async function networkFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW Enhanced] Network failed, serving from cache:', request.url);
      return cachedResponse;
    }
    
    // For navigation requests, show offline page
    if (request.mode === 'navigate') {
      const offlineResponse = await cache.match('/offline/');
      if (offlineResponse) return offlineResponse;
    }
    
    throw error;
  }
}

// Fetch event - apply cache strategies
self.addEventListener('fetch', (event) => {
  // Only handle same-origin http(s) requests
  const url = new URL(event.request.url);
  
  // Skip non-http(s) protocols (like chrome-extension://)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Determine cache strategy
  const strategy = getCacheStrategy(event.request);
  
  if (!strategy) {
    // No strategy defined, use network-only
    return;
  }
  
  // Apply the appropriate strategy
  event.respondWith(
    (async () => {
      try {
        // Check if it's a static asset (cache-first)
        if (strategy === CACHE_STRATEGIES.static || strategy === CACHE_STRATEGIES.images) {
          return await cacheFirst(event.request, strategy.cacheName, strategy.maxAge);
        }
        
        // For runtime resources (network-first)
        return await networkFirst(event.request, strategy.cacheName, strategy.maxAge);
        
      } catch (error) {
        console.error('[SW Enhanced] Fetch failed:', error);
        
        // Last resort: offline page for navigation
        if (event.request.mode === 'navigate') {
          const offlinePage = await caches.match('/offline/');
          if (offlinePage) return offlinePage;
          
          return new Response(
            '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
        
        // For other resources, return error
        return new Response('Network error', { status: 408 });
      }
    })()
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Clear all caches on demand
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      })
    );
  }
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-posts') {
    console.log('[SW Enhanced] Background sync triggered');
    // Implement background sync for offline actions
  }
});
