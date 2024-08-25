# **E-Commerce API**

## **Live Demo**
Check out the live demo [here](#)

## **Description**

E-Commerce API is a robust backend solution built using modern technologies like Express.js, TypeScript, and MongoDB. It provides essential e-commerce functionalities such as user authentication, product management, order processing, and reviews. The API includes comprehensive security middleware, supports file uploads, and is fully Dockerized for seamless deployment. Additionally, it features Swagger documentation for easy API exploration.

## **Tech Stack**

- **Backend:** **Express.js**, **TypeScript**
- **Database:** **MongoDB**, **Mongoose**
- **Validation:** **express-validator**
- **Security:** **Helmet**, **xss-clean**, **CORS**, **mongo-sanitize**
- **Documentation:** **Swagger**
- **Containerization:** **Docker**
- **Linting & Formatting:** **Biome**

## **Features**

- 💪🏻 **Robust Authentication & Authorization:** Secure JWT-based system with role-based access control.
- 🛒 **E-Commerce Core Features:** Complete routes for products, orders, reviews, and users.
- 🔒 **Enhanced Security:** Middleware integration for XSS protection, data sanitization, and security headers.
- 🛠️ **Type-Safe Development:** Fully implemented in TypeScript for improved code quality and maintainability.
- ✨ **Absolute Imports:** Setup absolute imports with "@/" for more concise and organized imports.
- 🗂️ **File Upload Support:** Handle file uploads efficiently, ideal for product images.
- 📝 **Comprehensive API Documentation:** Swagger docs available at `/docs` for easy exploration.
- 🐳 **Fully Dockerized:** Seamless deployment using Docker with multi-stage builds.
- ✨ **Code Quality:** Integrated Biome linter and formatter for consistent code style.

## **How to Install**

Follow these steps to set up the E-Commerce API on your local machine.

### **Prerequisites**

- Node.js and npm installed
- Docker installed (for running the Dockerized version)

### **Installation**

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Louai-Zokerburg/e-commerce-api
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd e-commerce-api
    ```
    
3. Install server dependencies:
    
    ```bash
    npm install
    ```
    
4. Create a **`.env`** file in the root directory and add the following:
    
    ```env
    MONGO_URI=
    JWT_SECRET=
    JWT_LIFETIME=
    PORT=
    ```
    
    Replace the placeholders with your actual MongoDB URI, JWT secret, and other necessary environment variables.
    
5. Run the server in development mode:
    
    ```bash
    make dev
    ```
    
6. Access the Swagger API documentation at **`http://localhost:<PORT>/docs`**.


## **Usage**

1. **Authentication & Authorization:**
   - Signup or login to receive a JWT token.
   - Include the JWT token in the `Authorization` header for protected routes.

2. **Product Management:**
   - Create, update, delete, and fetch products.
   - Handle file uploads for product images.

3. **Order Processing:**
   - Manage orders including creation, updating, and viewing order details.

4. **Reviews:**
   - Allow users to submit reviews for products.
   - Implement rating and comment features.

5. **User Management:**
   - Manage user profiles, roles, and access control.

6. **Security:**
   - Ensure all requests are secure with integrated security middleware.

7. **API Documentation:**
   - Explore the API using Swagger at `/docs`.

## **Linting & Formatting**

- This project uses Biome for linting and code formatting. To run the linter, use:

    ```bash
    npm run lint
    ```

- To format the code, run:

    ```bash
    npm run format
    ```

## **Dockerization**

- The project is fully Dockerized, allowing you to run the API in a containerized environment. The Docker configuration supports multi-stage builds for efficient production deployment.

## **Contributing**

If you wish to contribute to the project, please follow the standard Git workflow:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Submit a pull request
