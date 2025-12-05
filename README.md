# 🌍 Natours — Adventure Booking Application

Natours is a full-stack tour booking application built with **Node.js, Express, MongoDB, Mongoose and Stripe**.  
This project was implemented following Jonas Schmedtmann's Node.js Bootcamp and demonstrates real-world features like authentication, payments, webhooks, and security best practices.

---

[![License](https://img.shields.io/badge/license-Educational-blue.svg)](#)  
[![Node.js](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](#)  
[![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-47A248.svg)](#)

---

## 🚀 Live Demo
**https://natours.obl.ee**

---

## 📸 Screenshots

Top of repo / Hero  
![Homepage](./assets/screenshots/homepage.png)

Tour detail & map  
![Tour Detail](./assets/screenshots/tour-detail.png)  
![Map Location](./assets/screenshots/map-location.png)

Booking flow & checkout  
![Checkout](./assets/screenshots/booking-checkout.png)  
![Booking Email](./assets/screenshots/booking-success-email.png)

Admin / Logs  
![Admin Dashboard](./assets/screenshots/admin-dashboard.png)  
![Stripe Webhook Log](./assets/screenshots/stripe-webhook-log.png)

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
