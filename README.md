
# 🚲 Bike Shop Client

- A responsive and user-friendly frontend for the Bike Shop Application, built to deliver a smooth shopping experience, seamless authentication, and dynamic product exploration. This React-based client communicates with a secure backend to provide real-time data, user role management, and payment integration.

# 🔗 Live Link
- [Bi Cycle Store](https://bycycle-client.vercel.app/)





## 📌 Table of Contents

- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [🛠️ Installation](#installation)
- [🚀 Usage](#-usage)
- [⚙️ Environment Variables](#️-environment-variables)
- [📁 Project Structure](#-project-structure)
- [🖼️ Screenshots](#️-screenshots)
- [🧩 Troubleshooting](#-troubleshooting)
- [🔗 Live Link](#-live-link)


# ✨ Features

## 🔓 Authentication
- JWT-based login and registration system 
- Role-based access control (Customer & Admin)
- Secure session handling via localStorage
- Logout with token clearing and redirection

## 🛒 Product Management
- Role-based dashboards:
    - Admin: User, Product & Order Management (CRUD)
    - Customer: View orders, manage profile & update password
- Order placement with SurjoPay integration

##  🔄 Extras
- Track order status (progress bar)
- Admin control to update delivery status and estimated date
- Pagination on product and order listings

##  🧰 Tech Stack
- React.js
- Redux
- TypeScript
- JWT
- Tailwind CSS
- Shancn

## Installation

 1. Clone the repo:

```bash
git clone https://github.com/ZakiaSultana4/Bi-Cycle-Store-Frontend
cd Bi-Cycle-Store-Frontend

```
2. Install dependencies:

```bash
npm install

```
3. Configure environment variables (see Environment Variables)
4. Run the development server:

```bash
npm run dev

```
    
# ⚙️ Environment Variables

 Create a .env file in the root with the following keys:
```bash
VITE_API_BASE_URL=http://localhost:5000/api

```
Adjust values according to your backend and SurjoPay credentials.

# 📁 Project Structure

```graphql
src/
├── assets/            # Images, icons, etc.
├── components/        # Reusable components (Navbar, Footer, etc.)
├── pages/             # Route pages (Home, Products, Dashboard)
├── layouts/           # Layouts for public/private routes
├── hooks/             # Custom hooks
├── routes/            # Route definitions and guards
├── services/          # API service handlers (Axios)
├── context/           # Auth and global state
├── utils/             # Helper functions and constants
└── main.jsx           # Entry point


```



# 🚀 Usage

## Home Page:
- View featured products, banner carousel, testimonials, and more.
## Products Page:
- Search, filter, and explore all bikes.
## Product Details:
- View details and proceed to checkout (if logged in).
## Checkout:
- Enter order details and pay via SurjoPay.
## Dashboard:
- Customer: Track orders, update profile, change password.

- Admin: Manage users, products, orders.


# 🖼️ Screenshots

![Bi Cycle Store Banner](https://jehrfbtl7l.ufs.sh/f/soyLwyt7O15DBeZpnA9oMe6yNsJtRdclHvzjI7QXqExnLbGw)

### 🔐 Demo Credentials

You can use the following demo accounts to log in to the dashboard:

#### 👤 User Account
- **Email:** `sultanazakia71@gmail.com`  
- **Password:** `sultanazakia71`

#### 👨‍💼 Admin Account
- **Email:** `sultanazakia712@gmail.com`  
- **Password:** `sultanazakia71`

> ⚠️ These credentials are for testing/demo purposes only. Do **not** use them in a production environment.

# 🧩 Troubleshooting
- Login not working?
  - Check if the backend server is running and .env API base URL is correct.
- Protected route access denied?
  - Ensure you're logged in and have the correct role.
- Payment failed?
  - Verify SurjoPay keys and network connectivity.
- Products not loading?
  - Check backend API status or inspect network requests.

