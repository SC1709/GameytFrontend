import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your state
interface RootState {
  gamescore: number;
  totalQuestion: number;
  showWelcomeScreen: boolean;
  showInstructionsPage: boolean;
  showResultScreen: boolean;
  showGameScreen: boolean;
}

// Initial state with type
const initialState: RootState = {
  gamescore: 0,
  totalQuestion: 0,
  showWelcomeScreen: true,
  showInstructionsPage: false,
  showResultScreen: false,
  showGameScreen: false,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setTotalQuestion: (state, action: PayloadAction<number>) => {
      state.totalQuestion = action.payload;
      console.log(state.totalQuestion);
    },
    setGameScore: (state, action: PayloadAction<number>) => {
      state.gamescore = action.payload;
      console.log(state.gamescore);
    },
  },
});

export const { setTotalQuestion, setGameScore } = rootSlice.actions;
export default rootSlice.reducer;
