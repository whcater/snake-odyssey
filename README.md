# Snake Odyssey

A modern take on the classic Snake game, built with React and TypeScript using Vite for a fast, engaging experience.

## Overview

Snake Odyssey challenges players to navigate a snake across a 20x20 grid, eating food to grow while avoiding collisions with walls and itself. The game features progressive difficulty through levels, enhancing the traditional formula with a polished user interface.

## Design Details

- **Grid System**: A 20x20 grid (400 cells) provides a balanced play area, rendered with CSS Grid for precise positioning.
- **Controls**: Arrow keys (Up, Down, Left, Right) control the snake’s direction, with logic preventing reverse movement for smooth gameplay.
- **Level Progression**: Every 5 points (food eaten), the level increases, reducing the snake’s movement interval from 200ms to a minimum of 50ms, capped for playability.
- **User Experience**:
  - **Start Screen**: Welcomes players with a "Start Game" button, styled for clarity.
  - **Gameplay UI**: Displays real-time score and level above the grid, styled with a clean, centered layout.
  - **Game Over Screen**: Shows final score and level with a "Play Again" button, enhanced with shadows and hover effects.
  - **Styling**: Uses a light background (#f0f0f0), green snake (#4caf50), red food (#f44336), and blue buttons (#2196f3), all defined in `src/App.css` for visual appeal.
- **State Management**: React hooks (`useState`, `useEffect`) manage snake position, food, direction, speed, level, and game state ('start', 'playing', 'over') efficiently.
- **Tech Stack**: Built with React 19, TypeScript 5.7, and Vite 6.2 for modern development and fast builds.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/whcater/snake-odyssey.git
   cd snake-odyssey
   ```
2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Run the Game**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser to play.

## Play

- Start the game from the initial screen.
- Use arrow keys to guide the snake to the red food.
- Grow the snake and advance levels every 5 points.
- Restart after a game over to try again.

Enjoy Snake Odyssey!
