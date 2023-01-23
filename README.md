# T3 Task Board

## About
T3 Task Board is a task management tool. Users can add tasks to the board and change the status of it when the task is in progress or done. The board contains 3 different columns: "To do", "In Progress" and "Done". To change the status, the users can move the task to an other column. It helps the user keeping track of his/her to do list.

## 

<img width="800" alt="Screenshot 2022-12-15 at 09 30 46" src="https://user-images.githubusercontent.com/43657951/210583181-2f141a00-37d7-48d0-a648-e3bd7ddceec0.png">

## 

This t3 repo uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth. **NOTE: Only for Next.js app,
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Start Docker
docker-compose up -d

# Push the Prisma schema to your database
pnpm db-push

# Start the app
pnpm dev

# Open your browser
The app is running on localhost:3000 and the API on http://localhost:5555/
```

## Modal diagrams 
#### Create new task
<img width="550" alt="Task" src="https://user-images.githubusercontent.com/43657951/207373406-d929d99a-1e6b-4d59-bd1d-a94f23ba0bb8.png">

#### Edit task
<img width="550" alt="Task" src="https://user-images.githubusercontent.com/43657951/207381794-e9730afe-ca8f-4c2b-8b93-bea852c809bb.png">




## Domain Map

| Generic        | Core           | Support        |
| -----------    | -----------    |-----------     |
| Authentication | Create tasks   | Login          |
| Payment        | Edit tasks     | User management|
| Notifications  | Create columns |                |



## Test strategy
The Diamond test strategy is used for this project. The main goal of the app is creating and editing tasks, it is important that all functions inside the components work well together and API calls don't fail.
