# VERCEL DEPLOYMENT - ENVIRONMENT VARIABLES GUIDE

## 🚀 Deploy Your Aura Brew CMS to Vercel

### Step 1: Connect GitHub Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `jakeharvey162-source/Aura-brew-`
4. Vercel will auto-detect Next.js configuration

### Step 2: Add Environment Variables

Copy ALL these variables into Vercel's Environment Variables section:

---

## ✅ REQUIRED ENVIRONMENT VARIABLES FOR VERCEL

### **1. SUPABASE CONFIGURATION** (REQUIRED)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
```
**Where to get it:**
- Go to [supabase.com](https://supabase.com)
- Create a new project or use existing
- Go to Settings → API → Copy "Project URL"

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Where to get it:**
- In Supabase dashboard: Settings → API → "anon" key (public)
- This is safe to expose publicly (has ANON in name)

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Where to get it:**
- In Supabase dashboard: Settings → API → "service_role" key
- ⚠️ KEEP THIS SECRET - Never commit to GitHub
- Only visible in Supabase admin panel

---

### **2. GEMINI AI CONFIGURATION** (PROVIDED)

```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAgvqakr6CEU3QqWe3doGvWO-OKGAgB5sI
```
**Status:** ✅ Already provided - copy exactly as is

```
GEMINI_API_KEY=AIzaSyAgvqakr6CEU3QqWe3doGvWO-OKGAgB5sI
```
**Status:** ✅ Same as above - use for server-side operations

---

### **3. SITE CONFIGURATION** (REQUIRED)

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```
**Replace with:**
- Your actual Vercel domain after deployment
- Example: `https://aura-brew-demo.vercel.app`
- During initial deployment: `https://your-project-name.vercel.app`

```
NEXT_PUBLIC_SITE_NAME=Aura Brew
```
**What it is:** Your coffee shop name (appears in meta tags)

```
NODE_ENV=production
```
**Value:** `production` for Vercel

```
NEXT_PUBLIC_APP_ENV=production
```
**Value:** `production` for Vercel

---

### **4. ADMIN AUTHENTICATION** (REQUIRED)

```
JWT_SECRET=your-random-32-character-string-here-12345678
```
**Generate with:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
**Or use online generator:** [Random String Generator](https://randomkeygen.com/)
**Requirements:**
- Minimum 32 characters
- Use random alphanumeric
- ⚠️ Keep secret - never share

```
ADMIN_SECRET_KEY=your-another-random-32-character-string-12345
```
**Generate same way as JWT_SECRET**
**Different value from JWT_SECRET**

```
NEXT_PUBLIC_ADMIN_URL=/admin
```
**Value:** `/admin` (admin panel path)

---

### **5. COMMUNICATION & CONTACT** (OPTIONAL BUT RECOMMENDED)

```
RESEND_API_KEY=re_1234567890abcdef1234567890
```
**Where to get it:**
- Go to [resend.com](https://resend.com)
- Create free account
- API keys → Create → Copy key
**Purpose:** Sending invitation emails to new admins

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+27701234567
```
**Replace with:** Your coffee shop's WhatsApp number
**Format:** Country code + number (e.g., +27 for South Africa)

```
NEXT_PUBLIC_SUPPORT_EMAIL=support@aurabrew.co.za
```
**Replace with:** Your support email address

```
NEXT_PUBLIC_SUPPORT_PHONE=+27701234567
```
**Replace with:** Your support phone number

---

### **6. SOCIAL MEDIA LINKS** (OPTIONAL)

```
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-handle
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/your-page
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@your-handle
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@your-channel
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/your-company
```
**Replace:** your-handle, your-page, etc. with actual social URLs

---

### **7. GOOGLE SERVICES** (OPTIONAL)

```
GOOGLE_MAPS_API_KEY=AIzaSyD_your_actual_key_here
```
**Where to get it:**
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create new project
- Enable "Maps JavaScript API"
- Create API key
- Restrict to website domain
**Purpose:** Embed Google Maps on website

```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```
**Where to get it:**
- Go to [Google Analytics](https://analytics.google.com)
- Create new property for your domain
- Copy Measurement ID
**Purpose:** Track website visitors

---

### **8. FEATURE FLAGS** (OPTIONAL)

```
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
NEXT_PUBLIC_ENABLE_BOOKINGS=true
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_LOYALTY=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```
**Values:** `true` or `false`
**Purpose:** Enable/disable features without code changes

---

## 📋 COMPLETE SETUP CHECKLIST

### Before Deploying:
- [ ] Supabase project created
- [ ] Supabase credentials copied
- [ ] JWT_SECRET generated
- [ ] ADMIN_SECRET_KEY generated
- [ ] WhatsApp number ready
- [ ] Support email ready
- [ ] (Optional) Google Maps API key
- [ ] (Optional) Google Analytics ID
- [ ] (Optional) Resend API key
- [ ] (Optional) Social media URLs

---

## 🔧 Step-by-Step Vercel Deployment

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin develop
```

### 2. Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository"
3. Find `jakeharvey162-source/Aura-brew-`
4. Click Import

### 3. Configure Environment Variables
1. In Vercel import dialog → Environment Variables
2. Add ALL variables from this guide
3. Ensure these are in **all environments** (Production, Preview, Development)

### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Access your site at the provided Vercel URL

### 5. Test Admin Panel
1. Visit `https://your-domain.vercel.app/admin/register`
2. Create Super Admin account
3. Fill in all fields including WhatsApp number
4. Login at `/admin/login`

---

## ✨ QUICK COPY-PASTE TEMPLATE

Use this template - replace the `YOUR_` parts:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Gemini AI (Pre-configured)
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAgvqakr6CEU3QqWe3doGvWO-OKGAgB5sI
GEMINI_API_KEY=AIzaSyAgvqakr6CEU3QqWe3doGvWO-OKGAgB5sI

# Site Config
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN.vercel.app
NEXT_PUBLIC_SITE_NAME=YOUR_COFFEE_SHOP_NAME
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production

# Admin Auth (Generate random strings)
JWT_SECRET=YOUR_RANDOM_32_CHAR_STRING_1
ADMIN_SECRET_KEY=YOUR_RANDOM_32_CHAR_STRING_2
NEXT_PUBLIC_ADMIN_URL=/admin

# Communication
RESEND_API_KEY=YOUR_RESEND_KEY
NEXT_PUBLIC_WHATSAPP_NUMBER=+27701234567
NEXT_PUBLIC_SUPPORT_EMAIL=support@YOUR_DOMAIN.co.za
NEXT_PUBLIC_SUPPORT_PHONE=+27701234567

# Social Media
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/YOUR_HANDLE
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/YOUR_PAGE
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@YOUR_HANDLE
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@YOUR_CHANNEL

# Google (Optional)
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Features
NEXT_PUBLIC_ENABLE_AI_ASSISTANT=true
NEXT_PUBLIC_ENABLE_BOOKINGS=true
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_LOYALTY=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🆘 Troubleshooting

### Build fails with "Module not found"
- Clear Vercel cache: Project Settings → Git → Redeploy from cache
- Check all environment variables are set

### Admin login not working
- Verify JWT_SECRET is set
- Check browser console for errors
- Ensure cookies are enabled

### Supabase connection error
- Verify SUPABASE_URL and keys are correct
- Check Supabase project is active
- Verify API keys haven't expired

### Deploy complete but site shows 404
- Verify Next.js app is building correctly
- Check `npm run build` works locally
- Review Vercel deployment logs

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Gemini API:** https://ai.google.dev

---

**🎉 Your Aura Brew platform will be live within minutes!**
