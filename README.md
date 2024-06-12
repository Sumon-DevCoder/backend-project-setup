# Backend Project

This project is a Node.js backend application set up with TypeScript, Express, MongoDB (using Mongoose), and other essential tools for development and code quality.

## Project Structure

├── src
│ ├── app
│ │ ├── config
│ │ │ ├── db.ts
│ │ │ └── config.ts
│ │ ├── middlewares
│ │ │ └── authMiddleware.ts
│ │ ├── modules
│ │ │ ├── student
│ │ │ │ ├── controllers
│ │ │ │ │ └── studentController.ts
│ │ │ │ ├── models
│ │ │ │ │ └── studentModel.ts
│ │ │ │ ├── routes
│ │ │ │ │ └── studentRoutes.ts
│ │ │ │ ├── services
│ │ │ │ │ └── studentService.ts
│ │ │ ├── user
│ │ │ │ ├── controllers
│ │ │ │ │ └── userController.ts
│ │ │ │ ├── models
│ │ │ │ │ └── userModel.ts
│ │ │ │ ├── routes
│ │ │ │ │ └── userRoutes.ts
│ │ │ │ ├── services
│ │ │ │ │ └── userService.ts
│ │ ├── routes
│ │ │ └── index.ts
│ │ ├── utils
│ ├── app.ts
│ ├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

## Setup Instructions

### 1. Initialize Project

Initialize a new Node.js project with default settings.

```sh
npm init -y


2. Install Dependencies
Install the necessary packages for the project.

npm install express mongoose nodemon dotenv cors
npm install -D typescript
```
