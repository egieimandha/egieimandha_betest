"This is a Node.js with express js that includes controllers and services for user authentication and user operations.
Here's a step-by-step guide on how to install and run this project."

## Installation

To run this project, ensure that you have Node.js and npm or yarn installed on your computer.

**Install Dependencies:**

- Install all project dependencies using npm or yarn:

     With npm:

     ```bash
     npm install
     ```

     Or with yarn:

     ```bash
     yarn
     ```

**Configure Environment Variables:**

   ```bash
   cp .env.example .env
   ```

- add configuration with your credentials.(ex: database uri, jwt sceret and redis host)

## Running the Project

After installing the project and configuring the environment variables, you can execute it using the following commands:

- **Development Mode:**

  ```bash
  npm run dev
  ```

  Or with yarn:

  ```bash
  yarn dev
  ```

<br />

### With Docker

Note: It is assumed here that you have installed Docker and running in the background.

```bash
yarn docker
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\

**User routes**:\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`GET /v1/users/by-accountNumber/:accountNumber` - get user by account number\
`GET /v1/users/by-identityNumber/:identityNumber` - get user by identity number\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user
