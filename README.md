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
├── _redirects                   # Netlify routing configuration (/admin -> /admin.html)
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

## 🚀 Deployment on Netlify

This project is a 100% static web application and deploys instantly on Netlify:

1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** &rarr; **"Import an existing project"**.
3. Choose **GitHub** and select the repository `thesuvajit/Lottery-Result`.
4. Leave build settings as default:
   - **Base directory**: *(leave empty)*
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.` *(or leave empty)*
5. Click **"Deploy site"**.
6. Your lottery site will be live immediately with free HTTPS and global CDN.

---

## 💻 Local Development / Preview

To test or run locally:

```bash
# Using Python
python -m http.server 3000

# Or using Node / npx
npx serve .
```

Then open `http://localhost:3000` in your web browser.

---

## 🔒 Admin Access

- Access the Admin Dashboard via: `http://localhost:3000/admin.html` (or `https://your-site.netlify.app/admin`)
- Default PIN: `1234`
