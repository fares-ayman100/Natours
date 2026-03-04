# 🌍 Natours — Adventure Booking Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.19-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1-brightgreen.svg)
![License](https://img.shields.io/badge/License-ISC-yellow.svg)

**A robust RESTful API for Natours - Booking Tours Platform**

</div>

---

## 🎯 About

**Natours** is a full-stack tour booking application built with **Node.js, Express, MongoDB, Mongoose and Stripe**.  
This project was implemented following Jonas Schmedtmann's Node.js Bootcamp and demonstrates real-world features like authentication, payments, webhooks, and security best practices.

### 🌐 Live Demo

- 🌍 Website: https://natours-fares.vercel.app
- 📋 API Documentation: https://natours-fares.vercel.app/api-docs/

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password reset via email
- ✅ Role-based access control (User, Admin)
- ✅ Protected routes middleware
- ✅ Secure password hashing with bcrypt

### 👥 User Management
- ✅ User profile management
- ✅ Update user information
- ✅ Soft delete (deactivate account)
- ✅ Admin user management

### 🏞️ Tours
- ✅ List tours with pagination, filtering, search, and sorting
- ✅ Detailed tour pages with images, duration, price, reviews
- ✅ Map integration (Leaflet) to show tour locations

### 💳 Order Processing
- ✅ Stripe payment integration
- ✅ Checkout session creation
- ✅ Order management (Admin)
- ✅ Order history for users
- ✅ Webhook handling for payment confirmation
- ✅ Order status tracking

### ⭐ Reviews System
- ✅ Create reviews on products
- ✅ Get all reviews
- ✅ Get reviews by product
- ✅ Update and delete reviews
- ✅ Automatic rating calculation

### 📩 Email (notifications)
- ✅ Welcome Email when a new user signs up
- ✅ Password Reset Email when a user requests to reset their password
- ✅ Booking Confirmation Email after a successful purchase
  
### 🛡️ Security
- ✅ Helmet.js for HTTP security headers
- ✅ Rate limiting (100 requests/hour)
- ✅ Data sanitization against NoSQL injection
- ✅ XSS protection
- ✅ CORS enabled
- ✅ Parameter pollution prevention
- ✅ Secure cookies (httpOnly, secure in production)

---

## 🛠 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Stripe API, Pug (templating)
**Dev Tools:** nodemon, Morgan
**Email Service:** Resend , nodemailer
**Documentation:** Swagger UI
**Other Utilities** validator ,slugify , Pug

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fares-ayman100/Natours.git
cd Natours
```

### 2. Install

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
NODE_ENV=development
PORT=3000

DATABASE=<your MongoDB connection string>

JWT_SECRET=<your jwt secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_HOST=<smtp host>          # e.g., smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=<smtp port>          # e.g., 2525 for Mailtrap, 587 for TLS Gmail
EMAIL_USERNAME=<email username>
EMAIL_PASSWORD=<email password>
EMAIL_FROM="Natours <no-reply@natours.com>"

RESEND_API_KEY=<API KEY>

STRIPE_SECRET_KEY=<stripe secret key>
STRIPE_WEBHOOK_SIGNATURE=<stripe webhook secret>

```

### 4. Run (development)

```bash
npm start
```

### 5. Production Mode

```bash
npm run start:prod
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

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Fares Ayman**

- GitHub: [Fares Ayman](https://github.com/fares-ayman100)
- Email: fareshe73@gmail.com

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- Stripe for payment processing
- All open-source contributors

---

<div align="center">

Made with ❤️ and 🌍

⭐ Star this repo if you find it helpful!

</div>
