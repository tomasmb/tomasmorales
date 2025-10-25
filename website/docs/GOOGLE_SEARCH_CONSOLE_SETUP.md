# Google Search Console Setup Guide

## Quick Setup (5 minutes)

### Step 1: Add Your Property
1. Go to: https://search.google.com/search-console/welcome
2. Click **"URL prefix"** (not Domain)
3. Enter: `https://tomasmorales.dev`
4. Click **Continue**

### Step 2: Get Verification Code
1. Choose verification method: **"HTML tag"**
2. Google will show you a meta tag like:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
3. Copy the content value (e.g., `ABC123XYZ...`)

### Step 3: Update Your Site
Edit `src/lib/seo/metadata.ts`:

```typescript
verification: {
  google: 'ABC123XYZ...',  // ← Paste your code here
}
```

### Step 4: Deploy & Verify
1. Deploy your site (or wait for auto-deployment)
2. Go back to Search Console
3. Click **"Verify"**
4. ✅ Success! Your site is verified

### Step 5: Submit Sitemap
1. In Search Console, go to **"Sitemaps"** in left sidebar
2. Enter: `sitemap.xml`
3. Click **Submit**
4. ✅ Done! Google will start indexing your pages

---

## What's Already Prepared

Your site is ready for Search Console:
- ✅ `sitemap.xml` - Created and working at `/sitemap.xml`
- ✅ `robots.txt` - Created with sitemap reference
- ✅ Proper meta tags and structured data
- ✅ All pages have canonical URLs and hreflang tags

**You only need to add the verification code and deploy!**

---

## Expected Results

After 24-48 hours, you'll see:
- Pages indexed in Google
- Search performance data
- Click-through rates
- Average position in search results
- Search queries bringing users to your site

---

## Troubleshooting

**"Verification failed"**
- Make sure the code is deployed to production
- Check that you're verifying the correct URL (with https://)
- Clear your browser cache and try again

**"Sitemap can't be read"**
- Make sure your site is deployed and live
- Test: `curl https://tomasmorales.dev/sitemap.xml`

---

**Next:** After verification, consider submitting to:
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Cloudflare Analytics (if using Cloudflare)
