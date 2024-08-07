// Import the Workbox library from a CDN
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js",
);

// Register a route to cache images using the Cache First strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst(),
);

// Register a route to fetch scripts using the Network First strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === "script",
  new workbox.strategies.NetworkFirst(),
);

// Register a specific route for the Font Awesome script to cache it
workbox.routing.registerRoute(
  ({ url }) => url.href === "https://kit.fontawesome.com/77df4eb855.js",
  new workbox.strategies.CacheFirst(),
);

// Register routes for Google Fonts
// Cache the CSS file from Google Fonts using Stale While Revalidate strategy
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the font files from Google Fonts using Cache First strategy
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // Cache for one year
        maxEntries: 30, // Maximum number of entries to cache
      }),
    ],
  })
);

