# Project phase 1 - Definition and planning

## 1. User Personas

### Persona 1: Sarah (Casual Gamer)
- **Age**: 25
- **Occupation**: Office Worker
- **Goals**: Wants to play for fun and occasionally compete for high scores. Sarah values a user-friendly interface and enjoys games that offer a sense of accomplishment.
- **Challenges**: Sarah may get frustrated if the game is too difficult or if it takes too long to load. She prefers straightforward gameplay with simple controls.

### Persona 2: John (Competitive Gamer)
- **Age**: 30
- **Occupation**: Software Developer
- **Goals**: John is motivated by high scores and improving his personal best. He likes to challenge himself with higher difficulty levels and speed.
- **Challenges**: John may become frustrated if the game lacks a leaderboard or competitive elements. He seeks new ways to improve his score.

### Persona 3: Emma (Beginner Gamer)
- **Age**: 18
- **Occupation**: Student
- **Goals**: Emma is new to memory games and is looking for something simple and easy to play. She is more interested in enjoying the game rather than competing.
- **Challenges**: Emma may feel overwhelmed by complex gameplay mechanics. She would prefer a casual experience with an option to replay easily.

## 2. Use Cases and User Flows

### Use Case 1: Play as a Guest
- **Actor**: Guest User
- **Goal**: Play the memory game without creating an account.
- **Flow**:
    1. User visits the website.
    2. User clicks on "Play as Guest".
    3. User selects the difficulty level (8, 12, or 20 cards).
    4. User starts the game, and the timer begins.
    5. Upon game completion, the user sees their score and can choose to replay or exit.
    6. After finishing, the user can view the high scores for the selected difficulty level.
    7. The user can return to the main menu or play again.

### Use Case 2: Register as a User
- **Actor**: Registered User
- **Goal**: Play the memory game and save their scores.
- **Flow**:
    1. User visits the website.
    2. User clicks on "Register".
    3. User fills out the registration form (username, email, password).
    4. User clicks on "Register" to create their account.
    5. User logs in with their newly created account.
    6. User selects the difficulty level (8, 12, or 20 cards).
    7. User starts the game, and the timer begins.
    8. Upon game completion, the user sees their score and can replay or save their score to the high scores table.
    9. After finishing, the user can view the high scores for the selected difficulty level.
    10. The user can save their score to the high scores table or exit.
    11. The user can return to the main menu and see the high scores for all difficulty levels.

## 3. UI Prototypes

- The UI will consist of:
    - **Homepage**: Buttons to either play as a guest, log in, or register.
    - **Login/Registration page**: Form for username, email, and password.
    - **Game page**: Display of the game area (cards), timer, and buttons to start/restart the game.
    - **High Scores page**: Table of top scores for each difficulty level (8, 12, or 20 cards) with an option to save a new score after finishing the game.
    - **Main Menu**: Option to view high scores for different difficulty levels (8, 12, or 20 cards) and to select a difficulty level to play.

## 4. Information Architecture and Technical Design

- **Frontend**: React will be used for building the interactive UI, which will fetch data from the backend (such as high scores) and manage game logic.
- **Backend**: Node.js/Express will handle user registration, login, game data (score saving), and API routes for interacting with the frontend.
- **Database**: **SQLite** will be used to store user data and high scores, including game results (turns, time, final score).
- **Authentication**: JWT (JSON Web Tokens) will be used for managing user sessions securely.
- **High Scores**: High scores will be stored in the database for each difficulty level (8, 12, or 20 cards) and be retrievable for both guests and registered users.

## 5. Project Management and User Testing

- **Development**: The project will be developed using a **step-by-step, incremental approach**, focusing on one feature or task at a time. Each step will be completed thoroughly before moving on to the next, ensuring steady progress with a clear goal in mind. This method will help maintain a manageable and peaceful development process, avoiding rushed decisions or overwhelming tasks. Features such as difficulty levels, score calculation, user authentication, and high scores functionality will be tackled individually, ensuring quality and focus for each.
  
- **User Testing**: After completing most of the game features, manual user testing will be conducted to evaluate the overall gameplay experience. Feedback will be gathered on UI/UX, game difficulty, and speed to refine the final product.


## Game Points System

The points system for the game is designed to reward speed while also penalizing incorrect moves. The game includes the following rules for score calculation:

1. **Time**: The player has a 3-minute timer to complete the game. The remaining time is worth points:
    - For every second remaining after the game is completed, the player gains **10 points**.
    - For example, if the player finishes the game in 2 minutes and 10 seconds, they would have 50 seconds remaining, which gives **500 points**.

2. **Turns**: Each unsuccessful move will result in a penalty:
    - For each incorrect turn, the player loses **5 points**.
    - For example, if the player makes 4 incorrect turns, they will lose **20 points**.

3. **Final Score**: The final score is calculated as:
    - `Final Score = (time remaining in seconds * 10) - (unsuccessful turns * 5)`
    - Example: Sarah plays a game with 8 cards, she finishes with 2 minutes and 30 seconds left, and makes 4 unsuccessful turns. Her score is:
        - `(150 * 10) - (4 * 5) = 1500 - 20 = 1480 points`
