
---

# Project Phase 2 - Basic Structure and Main Functionalities

Here is documented the basic structure and main functionalities of my project: Memory Game.

---

## 1. Environment
- **Frontend**: Built with React, styled using NES.css and custom CSS for a retro look.
- **Backend**: Node.js with Express for API endpoints.
- **Database**: SQLite for storing highscores.
- **Deployment**: 
  - Frontend hosted on Azure Static Web Apps.
  - Backend hosted on Azure App Service.
  - SQLite database stored on the backend.

---

## 2. Backend
- **Technologies**: Node.js, Express, SQLite.
- **Endpoints**:
  - `/submit-score`: Accepts POST requests to save highscores.
  - `/highscores`: Accepts GET requests to retrieve highscores based on difficulty.
- **Error Handling**: Validates inputs (e.g., difficulty level) and handles database errors gracefully.
- **Static File Serving**: Serves the React frontend from the `build` directory.

---

## 3. Frontend
- **Technologies**: React, NES.css, custom CSS.
- **Features**:
  - Dynamic grid layout based on difficulty.
  - Sound effects for interactions (e.g., card flips, button clicks).
  - Responsive design for mobile and desktop.
- **Components**:
  - `App.js`: Main component managing game state and rendering the UI.
  - `Highscores.js`: Displays and submits highscores.
  - Utility functions for card generation and game logic.

---

## 4. Database
- **Technology**: SQLite.
- **Structure**:
  - Tables for each difficulty (`scores_easy`, `scores_medium`, `scores_hard`).
  - Columns: `id`, `username`, `moves`, `time`, `timestamp`.
- **Data**:
  - Stores highscores with username, moves, time, and timestamp.

---

## 5. Basic Structure and Architecture
- **Frontend**:
  - Organized into `src` folder with components, utilities, and styles.
  - Public assets (e.g., images, sounds) stored in `public` and `build` directories.
- **Backend**:
  - Single entry point (`server.js`) for API and static file serving.
  - Database connection and table creation handled on server startup.
- **Communication**:
  - Frontend communicates with backend via REST API.

---

## 6. Functionalities
- **Game Logic**:
  - Card matching with win detection.
  - Timer and move counter for tracking performance.
- **Highscores**:
  - Submit and retrieve highscores via API.
  - Display highscores in a styled table.
- **Animations**:
  - Victory balloons animation on game completion.
- **Sound Effects**:
  - Card flips, button clicks, and victory celebrations.

---

## 7. Code Quality and Documentation
- **Code Quality**:
  - Modular structure with reusable components and utilities.
  - Clear separation of concerns between frontend and backend.
- **Documentation**:
  - Inline comments for key functions and logic.
  - README file with setup and deployment instructions.

### Example Key Functions:
#### Frontend:
1. **Card Matching Logic**:
   - This function checks if two cards are a match. It is a core part of the game logic.
   ```javascript
   // filepath: src/utils/gameLogic.js
   export function checkMatch(card1, card2) {
       return card1.id === card2.id;
   }
   ```

2. **Timer Functionality**:
   - This component tracks the game duration in real-time. It starts when the game begins and stops when the game ends.
   ```javascript
   // filepath: src/components/Timer.js
   import { useState, useEffect } from 'react';

   export default function Timer({ isRunning }) {
       const [time, setTime] = useState(0);

       useEffect(() => {
           let timer;
           if (isRunning) {
               timer = setInterval(() => setTime((prev) => prev + 1), 1000);
           } else {
               clearInterval(timer);
           }
           return () => clearInterval(timer);
       }, [isRunning]);

       return <div>Time: {time}s</div>;
   }
   ```

3. **Highscore Submission**:
   - This function sends the player's score to the backend for storage in the database.
   ```javascript
   // filepath: src/utils/api.js
   export async function submitHighscore(username, moves, time, difficulty) {
       const response = await fetch('/submit-score', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username, moves, time, difficulty }),
       });
       return response.json();
   }
   ```

#### Backend:
1. **Submit Highscore Endpoint**:
   - This endpoint receives the player's score and saves it to the database. It also validates the input.
   ```javascript
   // filepath: server.js
   app.post('/submit-score', async (req, res) => {
       const { username, moves, time, difficulty } = req.body;
       if (!username || !moves || !time || !difficulty) {
           return res.status(400).json({ error: 'Invalid input' });
       }
       try {
           const table = `scores_${difficulty}`;
           await db.run(
               `INSERT INTO ${table} (username, moves, time, timestamp) VALUES (?, ?, ?, ?)`,
               [username, moves, time, Date.now()]
           );
           res.status(200).json({ message: 'Score submitted successfully' });
       } catch (error) {
           res.status(500).json({ error: 'Database error' });
       }
   });
   ```

2. **Retrieve Highscores Endpoint**:
   - This endpoint fetches the top scores for a given difficulty level from the database and returns them to the frontend.
   ```javascript
   app.get('/highscores', async (req, res) => {
       const { difficulty } = req.query;
       if (!difficulty) {
           return res.status(400).json({ error: 'Difficulty level is required' });
       }
       try {
           const table = `scores_${difficulty}`;
           const scores = await db.all(`SELECT * FROM ${table} ORDER BY moves, time LIMIT 10`);
           res.status(200).json(scores);
       } catch (error) {
           res.status(500).json({ error: 'Database error' });
       }
   });
   ```

3. **Database Initialization**:
   - This function creates the database tables if they do not already exist. It ensures the database is ready for use.
   ```javascript
   // filepath: server.js
   async function initializeDatabase() {
       await db.run(`
           CREATE TABLE IF NOT EXISTS scores_easy (
               id INTEGER PRIMARY KEY,
               username TEXT,
               moves INTEGER,
               time INTEGER,
               timestamp INTEGER
           )
       `);
       await db.run(`
           CREATE TABLE IF NOT EXISTS scores_medium (
               id INTEGER PRIMARY KEY,
               username TEXT,
               moves INTEGER,
               time INTEGER,
               timestamp INTEGER
           )
       `);
       await db.run(`
           CREATE TABLE IF NOT EXISTS scores_hard (
               id INTEGER PRIMARY KEY,
               username TEXT,
               moves INTEGER,
               time INTEGER,
               timestamp INTEGER
           )
       `);
   }
   initializeDatabase();
   ```

---

## 8. Testing and Error Handling
- **Testing**:
  - Manual testing for game logic, API endpoints, and UI responsiveness.
  - Edge cases tested (e.g., invalid inputs, empty highscores).
- **Error Handling**:
  - Backend: Validates inputs and handles database errors.
  - Frontend: Displays error messages for failed API requests.
```
