---

# eCommerce Web App - Core X Stackup Dev Challenge

Welcome to the **eCommerce Web App**, a robust platform designed for browsing products, managing carts, and completing purchases with ease. This project is part of the **Core X Stackup Developer Challenge**.

---

## Technologies Used

### **Front-End:**
- **[React](https://reactjs.org/)**: A powerful JavaScript library for building dynamic user interfaces.
- **[React-Redux](https://react-redux.js.org/)**: A state management library for seamless application state handling.
- **[Vite](https://vitejs.dev/)**: A fast development environment and optimized production build tool for modern web applications.
- **[js-cookie](https://github.com/js-cookie/js-cookie)**: A simple and lightweight library to manage cookies in the browser.

### **Back-End:**
- **[ExpressJS](https://expressjs.com/)**: A flexible web application framework for building APIs in Node.js.
- **[Mongoose](https://mongoosejs.com/)**: An ODM (Object Data Modeling) library to interact with MongoDB.

For the full list of dependencies, please refer to `package.json`.

---

## ⚙️ Plugins

**Official Plugins:**
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes [Babel](https://babeljs.io/) for fast refresh during development.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Integrates [SWC](https://swc.rs/) for even faster refresh.

---

## 🛠️ Getting Started

Follow these steps to get the project up and running:

### 1. **Clone the Repository**
```bash
git clone https://github.com/HeyyyAbhishek/fully-ecommerce-web-app.git
cd fully-ecommerce-web-app
```

### 2. **Install Frontend Dependencies**
Ensure that [Node.js](https://nodejs.org/) is installed, then run:
```bash
cd frontend
npm install
```

### 3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

### 4. **Set Up Environment Variables**
Navigate to the backend directory and create a `.env` file with your token:
```bash
cd backend
```
In the `.env` file:
```bash
TOKEN_KEY="Your Token Here"
```

### 5. **Run Development Servers**

- Start the frontend server:
  ```bash
  cd frontend
  npm run dev
  ```

- Start the backend server:
  ```bash
  cd backend
  node app.js
  ```

### 6. **Open the Application**
Go to `http://localhost:5173` (or your configured port) in your browser to view the web app.

### 7. **Admin Privileges**
To make a user an **ADMIN**, change the `account_type` field in the MongoDB database from `user` to `admin`.

---

##  Features

- **User Authentication**: Secure registration and login system.
- **Product Listings**: Browse through an extensive collection of products.
- **Shopping Cart**: Easily add, remove, and manage items.
- **Checkout Process**: Streamlined checkout for quick and efficient purchases.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

##  Future Improvements

- Implement product reviews and ratings.
- Enhance search with advanced filters.
- Integrate payment gateways such as Stripe or PayPal.
- Improve overall performance and SEO.

---

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues if you have suggestions for new features or improvements.

---

##  License

---

## Contact

For any questions or support, reach out to [@heyyyabhishek](https://x.com/heyyyabhishek).

---
