import React, { useState, useEffect } from 'react';
import './App.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_SPEED = 200;
const SPEED_DECREMENT = 20;
const LEVEL_THRESHOLD = 5;

type GameState = 'start' | 'playing' | 'over';

const App: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('start');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('over');
        return;
      }

      // Check collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('over');
        return;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
        const newLength = newSnake.length;
        if (newLength % LEVEL_THRESHOLD === 0) {
          setLevel(prev => prev + 1);
          setSpeed(prev => Math.max(50, prev - SPEED_DECREMENT));
        }
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, speed, gameState]);

  const startGame = () => {
    setGameState('playing');
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setSpeed(INITIAL_SPEED);
    setLevel(1);
    setGameState('playing');
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        grid.push(
          <div
            key={`${x}-${y}`}
            className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div className="App">
      {gameState === 'start' && (
        <>
          <h1>Snake Game</h1>
          <button onClick={startGame}>Start Game</button>
        </>
      )}
      {gameState === 'playing' && (
        <>
          <h1>Snake Game - Level {level}</h1>
          <p>Score: {snake.length - 1}</p>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)` }}>
            {renderGrid()}
          </div>
        </>
      )}
      {gameState === 'over' && (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>Final Score: {snake.length - 1} | Level: {level}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
