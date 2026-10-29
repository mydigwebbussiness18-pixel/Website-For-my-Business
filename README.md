# DigWeb Expert — Official Business Website

Modern, responsive business website for **DigWeb Expert** founded by **Mr. Harshadsinh Solanki**.

## 1. Project Overview & Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Modern dark navy aesthetic `#0B1220`, electric blue `#2563EB`, slate `#64748B`, white `#FFFFFF`)
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans & JetBrains Mono

---

## 2. Central Configuration File
All business information is managed in one central file:
```
src/config/businessConfig.ts
```
Editing this file automatically updates all 8 website sections:
- Business name & tagline
- Founder details & photo path
- WhatsApp number (`+91 9875274952`)
- Email (`mydigwebbussiness.18@gmail.com`)
- Instagram username & link (`@digweb__expert__18`)
- 4 Primary services & features
- 6 Demo portfolio projects
- Promotional offers & activation flags
- Copyright & legal text

---

## 3. Section Order
1. **Home / Hero:** Value proposition, official logo, action buttons, floating WhatsApp button.
2. **Our Services:** 4 core services (Website Development, Meta Ads, Graphic Design, Google Business Profile Setup) with "Know More" detail modal and "Get This Service" prefilled WhatsApp action.
3. **Portfolio / Our Work:** 6 demo projects with category filters (Website Development, Graphic Design), status labels ("Demo Project", "Concept Project"), and external link warnings.
4. **Current Offers:** Dynamic offer cards with expiry dates, or the required neutral announcement notice when no offers are active.
5. **Customer Reviews:** Approved client reviews list + Submit Your Review form (1–5 stars) + Owner Moderation Desk for review approval/rejection.
6. **About Us / Founder:** Real photograph of Mr. Harshadsinh Solanki, designation, personal introduction, direct contact channels.
7. **Contact Us:** WhatsApp button, Instagram link, Email mailto link, and validated Contact Enquiry form.
8. **Footer:** Logo, business description, navigation links, services, direct channels, dynamic copyright year, and Privacy Policy modal.

---

## 4. Local Development & Deployment
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Build for production (Netlify / Vercel / Cloudflare)
npm run build
```
- **Netlify Build Command:** `npm run build`
- **Publish Directory:** `dist`
