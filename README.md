# Task Manager: Frontend

A simple task management web app built with **React + Vite**.
It's the frontend half of a student lab for deploying to AWS (**Amplify**).
It talks to the API in the `task-manager-backend` repo.

👉 **Step-by-step AWS deployment: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)**

## Features
- Add, edit and delete tasks (title, description, status, due date)
- Change status straight from the list; filter by To do / In progress / Done
- Overdue tasks are highlighted
- A connection bar at the top shows whether the **API** and the **database** are reachable,
  which helps when debugging a deployment

## Run locally

Requires Node.js 20.19+ (or 22.12+) and the backend running on port 3000.

```bash
npm install
cp .env.example .env.local     # VITE_API_URL=http://localhost:3000
npm run dev                    # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` (what Amplify serves) |
| `npm run preview` | Serve the production build locally |

## Configuration

| Variable | Where to set it | Example |
|---|---|---|
| `VITE_API_URL` | `.env.local` locally; **Amplify console → Hosting → Environment variables** on AWS | `https://13-250-1-2.sslip.io` |

Vite puts the value into the JavaScript **at build time**, so after changing it in Amplify you must **redeploy**.

## Project structure

```
amplify.yml                  build settings Amplify uses automatically
index.html                   page shell
src/
  main.jsx                   React entry point
  App.jsx                    page layout and state (tasks, filter, editing)
  api.js                     all calls to the backend (fetch)
  constants.js               task statuses
  index.css                  styles
  components/
    ConnectionStatus.jsx     API / database status bar
    TaskForm.jsx             create / edit form
    StatusFilter.jsx         All / To do / In progress / Done tabs
    TaskList.jsx             list of tasks
    TaskItem.jsx             one task with status, edit, delete
```
