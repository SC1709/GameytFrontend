import React, { useState, useEffect } from 'react';
import { GameState } from '../types/index';
import questions from '../data/questions';
import WelcomeScreen from '../components/WelcomeScreen';
import InstructionsScreen from '../components/InstructionScreen';
import ResultScreen from '../components/ResultScreen';
import GameBoard from '../components/GameBoard';

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    showWelcomeScreen: true,
    showInstructionsPage: false,
    showResultScreen: false,
    boyPosition: 0,
    greenAppleY: 0,
    redAppleY: 0,
    birdPosition: -300,
    birdY: 0,
    currentQuestionIndex: 0,
    score: 0,
    correctImage: false,
    incorrectImage: false,
    isAnimatingBird: false,
    selectedApple: null
  });

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      showWelcomeScreen: false,
      showInstructionsPage: true
    }));
  };

  const startActualGame = () => {
    setGameState(prev => ({
      ...prev,
      showInstructionsPage: false
    }));
  };

  const replayGame = () => {
    setGameState({
      ...gameState,
      showResultScreen: false,
      currentQuestionIndex: 0,
      score: 0,
      greenAppleY: 0,
      redAppleY: 0,
      boyPosition: 0,
      birdPosition: -300,
      birdY: 0,
      correctImage: false,
      incorrectImage: false,
      isAnimatingBird: false,
      selectedApple: null
    });
  };

  const resetGame = () => {
    if (gameState.currentQuestionIndex === questions.length - 1) {
      setGameState(prev => ({ ...prev, showResultScreen: true }));
    } else {
      setGameState(prev => ({
        ...prev,
        greenAppleY: 0,
        redAppleY: 0,
        boyPosition: 0,
        birdPosition: -300,
        birdY: 0,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        correctImage: false,
        incorrectImage: false,
        isAnimatingBird: false,
        selectedApple: null
      }));
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!gameState.isAnimatingBird) {
      if (event.key === "ArrowLeft") {
        setGameState(prev => ({ ...prev, boyPosition: -80 }));
      } else if (event.key === "ArrowRight") {
        setGameState(prev => ({ ...prev, boyPosition: 80 }));
      } else if (event.key === "Enter") {
        const isLeftSide = gameState.boyPosition === -80;
        const currentQuestion = questions[gameState.currentQuestionIndex];
        
        if (isLeftSide && currentQuestion.isCorrect) {
          handleCorrectAnswer('green');
        } else if (isLeftSide && !currentQuestion.isCorrect) {
          handleIncorrectAnswer('green');
        } else if (!isLeftSide && !currentQuestion.isCorrect) {
          handleCorrectAnswer('red');
        } else if (!isLeftSide && currentQuestion.isCorrect) {
          handleIncorrectAnswer('red');
        }
      }
    }
  };

  const handleCorrectAnswer = (apple: 'green' | 'red') => {
    setGameState(prev => ({
      ...prev,
      greenAppleY: apple === 'green' ? 185 : 400,
      redAppleY: apple === 'red' ? 185 : 400,
      correctImage: true,
      score: prev.score + 1
    }));
    setTimeout(resetGame, 2500);
  };

  const handleIncorrectAnswer = (apple: 'green' | 'red') => {
    setGameState(prev => ({
      ...prev,
      greenAppleY: apple === 'green' ? 185 : 400,
      redAppleY: apple === 'red' ? 185 : 400,
      selectedApple: apple,
      incorrectImage: true,
      isAnimatingBird: true,
      birdPosition: apple === 'green' ?  80 : 80,
      birdY: 185
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        birdPosition: apple === 'green' ? -300 : 300,
        birdY: 0
      }));
    }, 2000);

    setTimeout(resetGame, 3000);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState.boyPosition, gameState.isAnimatingBird]);

  if (gameState.showWelcomeScreen) {
    return <WelcomeScreen onStart={startGame} />;
  }

  if (gameState.showInstructionsPage) {
    return <InstructionsScreen onStartGame={startActualGame} />;
  }

  if (gameState.showResultScreen) {
    return <ResultScreen score={gameState.score} onReplay={replayGame} />;
  }

  return (
    <GameBoard
      currentQuestion={questions[gameState.currentQuestionIndex]}
      score={gameState.score}
      gameState={{
        boyPosition: gameState.boyPosition,
        greenAppleY: gameState.greenAppleY,
        redAppleY: gameState.redAppleY,
        birdPosition: gameState.birdPosition,
        birdY: gameState.birdY,
        correctImage: gameState.correctImage,
        incorrectImage: gameState.incorrectImage,
        selectedApple: gameState.selectedApple
      }}
    />
  );
};

export default GameContainer;