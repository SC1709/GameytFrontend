import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { action as registerAction } from "./pages/Register/RegisterPage";
import { action as loginAction } from "./pages/Login/LoginPage";
import RootLayout from "./layout/RootLayout";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import {
  // LoginPage,
  Question,
  // RegisterPage,
  NotFound,
  SingleQuestion,
  // RequireAuth,
  // RequireLogout,
  Success,
} from "./pages";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
// import { Carousel } from "./components/Carousel/index";
import { Summary } from "./pages/Summary/Summary";
// import AddQuizData from "./components/AddQuestions/AddQuestions";

// Lazy-loaded games
const MineYourAnswerGame = lazy(() => import("./games/mineYourAnswer/src/MineYourAnswerGame"));
const MonsterGame = lazy(() => import("./games/MonsterGame/src/App"));
const CatchApple = lazy(() => import("./games/catchTheApple/src/CatchApple"));
const DropDead = lazy(() => import("./games/DropDead/src/DropDead"));
const AnswerMario = lazy(() => import("./games/AnswerMario/src/App"));
const SnakeGame = lazy(() => import("./games/snakeGame/src/SnakeGame"));
const SkyQuiz = lazy(() => import("./games/sky-quiz/src/App"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {" "}
      {/*  Removed the error boundary */}
      {/* Routes */}
      {/* <Route element={<RequireLogout />}> */}
      {/* User Need to logout */}
      {/* <Route path="login" element={<LoginPage />} action={loginAction} /> */}
      {/* <Route
          path="register"
          element={<RegisterPage />}
          action={registerAction}
        />
      </Route> */}
      {/* <Route element={<RequireAuth />}> */}
      {/* User need to login */}
      <Route index element={<App />} />
      <Route path="question" element={<Question />} /> {/* added the Carousel */}
      <Route
        path="questions/play"
        element={
          <ProtectedRoute>
            <SingleQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="mine-your-answer/play/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Mine Your Answer Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <MineYourAnswerGame />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="monstergame/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Monster Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <MonsterGame />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/catch-the-apple/play/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Catch The Apple Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <CatchApple />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dropdead/play/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Drop Dead Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <DropDead />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/answer-mario/play"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Answer Mario Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <AnswerMario />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/snakegame/play/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Snake Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <SnakeGame />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sky-quiz/play/*"
        element={
          <ProtectedRoute>
            <Suspense
              fallback={
                <div>
                  Loading Sky Quiz Game...
                  <div className="parent-container">
                    <div className="loader"></div>
                  </div>
                </div>
              }
            >
              <SkyQuiz />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route path="finish" element={<Success />} />
      <Route path="watch" element={<Question />} />
      <Route path="summary" element={<Summary />} />
      {/* <Route path="questions/add" element={<AddQuizData />} /> */}
      {/* </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
