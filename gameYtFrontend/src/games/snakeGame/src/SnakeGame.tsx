import React from 'react'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "./index.css";

function SnakeGame() {
  return (
    <div><Provider store={store}>
    <App />
  </Provider></div>
  )
}

export default SnakeGame