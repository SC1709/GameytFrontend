import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSecureStorage } from "./encryptUtils";

const useQuestionStore = create(
  persist(
    (set, get) => ({
      // Initial state
      question: [],
      questionType: "mcqs",
      userAnswer: [],
      error: null,
      totalTime: 0,
      trueAnswer: 0,
      falseAnswer: 0,
      auth: {},
      page: 1,
      transcriptChunks: [],
      currentChunkIndex: 0,
      videoId: null,
      isFetching: false,

      // Utility to update common state
      setError: (error) => set({ error }),
      setIsFetching: (status) => set({ isFetching: status }),
      setQuestionType: (type) => set({ questionType: type }),
      setVideoId: (videoId) => {
        const { videoId: currentVideoId, resetQuestion } = get();
        if (currentVideoId !== videoId) {
          resetQuestion();
          set({ videoId });
        }
      },
      incrementIndex: () =>
        set((state) => {
          // console.log("Incrementing index from", state.currentChunkIndex);
          if (state.currentChunkIndex < state.transcriptChunks.length) {
            return { currentChunkIndex: state.currentChunkIndex + 1 };
          } else {
            console.warn("No more chunks to increment.");
            return state; // No change if it's at the end
          }
        }),

      // Fetch transcript
      fetchTranscript: async (videoId) => {
        try {
          const response = await fetch("https://backend.gameyoutube.com/transcript", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_API_AUTH_SECRET,
            },
            body: JSON.stringify({
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            }),
          });
          const { success, data } = await response.json();
          if (success && data?.chunks) {
            set({ transcriptChunks: data.chunks, currentChunkIndex: 0 });
          } else {
            throw new Error("Failed to fetch transcript");
          }
        } catch (error) {
          get().setError(error.message);
        }
      },

      // Fetch questions from a chunk
      fetchQuestionsFromChunk: async (videoId, chunkIndex, questionType) => {
        const { transcriptChunks, question, isFetching, setIsFetching } = get();

        if (isFetching) {
          console.warn("Already fetching questions; skipping this request.");
          return;
        }

        const chunk = transcriptChunks?.[chunkIndex];
        if (!chunk) {
          return get().setError("Chunk not available.");
        }

        if (question.some((q) => q.chunkIndex === chunkIndex)) {
          console.warn(`Questions for chunkIndex ${chunkIndex} already fetched.`);
          return; // Prevent duplicate fetch
        }

        setIsFetching(true);

        try {
          const response = await fetch("https://backend.gameyoutube.com/questions/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_API_AUTH_SECRET,
            },
            body: JSON.stringify({
              videoId,
              query: chunk.query,
              questionType,
            }),
          });
          const { data } = await response.json();
          if (data?.questions) {
            set((state) => ({
              question: [...state.question, ...data.questions.map((q) => ({ ...q, chunkIndex }))],
            }));
            get().incrementIndex(); // Increment index only if new questions are fetched
          } else {
            throw new Error("Failed to fetch questions");
          }
        } catch (error) {
          get().setError(error.message);
        } finally {
          setIsFetching(false);
        }
      },

      // Play more questions
      playMore: async (videoId, questionType) => {
        const { currentChunkIndex, transcriptChunks, isFetching, setQuestionType } = get();
        if (isFetching) {
          console.warn("Fetch in progress; skipping playMore.");
          return;
        }
        if (currentChunkIndex < transcriptChunks.length) {
          await setQuestionType(questionType);
          await get().fetchQuestionsFromChunk(videoId, currentChunkIndex, questionType);
        } else {
          get().setError("No more chunks available to fetch questions.");
        }
      },

      // Handle PDF file upload and fetch questions
      getPdfQuiz: async (pdfFile) => {
        const { isFetching, setIsFetching, setError } = get();
        if (isFetching) {
          console.warn("Fetch in progress; skipping getPdfQuiz.");
          return;
        }
        if (!pdfFile) {
          return setError("PDF file is required.");
        }
        setIsFetching(true);
        const formData = new FormData();
        formData.append("pdfFile", pdfFile);

        try {
          const response = await fetch("https://backend.gameyoutube.com/pdfQuestions", {
            method: "POST",
            body: formData,
            headers: {
              "x-api-key": import.meta.env.VITE_API_AUTH_SECRET,
            },
          });
          const data = await response.json();
          if (data.success && data.data[0]?.questions) {
            const fetchedQuestions = data.data[0].questions;
            set({ question: fetchedQuestions });
          } else {
            throw new Error("Error generating quiz.");
          }
        } catch (error) {
          setError(error.message || "An error occurred while fetching quiz.");
        } finally {
          setIsFetching(false);
        }
      },

      // Other actions...
      authUser: (auth) => set({ auth }),
      addAnswer: (answer) => set((state) => ({ userAnswer: [...state.userAnswer, answer] })),
      trueAction: () => set((state) => ({ trueAnswer: state.trueAnswer + 1 })),
      falseAction: () => set((state) => ({ falseAnswer: state.falseAnswer + 1 })),
      logoutUser: () => {
        get().resetQuestion();
        set({
          auth: {},
          totalTime: 0,
          transcriptChunks: [],
          currentChunkIndex: 0,
          videoId: null,
        });
      },
      resetQuestion: () =>
        set({
          question: [],
          userAnswer: [],
          trueAnswer: 0,
          falseAnswer: 0,
          error: null,
          page: 1,
        }),
      resetGame: () => {
        get().resetQuestion();
        set({
          totalTime: 0,
          transcriptChunks: [],
          currentChunkIndex: 0,
          videoId: null,
        });
      },
      setTimeStamp: (time) => set({ totalTime: time }),
      nextPage: () =>
        set((state) => ({
          page: Math.min(state.page + 1, state.question.length),
        })),
    }),
    {
      name: "question-storage", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Ensure persistence uses localStorage
      onRehydrateStorage: () => {
        // Force the store to be saved to localStorage when it's initialized
        localStorage.setItem("question-storage", JSON.stringify({}));
      },
    }
  )
);

export default useQuestionStore;
