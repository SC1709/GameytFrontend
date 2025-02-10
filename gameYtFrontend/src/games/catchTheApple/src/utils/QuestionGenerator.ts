import { QuizQuestion, Question } from '../types/index';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function generateGameQuestion(quizQuestion: QuizQuestion): Question {
  // Randomly decide if we want to create a true or false statement
  const makeCorrectStatement = Math.random() < 0.5;
  
  if (makeCorrectStatement) {
    // Create a true statement using the correct answer
    return {
      statement: `${quizQuestion.question}`,
      answer: `${quizQuestion.options[quizQuestion.correctOptionsIndex]}`,
      isCorrect: true
    };
  } else {
    // Create a false statement using an incorrect answer
    let wrongOptionIndex;
    do {
      wrongOptionIndex = getRandomInt(quizQuestion.options.length);
    } while (wrongOptionIndex === quizQuestion.correctOptionsIndex);

    return {
      statement: `${quizQuestion.question}`, 
      answer: `${quizQuestion.options[wrongOptionIndex]}`,
      isCorrect: false
    };
  }
}

export function generateGameQuestions(quizData: QuizQuestion[]): Question[] {
  return quizData.map(q => generateGameQuestion(q));
}