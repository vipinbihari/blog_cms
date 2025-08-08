/**
 * Service Worker for PWA Install Support
 * --------------------------------------
 * PURPOSE
 *   Provides basic service worker functionality to enable PWA install prompts
 *   Minimal implementation focused on installation support only
 * 
 * FEATURES
 *   - PWA install prompt enablement
 *   - Basic cache management for core assets
 *   - Offline fallback for navigation requests
 */

const CACHE_NAME = 'blog-pwa-v1';
const CORE_ASSETS = [
  '/',
  '/offline/',
  '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Error caching core assets:', error);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
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

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests for offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                return response;
              }
              // Fallback to offline page if available
              return caches.match('/offline/') || new Response(
                '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              );
            });
        })
    );
  }
  
  // For other requests, use network-first strategy
  else if (event.request.method === 'GET') {
    // Only handle same-origin http(s) requests; ignore chrome-extension and other schemes
    const url = new URL(event.request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return; // Let the request pass through without SW handling
    }
    if (url.origin !== self.location.origin) {
      return; // Skip third-party requests to avoid caching cross-origin resources
    }

    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone))
              .catch((err) => {
                // Some requests cannot be cached; ignore these safely
                console.warn('[SW] Skipping cache.put for', event.request.url, err);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(event.request);
        })
    );
  }
});
