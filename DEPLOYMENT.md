# Deployment Guide for BC Website

## 🚀 Quick Deployment Options

### 1. GitHub Pages (Free)
```bash
# 1. Create a new repository on GitHub
# 2. Clone the repository locally
git clone https://github.com/username/bc.git
cd bc

# 3. Copy all BC files to the repository
# 4. Commit and push
git add .
git commit -m "Initial BC website deployment"
git push origin main

# 5. Enable GitHub Pages in repository settings
# Go to Settings > Pages > Select "main" branch
# Your site will be live at: https://username.github.io/bc
```

### 2. Netlify (Free tier available)
```bash
# Option A: Drag and Drop
# 1. Go to https://app.netlify.com/drop
# 2. Drag your BC folder to the drop area
# 3. Get instant live URL

# Option B: Git Integration
# 1. Push your code to GitHub
# 2. Connect your repository at netlify.com
# 3. Auto-deploy on every commit
```

### 3. Vercel (Free tier available)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
cd bc
vercel

# Follow the prompts
# Your site will be live with a vercel.app URL
```

### 4. Traditional Web Hosting
```bash
# Via FTP/SFTP
# 1. Connect to your hosting provider
# 2. Upload all files to public_html or www folder
# 3. Ensure index.html is in the root directory

# Via cPanel File Manager
# 1. Login to your hosting cPanel
# 2. Open File Manager
# 3. Upload and extract BC files to public_html
```

## 🔧 Pre-Deployment Checklist

### Content Updates
- [ ] Replace `img/logo.png` with your actual logo/photo
- [ ] Update all social media links in index.html
- [ ] Replace WhatsApp number (search for "1234567890")
- [ ] Update email address (search for "your.email@example.com")
- [ ] Replace phone number in contact section
- [ ] Update Google Analytics tracking ID
- [ ] Customize service/product descriptions
- [ ] Add your testimonials and reviews
- [ ] Update about section with your info

### Technical Updates
- [ ] Optimize images (compress for web)
- [ ] Test all links are working
- [ ] Verify responsive design on mobile
- [ ] Test dark mode toggle
- [ ] Check contact forms functionality
- [ ] Validate HTML and CSS
- [ ] Test page load speed

### SEO Updates
- [ ] Update page title and meta description
- [ ] Add proper alt text to all images
- [ ] Update OpenGraph tags
- [ ] Create sitemap.xml (optional)
- [ ] Submit to Google Search Console

## 📊 Post-Deployment Setup

### Analytics
1. **Google Analytics 4**
   - Create account at analytics.google.com
   - Replace GA_TRACKING_ID with your actual ID
   - Verify tracking is working

2. **Alternative Analytics** (Optional)
   ```html
   <!-- Plausible Analytics -->
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
   
   <!-- Simple Analytics -->
   <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
   ```

### Domain Setup
1. **Custom Domain** (if using Netlify/Vercel)
   - Add CNAME record: www -> your-app.netlify.app
   - Add A record: @ -> IP address provided
   - Enable SSL certificate

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: username.github.io (for GitHub Pages)
   
   Type: A
   Name: @
   Value: 185.199.108.153 (GitHub Pages IP)
   ```

### Performance Optimization
1. **Image Optimization**
   ```bash
   # Using ImageOptim (Mac) or TinyPNG
   # Compress all images in img/ folder
   # Target: < 100KB per image
   ```

2. **Caching Headers** (.htaccess for Apache)
   ```apache
   <IfModule mod_expires.c>
   ExpiresActive On
   ExpiresByType image/jpg "access plus 1 month"
   ExpiresByType image/jpeg "access plus 1 month"
   ExpiresByType image/gif "access plus 1 month"
   ExpiresByType image/png "access plus 1 month"
   ExpiresByType text/css "access plus 1 month"
   ExpiresByType application/pdf "access plus 1 month"
   ExpiresByType text/javascript "access plus 1 month"
   ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

## 🔍 Testing Your Deployment

### Manual Testing
- [ ] Open website on desktop browser
- [ ] Test on mobile device (iOS/Android)
- [ ] Check all navigation links
- [ ] Verify contact buttons work
- [ ] Test dark mode toggle
- [ ] Confirm social media links open correctly
- [ ] Check WhatsApp floating button

### Automated Testing
```bash
# Using Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# Check for broken links
npm install -g broken-link-checker
blc https://yourdomain.com
```

### Performance Tools
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)
- [Pingdom](https://tools.pingdom.com/)

## 🆘 Troubleshooting

### Common Issues

**Images not loading?**
- Check file paths are correct
- Ensure images are in img/ folder
- Verify file extensions match HTML references

**CSS not applying?**
- Check css/style.css path in HTML
- Clear browser cache (Ctrl+F5)
- Verify CSS file uploaded correctly

**Links not working?**
- Ensure URLs include https://
- Check for typos in href attributes
- Test external links in new tab

**Mobile display issues?**
- Verify viewport meta tag is present
- Test on actual devices, not just browser resize
- Check Bootstrap CSS is loading

### Getting Help
- 📧 **Email**: Create GitHub issue for support
- 💬 **Discord**: Join web development communities
- 📚 **Documentation**: Check Bootstrap and Font Awesome docs
- 🎥 **YouTube**: Search for "static website deployment"

---

**Congratulations! 🎉 Your BC website is now live!**

Don't forget to:
- Share your new digital hub on social media
- Add the URL to your email signature
- Include it on business cards and marketing materials
- Monitor analytics to track visitor engagement
