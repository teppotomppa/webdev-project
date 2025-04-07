const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite3

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); // This is important for parsing JSON in POST requests

// Set up SQLite database connection
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("SQLite database connected.");

    // Create the USERS table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Users table ensured.");
        }
      }
    );
  }
});

// Handle /register route (POST request) for user registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const stmt = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  );
  stmt.run(username, email, password, function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Username or email already taken." });
    }
    res.status(200).json({ message: "User registered successfully!" });
  });
  stmt.finalize();
});

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Catch-all route for frontend
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
