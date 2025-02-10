import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import StartScreen from './pages/StartScreenPage'
import TutorialScreen from './pages/TutorialScreenPage';
import GameScreen from './pages/GameScreenPage'
import Success from './Success/Success'

const App: React.FC = () => {
 return (
   <Routes>
    <Route path="/" element ={<StartScreen/>}/>
    <Route path="/tutorial" element={<TutorialScreen/>}/>
    <Route path="/game" element={<GameScreen/>}/>
    <Route path="/success" element={<Success/>}/>
   </Routes>
  );
}

export default App
