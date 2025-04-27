# Phase 4 – Project Presentation

## 🎯 Project Title
**MatchMaster: Interactive Memory Card Game**

---

## 📝 Project Overview
**Purpose:**
Create an engaging browser-based memory game to test and improve players' cognitive skills.

**Target Users:**
- Casual gamers
- Parents/teachers helping children develop memory skills

**Key Features:**
- Card flipping animations
- Move counter & timer
- Win condition detection
- Responsive grid layout
- Restart functionality

**Platform:**
React web application with CSS animations.

---

## 📌 Use Case Summary

| Use Case                | Implemented (Yes/No) | Demonstration / Notes                                      |
|-------------------------|----------------------|------------------------------------------------------------|
| User matches card pairs | Yes                  | Core gameplay logic – Game.js                              |
| Track moves & time      | Yes                  | State management in App.js                                  |
| Reset game              | Yes                  | Button component with state reset                           |
| Difficulty levels       | No                   | Future expansion possibility                                |

---

## ✍️ Technical Implementation
**Tech Stack:**
- Frontend: React, CSS Grid, CSS Animations
- State Management: React useState/useEffect
- Deployment: GitHub Pages

**Key Technical Features:**
1. Card Grid System:
   // Dynamic card generation
   const [cards, setCards] = useState(shuffle([...cardValues, ...cardValues]));

2. Match Detection Logic:
   // In Game component
   useEffect(() => {
     if (openedCards.length === 2) checkMatch();
   }, [openedCards]);

3. Animations:
   CSS transform/transition for smooth card flips

---

## 🚂 Development Process
1. Setup (Week 1):
   - Create React App scaffolding
   - Design card component structure

2. Core Gameplay (Week 2):
   - Implement card matching logic
   - Add move counter & timer

3. Polish (Week 3):
   - Create card flip animations
   - Implement restart functionality
   - Add responsive styling

---

## ☀️ Reflection and Future Work
**Successes ✅**
- Smooth card animations
- Effective state management
- Clean UI/UX

**Challenges ❗**
- Managing asynchronous card flip states
- Preventing double-click errors

**Future Improvements ➕**
1. Multiple difficulty levels (4x4, 6x6 grids)
2. Score tracking system
3. Themed card sets
4. Sound effects

---

## 📊 Work Hours Log

| Date       | Time | Task                                |
|------------|------|-------------------------------------|
| 01.05.2024 | 4h   | Base card component development     |
| 05.05.2024 | 5h   | Matching logic implementation       |
| 10.05.2024 | 3h   | Animation system                    |
| **Total**  | **32h** |                                     |

---

## 🪢 Presentation Links
**Live Demo:** https://teppotomppa.github.io/webdev-project/
**GitHub Repo:** https://github.com/teppotomppa/webdev-project
