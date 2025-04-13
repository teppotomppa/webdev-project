import React, { useState, useEffect } from "react";
import { buttonClickSound } from "./utils/audioUtils"; // Import the button click sound

const Highscores = ({
  turns,
  time,
  difficulty: initialDifficulty,
  onBackToMainMenu,
  viewOnly = false,
  resetHighscoresState,
}) => {
  const [username, setUsername] = useState("");
  const [highscores, setHighscores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [difficulty, setDifficulty] = useState(initialDifficulty);

  // Fetch highscores from the backend
  const fetchHighscores = async (selectedDifficulty) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://memorygame-apeva9cubhakb7ge.northeurope-01.azurewebsites.net/highscores?difficulty=${selectedDifficulty}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch highscores");
      }
      const data = await response.json();
      setHighscores(data);
    } catch (error) {
      console.error("Error fetching highscores:", error);
      setHighscores([]); // Fallback to an empty array
    } finally {
      setLoading(false);
    }
  };

  // Fetch highscores whenever the difficulty changes
  useEffect(() => {
    if (difficulty) {
      fetchHighscores(difficulty);
    }
  }, [difficulty]);

  // Submit the score to the backend
  const submitScore = async () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }

    try {
      const response = await fetch("https://memorygame-apeva9cubhakb7ge.northeurope-01.azurewebsites.net/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, moves: turns, time, difficulty }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit score");
      }

      setScoreSubmitted(true);
      fetchHighscores(difficulty); // Fetch highscores for the current difficulty
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Error submitting score. Please try again.");
    }
  };

  // Reset state when navigating back to the main menu
  const handleBackToMainMenu = () => {
    setScoreSubmitted(false); // Reset scoreSubmitted
    resetHighscoresState(); // Reset other states
    onBackToMainMenu(); // Navigate back to the main menu
  };

  return (
    <div className="highscores-container">
      {!difficulty ? (
        <div>
          <h2>Select Difficulty</h2>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              setDifficulty("easy");
            }}
            className="menu-RetroButton"
          >
            Easy
          </button>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              setDifficulty("medium");
            }}
            className="menu-RetroButton"
          >
            Medium
          </button>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              setDifficulty("hard");
            }}
            className="menu-RetroButton"
          >
            Hard
          </button>
          <button
            style={{ marginTop: "25px" }}
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              handleBackToMainMenu();
            }}
            className="menu-RetroButton"
          >
            Main Menu
          </button>
        </div>
      ) : !viewOnly && !scoreSubmitted ? (
        <div className="score-form">
          <h2>Submit Your Score</h2>
          <p>You completed the game in {turns} turns!</p>
          <p>
            Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </p>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              submitScore();
            }}
            className="menu-RetroButton"
          >
            Submit Score
          </button>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              handleBackToMainMenu();
            }}
            className="menu-RetroButton"
          >
            Back to Main Menu
          </button>
        </div>
      ) : (
        <div>
          <h2>
            Highscores -{" "}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : highscores.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Moves</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {highscores.map((score, index) => (
                  <tr key={index}>
                    <td>{score.username}</td>
                    <td>{score.moves}</td>
                    <td>
                      {Math.floor(score.time / 60)}:
                      {String(score.time % 60).padStart(2, "0")}
                    </td>
                    <td>
                      {new Date(score.timestamp + "Z").toLocaleString("fi-FI", {
                        timeZone: "Europe/Helsinki",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No highscores available for this difficulty.</p>
          )}
          <button
            style={{ marginTop: "25px" }}
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              setDifficulty(null);
            }}
            className="menu-RetroButton"
          >
            Back to Difficulty Selection
          </button>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              handleBackToMainMenu();
            }}
            className="menu-RetroButton"
          >
            Main Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Highscores;
