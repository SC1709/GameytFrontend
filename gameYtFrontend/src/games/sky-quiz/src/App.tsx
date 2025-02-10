import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./Pages/StartPage";
import TutorialPage from "./Pages/TutorialPage";
import { AnimatePresence } from "framer-motion";
import GamePage from "./Pages/GamePage";
import ResultPage from "./Pages/ResultPage";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

function App() {
  return (
    <div className="App">
      <div>
        <Provider store={store}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </AnimatePresence>
        </Provider>
      </div>
    </div>
  );
}

export default App;
