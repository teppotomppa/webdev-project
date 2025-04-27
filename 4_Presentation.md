# Phase 4 – Project Presentation

## Memory Game
Retro-styled memory card game, playable through web browser.

## Project Overview

This project serves as my final assignment for the Advanced Web Development course at Centria. It’s a browser-based memory card game designed to be simple, fun, and easy to learn, appealing to a wide range of players. For those who enjoy a bit of competition, the game features a highscores table. 

The gameplay involves matching pairs of identical images, with users encouraged to either play at their own pace or challenge themselves to complete the game as quickly as possible. After finishing, players can submit their score to the highscores table by entering a username. This submission includes their username, number of moves, completion time, and the submission timestamp. 

The highscores table is publicly accessible, and submissions are anonymous, with players selecting a new username each time they submit their score.

## Use Case Summary

In the planning phase (Phase 1), I outlined two primary use cases. Below is a table summarizing these use cases, along with additional clarifications to better explain the flow.

| Use Case                    | Action Allowed     | Description                                                                 |
|-----------------------------|--------------------|-----------------------------------------------------------------------------|
| **Use Case 1: Play as a Guest** | Yes                | Players can enjoy the memory game without the need to create an account. Guests can choose a difficulty level, play the game, view their score at the end, and check the highscores. |
| **Use Case 2: Register as a User** | No                 | The registration and login functionality was removed. Instead, SQLite is used to manage highscores, providing a simpler and more effective solution. |
| **Use Case 3: Submit a Score** | Yes                | Users can submit their score after completing the game, choosing a username of their choice to be linked with their score. |
| **Use Case 4: View Highscores** | Yes                | Users can view the highscores for each difficulty level either from the main menu or after submitting their score. |

## Technologies Used
- **Frontend**: Built using **React** for creating dynamic, component-based UI. **NES.css** was used for a retro, 8-bit game style, and **custom CSS** for animations like card flipping and transitions.
- **Backend**: **Node.js** and **Express.js** were used to handle server-side logic and HTTP requests. **SQLite** was chosen for storing highscores due to its lightweight, file-based nature.

### Architectural Decisions
- **Frontend-Backend Communication**: The frontend communicates with the backend via HTTP requests (GET and POST). GET requests are used to retrieve highscores, while POST requests handle score submissions after a game.
- **State Management**: **React** was chosen for its efficient state management system, allowing easy tracking of game state such as the number of moves, time taken, and card pairs.
- **Database Choice**: **SQLite** was selected for highscores as it provides an easy-to-integrate, low-maintenance solution, and is well-suited for a project of this size.

### Key Features Implementation
- **Memory Game**: The core game logic is implemented in React components. Players can choose difficulty, and the game tracks their moves and time.
- **Highscores**: After a game, players can submit their score (with a custom username) via a POST request to the backend. The backend saves this data in an **SQLite** database.
- **Responsive UI**: The game uses **NES.css** for a nostalgic, retro interface. Custom CSS animations are added to enhance the gameplay experience, providing smooth transitions for actions like card flips and game completion.

## Development Process

My initial goal was to create a lightweight game. After some thought, I decided on a memory card game that would run in the browser. Initially, I wanted to implement a login feature, as we covered that in the course, and I planned to keep scores for more competitive players. However, after further planning, I decided to simplify the project.

I ultimately scrapped the login and registration features, realizing that they added unnecessary complexity. The GDPR compliance requirements and security measures like bcrypt hashing made the process too cumbersome for a small-scale project. Instead, I opted to store scores with just a username submission, which worked perfectly for the project’s goals.

