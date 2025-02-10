import { useState, useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Level, Types, GameTypes } from "./constant";
import useQuestionStore from "./store/zustand";
import AnimateProvider from "./components/AnimateProvider/AnimateProvider";

function App() {
  const [formState, setFormState] = useState({
    type: Types[0].name,
    level: Level[0],
    url: "",
    pdfFile: null,
    gameType: GameTypes[0].name,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { question, getPdfQuiz, fetchTranscript, playMore, setVideoId } = useQuestionStore();

  // Effect for handling YouTube video fetching
  useEffect(() => {
    const fetchYouTubeData = async (videoId) => {
      try {
        setIsLoading(true);
        setVideoId(videoId);
        await fetchTranscript(videoId);

        // Generate questions based on selected game type
        const selectedGameType = GameTypes.find((type) => type.name === formState.gameType);
        if (selectedGameType) {
          await playMore(videoId, selectedGameType.questionType);
        }

        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch video data. Please try again.");
        setIsLoading(false);
      }
    };

    const storedVideoId = localStorage.getItem("currentVideoId");
    const storedGameType = localStorage.getItem("selectedGameType");
    if (storedVideoId && storedGameType && !question.length) {
      fetchYouTubeData(storedVideoId, storedGameType);
    }
  }, [fetchTranscript, playMore, setVideoId, question.length, formState.gameType]);

  const handleInputChange = useCallback((field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setError("");
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (!file) return;

    if (file.size > maxSize) {
      setError("Please upload a file under 10 MB.");
      setFormState((prev) => ({ ...prev, pdfFile: null }));
      e.target.value = "";
      return;
    }

    setFormState((prev) => ({ ...prev, pdfFile: file }));
    setError("");
  }, []);

  const validateYoutubeUrl = useCallback((url) => {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
    return pattern.test(url);
  }, []);

  const handleBegin = async () => {
    try {
      setError("");
      const { type, url, pdfFile, gameType } = formState;

      // Find the selected game type configuration
      const selectedGameType = GameTypes.find((type) => type.name === gameType);
      if (!selectedGameType) {
        throw new Error("Invalid game type selected");
      }

      if (type === "YouTube") {
        if (!url) {
          throw new Error("Please enter a YouTube URL");
        }
        if (!validateYoutubeUrl(url)) {
          throw new Error("Please enter a valid YouTube URL");
        }

        const idMatch = url.match(/([a-zA-Z0-9_-]{11})/);
        if (idMatch) {
          const videoId = idMatch[1];
          localStorage.setItem("currentVideoId", videoId);
          localStorage.setItem("selectedGameType", selectedGameType.questionType);

          setIsLoading(true);
          setVideoId(videoId);
          await fetchTranscript(videoId);
          await playMore(videoId, selectedGameType.questionType);
          setIsLoading(false);
        }
      } else if (type === "PDF") {
        if (!pdfFile) {
          throw new Error("Please select a PDF file");
        }

        localStorage.setItem("selectedGameType", selectedGameType.questionType);
        setIsLoading(true);
        // Assuming getPdfQuiz should also handle different question types
        await getPdfQuiz(pdfFile, selectedGameType.questionType);
        setIsLoading(false);

        if (!question.length) {
          throw new Error("No questions could be generated from the PDF");
        }
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Redirect if questions exist
  if (question?.length) {
    return <Navigate to="/question" />;
  }

  return (
    <AnimateProvider>
      <div className="min-h-screen w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Welcome to <span className="text-orange-500">TGGT Quiz</span>
                </h1>
                <p className="text-sm md:text-base text-slate-600">Choose your content type and game type to begin</p>
              </div>

              <div className="space-y-6">
                {/* Content Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base text-slate-700 font-medium">Content Type</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    value={formState.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  >
                    {Types.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Game Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base text-slate-700 font-medium">Game Type</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    value={formState.gameType}
                    onChange={(e) => handleInputChange("gameType", e.target.value)}
                  >
                    {GameTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-2">
                  <label className="text-sm md:text-base text-slate-700 font-medium">Difficulty Level</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                    value={formState.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                  >
                    {Level.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {formState.type === "YouTube" && (
                  <div className="space-y-2">
                    <label className="text-sm md:text-base text-slate-700 font-medium">YouTube URL</label>
                    <input
                      type="text"
                      placeholder="Enter YouTube video URL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      value={formState.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                    />
                  </div>
                )}

                {formState.type === "PDF" && (
                  <div className="space-y-2">
                    <label className="text-sm md:text-base text-slate-700 font-medium">Upload PDF</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {formState.pdfFile && <span className="text-green-600 text-xl">✓</span>}
                    </div>
                    <p className="text-xs text-slate-500">Maximum file size: 10MB</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  onClick={handleBegin}
                >
                  Begin Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimateProvider>
  );
}

export default App;
