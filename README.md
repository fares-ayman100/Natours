# 🌍 Natours — Adventure Booking Application

Natours is a full-stack tour booking application built with **Node.js, Express, MongoDB, Mongoose and Stripe**.  
This project was implemented following Jonas Schmedtmann's Node.js Bootcamp and demonstrates real-world features like authentication, payments, webhooks, and security best practices.

---

[![License](https://img.shields.io/badge/license-Educational-blue.svg)](#)  
[![Node.js](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](#)  
[![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-47A248.svg)](#)

---

## 🚀 Live Demo
**https://natours-fares.vercel.app/**

---

## 📋 API DOC
**https://natours-fares.vercel.app/api-docs/**

---

## ✨ Features

### User
- Sign up, login, protect routes with JWT (cookies)
- Password reset flow via email
- Update user profile & upload photo

### Tours
- List tours with pagination, filtering, search, and sorting
- Detailed tour pages with images, duration, price, reviews
- Map integration (Leaflet) to show tour locations

### Booking & Payments
- Stripe Checkout session integration
- Secure booking creation using Stripe Webhooks (recommended)
- Booking confirmation email sent after successful payment

### Email (notifications)
- Sends booking confirmation / invoice emails
- Sends welcome and password reset emails
- Configurable email provider via environment variables

### Security & Performance
- Rate limiting, data sanitization, XSS/HPP protection
- Secure headers (Helmet)
- Compression and static file serving

---

## 🛠 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Stripe API, Pug (templating)  
**Frontend:** Server-rendered pages (Pug) + Vanilla JS + Leaflet maps  
**Dev Tools:** nodemon, eslint (optional)

---

## 📦 Installation & Setup

### 1. Clone
```bash
git clone https://github.com/fares-ayman100/Natours.git
cd Natours
```

### 2. Install
```bash
npm install
```

### 3. Environment Variables
```bash
NODE_ENV=development
PORT=3000

DATABASE=<your MongoDB connection string>
DATABASE_PASSWORD=<db password>

JWT_SECRET=<your jwt secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_HOST=<smtp host>          # e.g., smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=<smtp port>          # e.g., 2525 for Mailtrap, 587 for TLS Gmail
EMAIL_USERNAME=<email username>
EMAIL_PASSWORD=<email password>
EMAIL_FROM="Natours <no-reply@natours.com>"

STRIPE_SECRET_KEY=<stripe secret key>
STRIPE_WEBHOOK_SECRET=<stripe webhook secret>

FRONTEND_URL=https://natours.obl.ee
```

### 4. Run (development)
```bash
npm run start:dev
```
---

## 🧭 Project Structure (short)
```bash
Natours/
├─ controllers/
├─ models/
├─ routes/
├─ views/
├─ public/
├─ utils/
├─ app.js
├─ server.js
└─ README.md
```
