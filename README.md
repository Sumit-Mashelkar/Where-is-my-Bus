# Where's-my-Bus

A full-stack bus information web application built with React, Flask, and PostgreSQL.

## Project Structure

```text
frontend/   React + Vite application
backend/    Flask API, PostgreSQL schema setup, and tests
legacy/     Previous static frontend kept for reference
```

## Running Locally

Install dependencies once:

```bash
cd frontend
npm install
```

Install backend dependencies from the repository root:

```bash
python -m pip install -r backend/requirements.txt
```

Create a PostgreSQL database and configure local credentials. The backend loads `backend/.env` for both schema setup and API requests; keep that file local and do not commit it:

```powershell
Copy-Item backend/.env.example backend/.env
# Edit backend/.env and replace the placeholder password.
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -h localhost -p 5433 -U postgres -d postgres -c "CREATE DATABASE transitpulse;"
```

Apply the schema and sample bus data:

```bash
npm run backend:setup
```

Start the API from the same terminal where `DATABASE_URL` and `PGPASSWORD` are set:

```bash
npm run backend:start
```

Start the frontend in a second terminal:

```bash
npm run frontend:dev
```

## Features

* Search buses using **source and destination**
* Display matching buses with key details
* Select a bus to view its details
* Fetch bus data from a Flask backend
* Store and retrieve bus information using PostgreSQL
* React frontend with client-side routing

## Tech Stack

* **Frontend:** React, Vite, JavaScript, CSS
* **Backend:** Python, Flask
* **Database:** PostgreSQL
* **Routing:** React Router
* **API:** REST-style HTTP requests

## Application Flow

```text
React → Flask API → PostgreSQL
  ↑                  ↓
  └──── JSON data ───┘
```

The project is currently under development, with additional features planned for future versions.
