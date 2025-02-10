import { Question } from '../types/index';
import { generateGameQuestions } from '../utils/QuestionGenerator';

let questions: Question[] = [];

try {
  // Retrieve the persisted state from localStorage
  const storedState = localStorage.getItem('question-storage');
  if (!storedState) {
    throw new Error('No data found in localStorage for "question-storage".');
  }

  // Parse the stored JSON state
  const parsedState = JSON.parse(storedState);

  // Validate the structure of the parsed state
  if (!parsedState || !Array.isArray(parsedState.state?.question)) {
    throw new Error('Invalid data structure in "question-storage". Expected an array in state.question.');
  }

  // Extract the questions and convert them into true/false format
  questions = generateGameQuestions(parsedState.state.question);
} catch (error) {
  console.error('Failed to load questions:', error instanceof Error ? error.message : 'Unknown error');
}

export default questions;
