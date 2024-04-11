# Articles Management Project

AMP is a monorepo project that includes a client-side application built with Next.js and a server-side application built with Express.js. Both applications are written in TypeScript and use a variety of modern libraries and tools.

## 🚀 Running the Project

Before running the project, make sure you have Node.js and Yarn installed on your machine and config `.env.local` in `/packages/client` by exapmle from `.env.example`

To start both the client and server applications in development mode, run:

```bash

$  yarn start

or

$  npm start

```

This will install the dependencies for the root project and for both the client and server applications and start the client application on port 3000 and the server application on its configured port.

## 🧑‍💻 User Roles and Testing

For testing purposes, four users with different roles have been created:

- **ADMIN:** - admin@gmail.com
- **REDACTOR:** - redactor@gmail.com
- **CUSTOMER:** - customer@gmail.com
- **GUEST:** - guest@gmail.com

The password for all these users is 12345678!.

The functionality of the private page /role changes depending on the user's role.

You can also register your own user and role.

---

## 🖥️ Client Application

The client application is built with Next.js and uses React Query for data fetching, and Tailwind CSS for styling.

To start the client application in development mode independently, navigate to the packages/client directory and run:

```bash

$  yarn run dev

or

$  npm run dev

```

## ⚠️ Unauthorized Status

If the server returns a 401 status, you will be logged out and redirected to the /login page. This can happen if the token has expired

---

## 🌐 Server Application

The server application is built with Express.js and uses Mongoose for MongoDB object modeling, bcrypt for password hashing, and jsonwebtoken for JWT-based authentication.

### Detailed description of the server application can be found in the packages/server/README.md file

To start the server application in development mode independently, navigate to the packages/server directory and run:

```bash

$  yarn run dev

or

$  npm run dev

```

## 🔄 Automatic News Updates

The server is connected to a service that updates the database with fresh news every hour. This is achieved through a scheduled task that parses an RSS feed. The relevant code can be found in the RssParserService class in the rss-parser.service.ts file.

## 📚 API Documentation

After running the server application, you can open the API documentation by navigating to the `/localhost:8080/api-docs` route in your browser.

## ⚙️ Configuration

Before starting the project, make sure to set up your database credentials in the `.env.development.local` (temporary not hide it) file. This file is used for local development and should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:

## 🌟 Features

- **TypeScript:** Enjoy the benefits of static typing, enhanced code maintainability, and better developer tooling with TypeScript.

- **Next.js and Express.js:** Build powerful and flexible web applications using the popular Next.js and Express.js frameworks.

- **React Query:** Manage your application's data and state effectively with React Query.

- **Tailwind CSS:** Style your application with ease using the utility-first Tailwind CSS framework.

- **Mongoose:** Utilize the elegant MongoDB object modeling library Mongoose for seamless integration with MongoDB databases.

- **User Authentication:** Includes a pre-configured user authentication system with password hashing using bcrypt and JWT-based authentication on server side and **Next-Auth with Next Session** on client.

- **API Documentation:** Generate API documentation effortlessly with Swagger and Swagger UI integration.

- **Error Handling:** Implement centralized error handling and consistent error responses across your application.

- **Environment Configuration:** Manage your application's configuration using environment variables with the help of the dotenv library.

- **Linting and Formatting:** Maintain clean and consistent code with ESLint and Prettier pre-configured.

- **Process Management:** Utilize PM2 or Nodemon for process management and automatic application restarts during development and production.

- **SWC Compiler:** Utilize the SWC compiler for faster TypeScript compilation and improved performance.
