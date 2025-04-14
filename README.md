# Memory Game - Final Project

This repository contains the final project for the Advanced Web Development course. The project is a retro-styled **Memory Game** built with React for the frontend and Node.js with SQLite for the backend.<br><br>
You can check out the game [here](https://salmon-field-07c1a5f03.6.azurestaticapps.net/)

---

## Features

- **Frontend**: Built with React, styled using NES.css and custom CSS for a retro look.
- **Backend**: Node.js with Express for API endpoints and SQLite for storing highscores.
- **Game Features**:
  - Multiple difficulty levels (Easy, Medium, Hard).
  - Highscore system with persistent storage.
  - Retro sound effects and animations.
  - Responsive design for both desktop and mobile devices.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/teppotomppa/webdev-project
cd webdev-project
```

---

### 2. Install Dependencies

Install the required dependencies for both the frontend and backend:

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

---

### 3. Build the Frontend

Build the React frontend for production:

```bash
cd ../frontend
npm run build
```

This will create a `build/` directory containing the optimized frontend files.

---

### 4. Start the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd ../backend
node server.js
```

The backend server will run on `http://localhost:3000` by default.

---

### 5. Run the Application

Once the backend server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the Memory Game application running locally.

---

## Project Structure

The project is organized as follows:

```
webdev-project/
├── frontend/       # React frontend
│   ├── src/        # Source code for React components and utilities
│   ├── public/     # Public assets (e.g., index.html, images)
│   └── build/      # Production build of the frontend
├── backend/        # Node.js backend
│   ├── server.js   # Main server file
│   └── scores.db   # SQLite database file
└── README.md       # Project documentation
```

---

## API Endpoints

The backend provides the following API endpoints:

- **POST /submit-score**: Submit a highscore.
- **GET /highscores**: Retrieve highscores for a specific difficulty.

---

## Troubleshooting

If you encounter any issues, try the following:
- Ensure all dependencies are installed (`npm install`).
- Check that the backend server is running (`node server.js`).
- Verify that the frontend is built (`npm run build`).

---

## Acknowledgments

- [NES.css](https://nostalgic-css.github.io/NES.css/) for the retro-styled UI.
- [React](https://reactjs.org/) for the frontend framework.
- [SQLite](https://www.sqlite.org/) for the lightweight database.
- [Node.js](https://nodejs.org/) for the backend runtime environment.
- [Express](https://expressjs.com/) for building the backend API.
