import React, { useState, useEffect, useCallback } from "react";
import Highscores from "./Highscores"; // Import the Highscores component
import "./App.css";

const difficultyLevels = {
  easy: 6, // 12 cards (6 pairs)
  medium: 12, // 24 cards (12 pairs)
  hard: 18, // 36 cards (18 pairs),
};

const generateCards = (pairs) => {
  const baseEmojis = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍒",
    "🥑",
    "🍍",
    "🥕",
    "🍕",
    "🍔",
    "🍩",
    "🌮",
    "🍪",
    "🥨",
    "🥝",
    "🍜",
    "🍣",
  ];
  const selectedEmojis = baseEmojis.slice(0, pairs);
  const cards = selectedEmojis.flatMap((emoji, index) => [
    { id: index, name: emoji },
    { id: index, name: emoji },
  ]);
  return cards.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turns, setTurns] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [effectClass, setEffectClass] = useState("");
  const [balloons, setBalloons] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [gridStyle, setGridStyle] = useState({});
  const [showHighscores, setShowHighscores] = useState(false);

  // Timer state
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  const handleGameWin = useCallback(() => {
    setIsWin(true);
    setIsTimerRunning(false); // Stop timer
    setEffectClass("win-effect");
    generateBalloons();
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
    // Adjust grid style based on difficulty
    if (difficulty) {
      const numCards = difficultyLevels[difficulty] * 2;
      const columns = Math.floor(Math.sqrt(numCards)); // Automatically decide number of columns
      const rows = Math.ceil(numCards / columns); // Calculate rows needed
      setGridStyle({
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      });
    }
  }, [difficulty]);

  const generateBalloons = () => {
    const balloonArray = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      delay: Math.random() * 3 + "s",
    }));
    setBalloons(balloonArray);
  };

  const handleCardClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTurns(turns + 1);
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setMatched([...matched, first, second]);
        setEffectClass("match-effect");
        setTimeout(() => setEffectClass(""), 500);
      } else {
        setEffectClass("wrong-effect");
        setTimeout(() => setEffectClass(""), 500);
      }
      setTimeout(() => setFlipped([]), 750);
    }
  };

  const startNewGame = (level) => {
    setCards(generateCards(difficultyLevels[level]));
    setFlipped([]);
    setMatched([]);
    setTurns(0);
    setIsWin(false);
    setEffectClass("");
    setBalloons([]);
  };

  return (
    <div className={`game-container ${effectClass}`}>
      {!difficulty && !showHighscores ? (
        <div className="menu">
          <h1>Memory Game</h1>
          <p>Select Difficulty</p>
          <button onClick={() => setDifficulty("easy")} className="menu-button">
            Easy
          </button>
          <button
            onClick={() => setDifficulty("medium")}
            className="menu-button"
          >
            Medium
          </button>
          <button onClick={() => setDifficulty("hard")} className="menu-button">
            Hard
          </button>
          <button
            onClick={() => setShowHighscores(true)}
            className="menu-button"
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
              <li>The fewer turns you take, the better your score!</li>
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
              onClick={() => setDifficulty(null)}
              className="new-game-button"
            >
              Main Menu
            </button>
            <button
              onClick={() => startNewGame(difficulty)}
              className="new-game-button"
            >
              New Game
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
                onClick={() => handleCardClick(index)}
              >
                {flipped.includes(index) || matched.includes(index)
                  ? card.name
                  : "❓"}
              </div>
            ))}
          </div>
          <div className="game-stats">
            <p>Turns: {turns}</p>
            <p>Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</p>
          </div>
          {isWin && (
            <div>
              <p className="win-message">
                Congratulations! You won the game in {turns} turns and {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}!😎🎉
              </p>
              <button
                onClick={() => setShowHighscores(true)}
                className="highscores-button"
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
