## ⚒ How to Install

To run project run

```bash

$  npm  install

or

$  yarn  install

```

## Documentation

After running project you can open documentation by route `/api-docs`

### Link for API documentation in postman

- [https://documenter.getpostman.com/view/20753507/2sA35LWzm5](https://documenter.getpostman.com/view/20753507/2sA35LWzm5)

## Configuration

Before starting the project, make sure to set up your database credentials in the `.env.development.local` (temporary not hide it) file. This file is used for local development and should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:

### Database Configuration

- **CONNECT_DB_URI=** mongodb+srv://user2024:User2024@main.n77nzmr.mongodb.net/RSS?retryWrites=true&w=majority&appName=Main

- **LOG_FORMAT=** dev

- **LOG_DIR=** ../logs

## Features

- **TypeScript:** Enjoy the benefits of static typing, enhanced code maintainability, and better developer tooling with TypeScript.

- **Express.js:** Build powerful and flexible web APIs using the popular Express.js framework.

- **Mongoose:** Utilize the elegant MongoDB object modeling library Mongoose for seamless integration with MongoDB databases.

- **User Authentication:** Includes a pre-configured user authentication system with password hashing using bcrypt and JWT-based authentication.

- **API Documentation:** Generate API documentation effortlessly with Swagger and Swagger UI integration.

- **Error Handling:** Implement centralized error handling and consistent error responses across your application.

- **Environment Configuration:** Manage your application's configuration using environment variables with the help of the dotenv library.

- **Linting and Formatting:** Maintain clean and consistent code with ESLint and Prettier pre-configured.

- **Process Management:** Utilize PM2 or Nodemon for process management and automatic application restarts during development and production.

- **SWC Compiler:** Utilize the SWC compiler for faster TypeScript compilation and improved performance.
