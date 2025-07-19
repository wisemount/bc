# BC Website Configuration

## 🔧 Environment Setup

### Local Development
```bash
# Simply open index.html in your browser
# No build process required!

# Optional: Use a local server for testing
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Production Deployment

#### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source: "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at: `https://username.github.io/repository-name`

#### Netlify
1. Drag and drop the `bc` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments
3. Custom domain setup available

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts

#### Traditional Hosting
- Upload all files to your web server's public folder
- Ensure `index.html` is in the root directory
- Configure your domain's DNS settings

## 🎨 Customization Variables

### Primary Branding
```css
--primary-color: #6366f1;      /* Main brand color */
--secondary-color: #8b5cf6;    /* Secondary brand color */
```

### Content Updates
- **Profile Image**: Replace `img/logo.png` with your photo/logo
- **Contact Info**: Update email, phone, and WhatsApp links
- **Social Links**: Replace with your actual social media URLs
- **Google Analytics**: Replace `GA_TRACKING_ID` with your tracking ID

## 📊 Analytics Setup

### Google Analytics 4
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create new property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Replace `GA_TRACKING_ID` in index.html

### Other Analytics Options
- **Plausible**: Privacy-focused, GDPR compliant
- **Fathom**: Simple, privacy-first analytics
- **Umami**: Open-source, self-hosted
- **Simple Analytics**: Minimal, privacy-focused

## 🔍 SEO Configuration

### Required Updates
1. **Title Tag**: Update with your name/brand
2. **Meta Description**: Write compelling description
3. **OpenGraph Image**: Add your logo/photo URL
4. **Structured Data**: Add JSON-LD for rich snippets

### Sitemap Generation
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-19</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🚀 Performance Optimization

### Image Optimization
- Use WebP format when possible
- Compress images (TinyPNG, ImageOptim)
- Proper sizing (don't use CSS to resize)
- Add alt text for accessibility

### Loading Speed
- Minimize HTTP requests
- Use CDN for external resources
- Enable Gzip compression on server
- Leverage browser caching

## 🔒 Security Headers

Add these to your hosting configuration:

```
# .htaccess (Apache)
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy strict-origin-when-cross-origin

# _headers (Netlify)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## 📱 PWA Setup (Optional)

### Manifest File
Create `manifest.json`:
```json
{
  "name": "BC - Your Digital Hub",
  "short_name": "BC",
  "description": "Personal and professional digital hub",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#6366f1",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "img/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "img/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
Create `sw.js` for offline functionality:
```javascript
const CACHE_NAME = 'bc-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/img/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 🎯 Conversion Optimization

### A/B Testing Ideas
- CTA button colors and text
- Hero section messaging
- Service/product descriptions
- Contact form vs. direct links
- Social proof placement

### Tracking Events
```javascript
// Google Analytics 4 events
gtag('event', 'click', {
  event_category: 'CTA',
  event_label: 'WhatsApp Contact'
});
```

## 📞 Support

For technical questions:
- 📧 Email: support@yourbc.com
- 💬 WhatsApp: [Contact Support](https://wa.me/1234567890)
- 🐛 GitHub Issues: [Report Bug](https://github.com/username/bc/issues)

---

*Keep this file updated as you customize your BC site!*
