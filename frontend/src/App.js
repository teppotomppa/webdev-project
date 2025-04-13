import React, { useState, useEffect, useCallback, useRef } from "react";
import Highscores from "./Highscores"; // Import the Highscores component
import { generateCards } from "./utils/generateCards";
import { handleCardClick } from "./utils/handleCardClick";
import { generateBalloons } from "./utils/generateBalloons";
import {
  cardFlipSound,
  victorySound,
  backgroundMusic,
  buttonClickSound,
} from "./utils/audioUtils";
import "./App.css";

const difficultyLevels = {
  easy: 6, // 12 cards (6 pairs)
  medium: 12, // 24 cards (12 pairs)
  hard: 18, // 36 cards (18 pairs),
};

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pendingCards, setPendingCards] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [effectClass, setEffectClass] = useState("");
  const [balloons, setBalloons] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [gridStyle, setGridStyle] = useState({});
  const [showHighscores, setShowHighscores] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);

  // Timer state
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const newMuted = !prevMuted;
      backgroundMusic.muted = newMuted;
      if (!newMuted && backgroundMusic.paused) {
        backgroundMusic.play().catch((error) => {
          console.error("Failed to play background music:", error);
        });
      }
      return newMuted;
    });
  };

  const startGameWithMusic = (level) => {
    setDifficulty(level);
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch((error) => {
        console.error("Failed to play background music:", error);
      });
    }
  };

  const resetHighscoresState = () => {
    setTurns(0);
    setIsWin(false);
    setTime(0); // Reset timer
    setIsTimerRunning(false); // Stop timer
  };

  useEffect(() => {
    if (difficulty) {
      startNewGame(difficulty);
      setTime(0); // Reset timer
      setIsTimerRunning(true); // Start timer
    }
  }, [difficulty]);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [isTimerRunning]);

  useEffect(() => {
    // Play the background music when the app loads
    backgroundMusic.volume = 0.1; // Set the volume (optional)
    backgroundMusic.play().catch((error) => {
      console.error("Failed to play background music:", error);
    });

    return () => {
      // Stop the music when the component unmounts
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  const handleGameWin = useCallback(() => {
    setIsWin(true);
    setIsTimerRunning(false); // Stop timer
    setEffectClass("win-effect");

    // Generate balloons and update the state
    const generatedBalloons = generateBalloons();
    setBalloons(generatedBalloons);

    victorySound.currentTime = 0; // Reset the sound to the beginning
    victorySound.play();

    setTimeout(() => setEffectClass(""), 2000);
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      handleGameWin();
    }
  }, [matched, cards, handleGameWin]);

  useEffect(() => {
    if (!isWin) {
      setBalloons([]);
    }
  }, [isWin]);

  useEffect(() => {
    if (difficulty) {
      let columns, rows;

      if (difficulty === "easy") {
        columns = 4;
        rows = 3;
      } else if (difficulty === "medium") {
        columns = 6;
        rows = 4;
      } else if (difficulty === "hard") {
        columns = 9;
        rows = 4;
      }

      setGridStyle({
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      });
    }
  }, [difficulty]);

  const onCardClick = (index) => {
    handleCardClick({
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
    });
  };

  const startNewGame = (level) => {
    setCards(generateCards(difficultyLevels[level]));
    setFlipped([]);
    setMatched([]);
    setTurns(0);
    setIsWin(false);
    setEffectClass("");
    setBalloons([]);
    setTime(0); // Reset timer
    setIsTimerRunning(true); // Stop timer
  };

  return (
    <div className={`game-container ${effectClass}`}>
      {!difficulty && !showHighscores ? (
        <div className="menu">
          <h1>Memory Game</h1>
          <p>Select Difficulty</p>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              startGameWithMusic("easy"); // Call the original function
            }}
            className="menu-RetroButton"
          >
            Easy
          </button>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              startGameWithMusic("medium"); // Call the original function
            }}
            className="menu-RetroButton"
          >
            Medium
          </button>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              startGameWithMusic("hard"); // Call the original function
            }}
            className="menu-RetroButton"
          >
            Hard
          </button>
          <button
            onClick={() => {
              buttonClickSound.currentTime = 0; // Reset the sound
              buttonClickSound.play(); // Play the sound
              setShowHighscores(true); // Show highscores
            }}
            className="menu-RetroButton"
          >
            Highscores
          </button>

          {/* Instructions inside a yellow box */}
          <div className="instructions-box">
            <h2>How to Play</h2>
            <ul className="instructions-list">
              <li>Click on a card to flip it over.</li>
              <li>Click on a second card to reveal it.</li>
              <li>If the two cards match, they stay flipped over.</li>
              <li>
                If the cards don't match, they will flip back after a short
                delay.
              </li>
              <li>Keep playing until all cards are matched!</li>
              <li>The faster you are, the better your score!</li>
            </ul>
          </div>
        </div>
      ) : showHighscores ? (
        <Highscores
          turns={turns}
          time={time} // Pass the time state
          difficulty={difficulty}
          viewOnly={!isWin}
          resetHighscoresState={resetHighscoresState}
          onBackToMainMenu={() => {
            setShowHighscores(false);
            setDifficulty(null); // Reset difficulty to go back to the main menu
          }}
        />
      ) : (
        <>
          <h1>Memory Game</h1>
          <div className="button-container">
            <button
              onClick={() => {
                buttonClickSound.currentTime = 0; // Reset the sound
                buttonClickSound.play(); // Play the sound
                setDifficulty(null); // Go back to the main menu
              }}
              className="new-game-button"
            >
              Main Menu
            </button>
            <button
              onClick={() => {
                buttonClickSound.currentTime = 0; // Reset the sound
                buttonClickSound.play(); // Play the sound
                startNewGame(difficulty); // Start a new game
              }}
              className="new-game-button"
            >
              New Game
            </button>
            <button
              onClick={() => {
                buttonClickSound.currentTime = 0; // Reset the sound
                buttonClickSound.play(); // Play the sound
                toggleMute(); // Toggle mute
              }}
              className="mute-button"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
          <div className="grid" style={gridStyle}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${
                  flipped.includes(index) || matched.includes(index)
                    ? "flipped"
                    : ""
                }`}
                onClick={() => onCardClick(index)}
              >
                {flipped.includes(index) || matched.includes(index) ? (
                  <img
                    src={card.name}
                    alt={`Card ${index}`}
                    className="card-image"
                  />
                ) : (
                  "❓"
                )}
              </div>
            ))}
          </div>
          <div className="game-stats">
            <p>Turns: {turns}</p>
            <p>
              Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
            </p>
          </div>
          {isWin && (
            <div>
              <p className="win-message">
                Congratulations! You won the game in {turns} turns and{" "}
                {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
                !😎🎉
              </p>
              <button
                style={{ marginTop: "-5px" }}
                onClick={() => {
                  buttonClickSound.currentTime = 0; // Reset the sound
                  buttonClickSound.play(); // Play the sound
                  setShowHighscores(true); // Show highscores
                }}
                className="highscores-RetroButton"
              >
                Submit Score & View Highscores
              </button>
            </div>
          )}
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="balloon"
              style={{
                left: balloon.left,
                animationDelay: balloon.delay,
              }}
            >
              🎈
            </div>
          ))}
        </>
      )}
    </div>
  );
}
