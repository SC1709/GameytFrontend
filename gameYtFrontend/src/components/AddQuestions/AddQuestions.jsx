import React, { useState } from "react";

function AddQuizData() {
  const [quizData, setQuizData] = useState({
    videoId: "",
    type: "", // This will now be selected from a dropdown
    topic: "",
    questions: [],
  });

  const [currentData, setCurrentData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: "", // Now this will hold the correct option (A, B, C, D)
  });

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentData.options];
    updatedOptions[index] = value;
    setCurrentData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { videoId, type, topic } = quizData;
    const { question, options, correctOption } = currentData;

    // Validate all inputs
    if (!videoId.trim() || !type.trim() || !topic.trim()) {
      alert("Please provide a video ID, type, and topic!");
      return;
    }
    if (!question.trim()) {
      alert("Please provide a question!");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      alert("Please provide all options!");
      return;
    }
    if (!correctOption.trim()) {
      alert("Please provide the correct answer!");
      return;
    }

    // Add question to quizData
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: currentData.question,
          options: currentData.options,
          correctOption,
        },
      ],
    }));

    // Reset current question form
    setCurrentData({
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
    });

    alert("Question added successfully!");
    console.log("Quiz Data:", quizData);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Quiz Data</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Video ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Video ID / URL
          </label>
          <input
            type="text"
            name="videoId"
            value={quizData.videoId}
            onChange={handleQuizChange}
            className="w-full p-2 border rounded"
            placeholder="Enter video ID or URL"
          />
        </div>

        {/* Type (Dropdown) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
            name="type"
            value={quizData.type}
            onChange={handleQuizChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="mcqs">MCQs</option>
            <option value="trueFalse">True/False</option>
            <option value="fillInTheBlanks">Fill in the Blanks</option>
            {/* Add more types as needed */}
          </select>
        </div>

        {/* Topic */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={quizData.topic}
            onChange={handleQuizChange}
            className="w-full p-2 border rounded"
            placeholder="Enter topic (e.g., JavaScript)"
          />
        </div>

        {/* Question */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question
          </label>
          <textarea
            name="question"
            value={currentData.question}
            onChange={handleQuestionChange}
            className="w-full p-2 border rounded"
            placeholder="Enter the question text"
          />
        </div>

        {/* Options */}
        {currentData.options.map((option, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Option {index + 1}
            </label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Enter option ${index + 1}`}
            />
          </div>
        ))}

        {/* Correct Option (Dropdown A, B, C, D) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correct Answer
          </label>
          <select
            name="correctOption"
            value={currentData.correctOption}
            onChange={handleQuestionChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Correct Answer</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuizData;
