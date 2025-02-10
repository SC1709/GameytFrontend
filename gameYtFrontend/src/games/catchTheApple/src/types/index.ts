export interface Question {
  statement: string;
  isCorrect: boolean;
}

export interface GameState {
  showWelcomeScreen: boolean;
  showInstructionsPage: boolean;
  showResultScreen: boolean;
  boyPosition: number;
  greenAppleY: number;
  redAppleY: number;
  birdPosition: number;
  birdY: number;
  currentQuestionIndex: number;
  score: number;
  correctImage: boolean;
  incorrectImage: boolean;
  isAnimatingBird: boolean;
  selectedApple: 'green' | 'red' | null;
}

export interface Question {
  statement: string;
  answer: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  correctOptionsIndex: number;
  options: string[];
  question: string;
}

export interface QuizData {
  success: boolean;
  data: {
    questions: QuizQuestion[];
    topic: string;
  };
}