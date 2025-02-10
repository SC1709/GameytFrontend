import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context's data
interface MonsterContextType {
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    correctCount: number;
    setCorrectCount: React.Dispatch<React.SetStateAction<number>>;
    currentView: "index" | "question" | "status" | "result";
    setCurrentView: React.Dispatch<React.SetStateAction<"index" | "question" | "status" | "result">>;
    answerStatus: "correct" | "wrong" | null;
    setAnswerStatus: React.Dispatch<React.SetStateAction<"correct" | "wrong" | null>>;
    isAnswered: boolean;
    setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
    isCageFalling: boolean;
    setIsCageFalling: React.Dispatch<React.SetStateAction<boolean>>;
    resetGameState: () => void;  // Add the resetGameState function type
    setTotalQuestions: React.Dispatch<React.SetStateAction<number>>;
    totalQuestions: number


}

// Create a context with default values
const MonsterContext = createContext<MonsterContextType | undefined>(undefined);

// Create a provider component
export const MonsterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [currentView, setCurrentView] = useState<"index" | "question" | "status" | "result">("index");
    const [answerStatus, setAnswerStatus] = useState<"correct" | "wrong" | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [isCageFalling, setIsCageFalling] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    // Reset game state function
    const resetGameState = () => {
        setCurrentQuestionIndex(0);
        setCorrectCount(0);
        setCurrentView("index");
        setAnswerStatus(null);
        setIsAnswered(false);
        setIsCageFalling(false);
        setTotalQuestions(0);
    };

    return (
        <MonsterContext.Provider
            value={{
                currentQuestionIndex,
                setCurrentQuestionIndex,
                correctCount,
                setCorrectCount,
                currentView,
                setCurrentView,
                answerStatus,
                setAnswerStatus,
                isAnswered,
                setIsAnswered,
                isCageFalling,
                setIsCageFalling,
                resetGameState,
                setTotalQuestions,
                totalQuestions // Provide resetGameState
            }}
        >
            {children}
        </MonsterContext.Provider>
    );
};

// Create a custom hook to use the context in any child component
export const useMonsterContext = (): MonsterContextType => {
    const context = useContext(MonsterContext);
    if (!context) {
        throw new Error('useMonsterContext must be used within a MonsterProvider');
    }
    return context;
};
