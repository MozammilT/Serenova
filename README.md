<table style="border: none;">
  <tr>
    <td style="border: none;"><img src="https://res.cloudinary.com/dsotpoln9/image/upload/v1750193918/logo_kc1mjf_lxdghi.png" alt="Serenova Logo" width="40"/></td>
    <td style="vertical-align: middle; padding-left: 10px; border: none;"><h1 style="margin: 0;">Serenova</h1></td>
  </tr>
</table>

Serenova is a modern, full-featured hotel booking platform built with the latest web technologies. From real-time Stripe payments to elegant email confirmations, this project showcases a complete hotel reservation experience — fast, secure, and beautifully responsive.

---

## ✨ Features

- 🔐 **Authentication** using [Clerk](https://clerk.dev)
- 🏨 **Hotel Booking** with real-time room data
- 💳 **Stripe Payments** for secure transactions
- 📧 **Email Notifications** for:
  - Welcome emails
  - Booking confirmations
  - Cancellations
- 🌐 Fully **Responsive Design** across devices
- ☁️ Cloudinary image uploads for hotel and room photos

---

## 🛠️ Tech Stack

### Frontend

- ⚡️ [Vite](https://vitejs.dev/)
- ⚛️ React
- 🎨 Tailwind CSS

### Backend

- 🟩 Node.js
- ⚙️ Express.js
- 🗄️ MongoDB with Mongoose
- ☁️ Cloudinary for media handling

### Integrations

- 👤 [Clerk](https://clerk.dev) for user management & authentication
- 💸 [Stripe](https://stripe.com) for secure payment gateway
- 📬 Nodemailer for transactional emails

---

## 📦 Installation (Local Setup)

> 🔐 **Environment variables are required to run this project.** Please refer to the the required `.env` variables section below

### 1. Clone the repository:

```bash
git clone https://github.com/MozammilT/Serenova.git
cd Serenova
```

### 2. Install frontend and backend dependencies:

```bash
   cd frontend
  npm install
```

```bash
cd ../backend
npm install
```

### 3. Set up your `.env` files in both the `frontend` and `backend` directories.

> To run this project locally, you will need to:

- Set up a Clerk project and obtain your Frontend and Backend API keys.
- Configure MongoDB URI for database connection.
- Set up a Stripe account to get your secret key and webhook secret.
- Create a Cloudinary account for media uploads.
- Add appropriate values to your `.env` files such as:
  - `CLERK_SECRET_KEY`
  - `CLERK_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `MONGO_URI`,
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## 🚀 Deployment

The project is deployed on Vercel — check out the [Live Demo 🌐](https://serenova-gamma.vercel.app)

## 📄 License

This project is open source and available under the MIT License.
