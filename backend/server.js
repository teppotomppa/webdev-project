const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite3

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); // This is important for parsing JSON in POST requests

// Set up SQLite database connection
const db = new sqlite3.Database("./scores.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("SQLite database connected.");

    db.serialize(() => {
      // Create table for Easy difficulty
      db.run(
        `CREATE TABLE IF NOT EXISTS scores_easy (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          moves INTEGER NOT NULL,
          time INTEGER NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      // Create table for Medium difficulty
      db.run(
        `CREATE TABLE IF NOT EXISTS scores_medium (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          moves INTEGER NOT NULL,
          time INTEGER NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      // Create table for Hard difficulty
      db.run(
        `CREATE TABLE IF NOT EXISTS scores_hard (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          moves INTEGER NOT NULL,
          time INTEGER NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      console.log("All difficulty tables ensured.");
    });
  }
});

// Handle /submit-score route (POST request) for submitting scores
app.post("/submit-score", (req, res) => {
  const { username, moves, time, difficulty } = req.body;

  if (!username || !moves || !time || !difficulty) {
    return res
      .status(400)
      .json({ message: "Username, moves, time, and difficulty are required." });
  }

  // Validate difficulty and determine the table name
  const validDifficulties = ["easy", "medium", "hard"];
  if (!validDifficulties.includes(difficulty.toLowerCase())) {
    return res.status(400).json({ message: "Invalid difficulty level." });
  }

  const tableName = `scores_${difficulty.toLowerCase()}`;

  // Insert the score into the appropriate table
  const stmt = db.prepare(
    `INSERT INTO ${tableName} (username, moves, time) VALUES (?, ?, ?)`
  );
  stmt.run(username, moves, time, function (err) {
    if (err) {
      console.error("Error inserting score:", err);
      return res.status(500).json({ message: "Error saving score." });
    }
    res.status(200).json({ message: "Score submitted successfully!" });
  });
  stmt.finalize();
});

// Handle /highscores route (GET request) for retrieving top scores
app.get("/highscores", (req, res) => {
  const { difficulty } = req.query;

  if (!difficulty) {
    return res.status(400).json({ message: "Difficulty is required." });
  }

  const tableName = `scores_${difficulty.toLowerCase()}`;
  db.all(
    `SELECT username, moves, time, timestamp FROM ${tableName} ORDER BY time ASC, moves ASC LIMIT 10`,
    (err, rows) => {
      if (err) {
        console.error("Error retrieving highscores:", err);
        return res.status(500).json({ message: "Error retrieving highscores." });
      }
      res.status(200).json(rows);
    }
  );
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
