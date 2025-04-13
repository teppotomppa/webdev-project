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
  - Utility functions for card generation, game logic, and sound effects.

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

   - This function handles the logic for flipping cards and checking for matches.

   ```javascript
   // filepath: src/utils/handleCardClick.js
   export const handleCardClick = ({
     index,
     flipped,
     matched,
     cards,
     setFlipped,
     setMatched,
     setTurns,
     cardFlipSound,
     pendingCards,
     setPendingCards,
     timerRef,
   }) => {
     if (flipped.includes(index) || matched.includes(index)) return;

     if (flipped.length === 2 && !pendingCards.includes(index)) {
       if (timerRef.current) {
         clearTimeout(timerRef.current);
       }
       setFlipped((prevFlipped) =>
         prevFlipped.filter((i) => matched.includes(i))
       );
       setPendingCards([]);
     }

     setFlipped((prevFlipped) => [...prevFlipped, index]);
     cardFlipSound.currentTime = 0;
     cardFlipSound.play();
   };
   ```

---

## 8. Testing and Error Handling

- **Testing**:
  - Manual testing for game logic, API endpoints, and UI responsiveness.
  - Edge cases tested (e.g., invalid inputs, empty highscores).
- **Error Handling**:
  - Backend: Validates inputs and handles database errors.
  - Frontend: Displays error messages for failed API requests.

---

## 9. User Interface and Interaction
- **Design**:
  - Retro-styled UI using NES.css for a pixelated, nostalgic look.
  - Custom CSS for additional styling and responsive design.
- **Interaction**:
  - Smooth animations for card flips and victory celebrations.
  - Sound effects for user actions (e.g., card flips, button clicks).
  - Visual feedback for matched cards and game completion.
- **Accessibility**:
  - Keyboard navigation support for flipping cards and interacting with buttons.
  - Screen reader-friendly labels for cards and buttons.
- **Responsive Design**:
  - Optimized for both desktop and mobile devices.
  - Dynamic grid layout adjusts based on screen size and difficulty level.
