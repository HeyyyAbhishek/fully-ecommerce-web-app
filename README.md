
# eCommerce Web App - Core X Stackup Dev Challenge

### Technologies Used

**Front-end:**

- **React**: A JavaScript library for building user interfaces.
- **React-Redux**: State Management Library.
- **ExpressJS**: A web application framework for Node.js to build RESTful APIs.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **js-cookie**: A simple JavaScript API for handling cookies.
- **Vite**: A modern frontend build tool that provides a fast development environment and a highly optimized production build.

**Please see `package.json` for a complete list of dependencies.**

**Official Plugins:**
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh.

### Getting Started

To get started with this project, follow the steps below:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HeyyyAbhishek/fully-ecommerce-web-app.git
   cd fully-ecommerce-web-app
   ```

2. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed. Then run the following command to install all required dependencies for frontend:
   ```bash
   cd frontend
   npm install
   ```
   
2. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed. Then run the following command to install all required dependencies for backend:
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in :
      ```bash
   cd frontend
   ```
     inside it  Create a `Token`
   ```bash
    TOKEN_KEY="Your Token Here"
   ``` 

5. **Run the Development Server**
   Start the Frontend server with the following command in the `Frontend Directory` :
   ```bash
   npm run dev
   ```
   Start the Backend server with the following command in the `Backend Directory` :
   ```bash
   node app.js
   ```

6. **Open in Browser**
   Open your web browser and navigate to `http://localhost:5173` (or the port specified in your configuration) to view the application.

### Features

- User Authentication: Secure login and registration.
- Product Listings: Browse a variety of products.
- Shopping Cart: Add, remove, and manage items in the shopping cart.
- Checkout Process: Complete purchases with ease.
- Responsive Design: Works on desktop and mobile devices.

### Future Improvements

- Implement user reviews and ratings for products.
- Enhance the search functionality to include filters.
- Add payment processing using Stripe or PayPal.
- Optimize performance and improve SEO.

### Contributing

Contributions are welcome! If you have suggestions for improvements or want to add features, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

For inquiries or support, please reach out to [[heyyyabhishek](https://x.com/heyyyabhishek)].
