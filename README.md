# Where's-my-Bus

A full-stack bus information web application built with React, Flask, and SQLite.

## Project Structure

```text
frontend/   React + Vite application
backend/    Flask API, database setup, tests, and SQLite database
legacy/     Previous static frontend kept for reference
```

## Running Locally

Install frontend dependencies once:

```bash
cd frontend
npm install
```

Start the API from the repository root:

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
* Store and retrieve bus information using SQLite
* React frontend with client-side routing

## Tech Stack

* **Frontend:** React, Vite, JavaScript, CSS
* **Backend:** Python, Flask
* **Database:** SQLite
* **Routing:** React Router
* **API:** REST-style HTTP requests

## Application Flow

```text
React → Flask API → SQLite
  ↑                  ↓
  └──── JSON data ───┘
```

The project is currently under development, with additional features planned for future versions.