Some key decisions during the development were:
- **No login/registration**: This removed the need for complex security features and kept the project focused and simple.
- **Switch from PostgreSQL to SQLite**: I made this change to use a simpler, more lightweight database solution that would be easier to manage for the backend.
- **Retro style**: I decided to give the game a nostalgic, retro feel using NES.css, enhancing the game's visual appeal.
- **Hosting the demo on Azure**: Finally, I decided to host the demo on Azure, making the game accessible for all users to play.
- **Use of React and Node.js**: React was chosen for the frontend due to its ability to handle dynamic interfaces, while Node.js (with Express) powered the backend. These technologies were particularly interesting as they were covered during the course, and I wanted to implement them in this project to gain hands-on experience.
- **Hosting the demo on Azure**: I got a little taste of Azure during the course and wanted to learn more about it. Hosting the game on Azure provided an opportunity to explore cloud deployment and host a real-world application.

These decisions helped streamline the project and ensured a more manageable development process, resulting in a fun and user-friendly browser-based memory game.

## Reflection and Future Work

### What Worked Well:
- The game looks awesome and has great music and sound effects, creating an enjoyable experience for the players.
- The leaderboard system is engaging, with players submitting their scores under custom usernames, adding a personal touch.
- NES.css helped bring the retro aesthetic to life, and the styling turned out well after its implementation.

### Challenges Faced:
- The biggest challenge was implementing the card flip/check logic. The behavior I aimed for was: when the user clicks on the first card, it turns and stays, then on clicking the second card, if it matches the first, both cards remain flipped. If no match is found, the cards flip back after a short delay. The tricky part was making sure the cards either flip back after a small delay **or** when the user clicks the next card. This took some time to get right, but in the end, I managed to implement it as intended.
- Initially, styling was also challenging, but once I integrated NES.css, everything came together much more smoothly.

### What to Improve:
- **Card Images**: The pictures on the cards could be more engaging and visually interesting to enhance the game’s appeal.
- **Highscore Table Initialization**: The highscore table takes a long time to initialize, especially when the game has not been played recently. This is due to the limitations of the free Azure hosting plan, which can be slow.
- **Scoring System**: I’d like to introduce a new scoring system where players earn points based on correct or incorrect card flips, adding more depth to the competition.
- **Mute Button**: Make the mute button always visible so players can quickly adjust the sound settings during gameplay.
- **Volume Control**: Allow players to control the music volume and overall site volume, providing a more customizable experience.
- **Future Expansion**: In the long run, I’d like to create a website featuring multiple lightweight games (such as Minesweeper, Solitaire, and the Memory Card game) to offer a variety of fun challenges for users.

These improvements would further enhance the user experience and expand the scope of the project into a more comprehensive gaming platform.

# Project logbook

| Date  | Used hours | Subject(s) |  Outcome |
| :---:  |     :---:      |     :---:      |     :---:      |
| 22.03.2025 | 4 | Phase 1: Definition and Planning | Completed the assignment, fully planned my project for the course |
| 24.03.2025 | 3 | Started to build my memory game | Basic things are working and there is a game to play with some styling already. |
| 04.04.2025 | 2 | Updating my project structures | Adjusted some functionalities, next up is to create backend database for user control. |
| 07.04.2025 | 4 | Updating my project structures | Added backend (node express), database (SQLite), registration and login pages, registration page also adds username, email and password to the database. |
| 09.04.2025 | 4 | Working on the project | Adjusting things, optimizing, cleaning up the code. |
| 10.04.2025 | 6 | Finalized the project functionalities | Added sounds, retro-styling and more. Should be entirely done now! |
| 12.04.2025 | 3 | Adjusting the app. | Fixed some bugs and adjusted code. |
| 13.04.2025 | 8 | Adjusting some bugs. | Fixed some bugs and uploaded the app to Azure. |
| 27.04.2025 | 6 | Phase 4 - Presentation | Made a presentation on the final project. |
| **Total** | 40h | | |

# Some screenshots

### Main Menu
![Main Menu](https://github.com/teppotomppa/webdev-project/raw/main/mainMenu.png)

### Victory Screen
![Victory Screen](https://github.com/teppotomppa/webdev-project/raw/main/victory.png)

### Submit Score
![Submit Score](https://github.com/teppotomppa/webdev-project/raw/main/submitScore.png)

### Highscore Table
![Highscore Table](https://github.com/teppotomppa/webdev-project/raw/main/highscoreTable.png)
