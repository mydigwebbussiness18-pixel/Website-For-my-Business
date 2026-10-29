# DigWeb Expert — Netlify Deployment Guide

Your DigWeb Expert website is pre-configured for **Netlify**. Everything needed for continuous deployment, single-page application (SPA) routing, and asset caching has been established.

---

## 🚀 Option 1: Automatic Deployment via GitHub (Recommended)

1. **Push your code to GitHub**:
   - Push this project repository to your GitHub account (e.g. `main` or `master` branch).

2. **Log in to Netlify**:
   - Go to [https://app.netlify.com](https://app.netlify.com).
   - Click **"Add new site"** → **"Import an existing project"**.
   - Select **GitHub** and choose your repository.

3. **Verify Build Settings** (Netlify will auto-detect from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: *(leave empty)*

4. **Add Environment Variables** (Optional — already embedded with fallbacks in code):
   - In Netlify: **Site configuration** → **Environment variables** → **Add a variable**:
     - `VITE_SUPABASE_URL`: `https://zrxedzbeowxylyxynrvk.supabase.co`
     - `VITE_SUPABASE_ANON_KEY`: `sb_publishable_OP76QK0AWCHa-jIK52Go3w_fJgrrrhj`

5. **Click "Deploy DigWeb Expert"**:
   - Netlify will build the website in seconds and give you a live URL (`https://your-site.netlify.app`).
   - You can also add your custom domain (e.g., `digwebexpert.com`) under **Domain management**.

---

## ⚡ Option 2: Instant Manual Deployment via Netlify Drop (Drag & Drop)

If you want to deploy immediately without Git:

1. Build the production files:
   ```bash
   npm run build
   ```
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the **`dist`** folder into the browser window.
4. Your website is instantly live!

---

## 🛠️ What Was Configured:

1. **`netlify.toml`**:
   - Build command: `npm run build`
   - Output publish folder: `dist`
   - Node.js runtime: Node 20
   - SPA 200 redirect rule (`/* -> /index.html`) to prevent 404s on page refresh
   - Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
   - High-performance asset caching (`Cache-Control: public, max-age=31536000, immutable`)

2. **`public/_redirects`**:
   - Fallback redirect rule copied into `dist/_redirects` on every build.

3. **Supabase Appointments Integration**:
   - Booking requests made through the contact section are stored directly in your Supabase project (`zrxedzbeowxylyxynrvk`).
