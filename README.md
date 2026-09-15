# AmanMart - Full Stack E-Commerce Application

AmanMart is a full-stack e-commerce web application built with Next.js, React, Tailwind CSS, Node.js, and MongoDB.

The application provides a complete shopping experience with authentication, product management, cart, checkout, order placement, order tracking, and an admin panel.

## Features

### Customer Features

* User Signup and Login
* JWT Authentication
* Product Listing
* Product Details
* Category Browsing
* Add to Cart
* Update Cart Quantity
* Remove Products from Cart
* Checkout
* Cash on Delivery
* Order Placement
* Order Success Page
* Order Tracking
* Order Status Display
* Responsive UI

### Admin Features

* Admin Login
* Admin Authorization
* Admin Dashboard
* Add Products
* Edit Products
* Delete Products
* Product Management
* View Orders
* Order Management
* Update Order Status

### Backend Features

* REST APIs
* MongoDB Atlas Integration
* Mongoose
* Product CRUD Operations
* Order Management
* JWT Authentication
* Role-Based Authorization
* API Error Handling

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Node.js
* REST API
* MongoDB
* Mongoose
* JWT

### Tools

* Git
* GitHub
* pnpm
* Docker

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── categories/
│   ├── checkout/
│   ├── login/
│   ├── orders/
│   ├── products/
│   └── signup/
│
├── components/
├── context/
├── lib/
└── models/
```

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Go to the Project Directory

```bash
cd e-commerce-ui
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Configure Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload `.env.local` to GitHub.

### 5. Start the Development Server

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm start
```

## Database

AmanMart uses MongoDB Atlas for storing application data.

The database is used for:

* Users
* Products
* Orders

Mongoose is used for database connection and data models.

## Authentication and Authorization

AmanMart uses JWT-based authentication.

**Authentication** verifies the identity of a user.

**Authorization** controls what an authenticated user is allowed to access.

Admin users have access to protected admin features such as product and order management.

## Order Flow

```text
Product
   |
   v
Add to Cart
   |
   v
Checkout
   |
   v
Place Order
   |
   v
MongoDB
   |
   v
Admin Order Management
   |
   v
Update Order Status
   |
   v
Track Order
```

## Future Improvements

* Online Payment Integration
* Product Search
* Product Filtering
* Reviews and Ratings
* Wishlist
* Image Upload
* Email Notifications
* Docker Deployment

## Author

**Aman Khan**

BCA Student | Web Developer

## License

This project is created for learning and portfolio purposes.
