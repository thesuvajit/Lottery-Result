# 🎟️ Lottery Result — Official Daily Draws (1 PM | 6 PM | 8 PM)

A modern, high-performance, and responsive web application designed for displaying official daily lottery draw results instantly, featuring authentic government gazette style result sheets, live API synchronization, previous day archives, and an admin control dashboard.

---

## ✨ Features

- **🕒 3 Daily Draw Slots**: Instant switching between **1:00 PM (Morning)**, **6:00 PM (Day)**, and **8:00 PM (Night)** draws.
- **📜 Authentic Gazette Style Sheets**: High-fidelity vector bulletin sheets matching official Directorate of State Lotteries publications (1st Prize ₹1 Crore, Consolation, 2nd, 3rd, 4th, and all 100 numbers of 5th Prize).
- **📅 Previous Day Results Archive**: Stacked visual display of all 3 draws from yesterday with zero-latency pre-seeded loading and quick filter tabs.
- **🔄 Live API Synchronization**: Integrated with Dear Lottery Results API (`https://indialotteryapi.com/wp-json/dearlottery/v1`) with automatic slot detection, auto-refresh, and local storage fallback.
- **⚙️ Admin Dashboard & Control Panel**: Password-protected (`PIN: 1234` by default) management portal (`admin.html`) to manually adjust winning numbers, toggle draw status, upload/update scan sheets, and sync live API.
- **🌓 Dark & Light Modes**: System-aware with persistent manual toggle and high-contrast color palettes.
- **📱 Fully Responsive**: Optimized for all devices from small smartphones to wide desktop monitors.
- **🔍 Full-Resolution Sheet Lightbox**: Tap or click any result sheet to inspect fine details in high-res modal.

---

## 📁 Project Structure

```
├── index.html                   # Main public lottery result interface
├── admin.html                   # Secure admin control panel
├── vercel.json                  # Vercel deployment & routing configuration (/admin -> /admin.html)
├── server.js                    # Local development server with clean routing
├── .gitignore                   # Ignored files configuration
├── css/
│   ├── style.css                # Design system & stylesheet for main site
│   └── admin.css                # Stylesheet for admin panel
├── js/
│   ├── app.js                   # Application logic, API fetching, sheet renderer
│   └── admin.js                 # Admin panel logic, authentication, and state manager
├── assets/
│   ├── lottery_sheet_1pm.jpg    # 1 PM result bulletin sheet
│   ├── lottery_sheet_6pm.jpg    # 6 PM result bulletin sheet
│   └── lottery_sheet_8pm.jpg    # 8 PM result bulletin sheet
├── yesterday_cache.json         # Seed / cached draw data
└── yesterday_seed.json          # Formatted seed data
```

---

## 🚀 Deployment on Vercel

This project is fully optimized for **[Vercel](https://vercel.com/)** with instant global Edge CDN and automated continuous deployment:

### Method 1: Import via Vercel Dashboard (Recommended)

1. Log in to [Vercel](https://vercel.com/).
2. Click **"Add New..."** &rarr; **"Project"**.
3. Under **Import Git Repository**, select `thesuvajit/Lottery-Result`.
4. Keep the default settings:
   - **Framework Preset**: `Other` (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: *(leave empty)*
   - **Output Directory**: *(leave empty)*
5. Click **"Deploy"**.
6. Your lottery site will be live instantly with a free `.vercel.app` domain, automatic SSL/HTTPS, and zero configuration!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy directly from your terminal
vercel
```

---

## 💻 Local Development / Preview

To test or run locally:

```bash
# Using Node (starts server on port 3000, 5500, and 8080)
node server.js

# Or using npx serve
npx serve .
```

Then open `http://localhost:3000` in your web browser.

---

## 🔒 Admin Access

- Access the Admin Dashboard via: `http://localhost:3000/admin` (or `http://localhost:3000/admin.html`)
- On Vercel: `https://your-site.vercel.app/admin`
- Default PIN: `1234`
