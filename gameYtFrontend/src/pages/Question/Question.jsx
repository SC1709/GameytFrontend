import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import useQuestionStore from "../../store/zustand";
import { Carousel } from "../../components/Carousel";
import { UnlockedCard } from "../../components/GameCards/UnlockedCard";
import { LockedCard } from "../../components/GameCards/LockedCard";

// Import assets
import List from "../../assets/list.png";
import Mario from "../../assets/marioChar.png";
import Monster from "../../assets/resultSucessMonster.png";
import Minner from "../../assets/miner.svg";
import boy from "../../assets/boy.png";
import cartoon from "../../games/DropDead/src/Resources/images/Cartoon.png";
import snake from "../../assets/snake.png";
import CloudIconImage from "../../assets/cloudIcon.png";

function Question() {
  const { setVideoId, fetchTranscript, playMore, question: questionData, questionType } = useQuestionStore();
  const [isSelected, setIsSelected] = useState(false);
  const [filterCards, setFilterCards] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const videoId = searchParams.get("v") || localStorage.getItem("currentVideoId");

  // Game categories
  const category = [
    {
      element: (
        <button onClick={() => handleFilterCards("MCQ")} key="filter-mcq">
          <UnlockedCard type="MCQ" tag="MCQ" description="Multiple Choice Questions Games" imgSrc={List} bg="#ff9f1c" />
        </button>
      ),
    },
    {
      element: (
        <button onClick={() => handleFilterCards("FIB")} key="filter-fib">
          <LockedCard type="FIB" tag="FIB" description="Fill in the Blanks Games" imgSrc={List} bg="#34bf73" />
        </button>
      ),
    },
    {
      element: (
        <button onClick={() => handleFilterCards("T&F")} key="filter-t&f">
          <UnlockedCard type="T&F" tag="T&F" description="True and False Games" imgSrc={List} bg="#2b9ae0" />
        </button>
      ),
    },
  ];

  // All games data
  const filteredGames = [
    {
      category: "MCQ",
      element: (
        <Link to="/questions/play" key="mcq1">
          <UnlockedCard bg="#fcd168" type="Classic MCQ" tag="MCQ" isActive={true} description="Test your knowledge with engaging MCQs!" imgSrc={List} />
        </Link>
      ),
    },
    {
      category: "MCQ",
      element: (
        <Link to="/mine-your-answer/play/" key="mcq2">
          <UnlockedCard bg="#a0c4ff" type="Mine Game" tag="MCQ" imgSrc={Minner} description="Test your knowledge by playing the mine game!" />
        </Link>
      ),
    },
    {
      category: "MCQ",
      element: (
        <Link to="/monstergame" key="mcq3">
          <UnlockedCard bg="#9381ff" type="Monster Game" tag="MCQ" imgSrc={Monster} description="Test your knowledge by playing the monster game!" />
        </Link>
      ),
    },
    {
      category: "MCQ",
      element: (
        <Link to="/answer-mario/play" key="mcq4">
          <UnlockedCard bg="#60d394" type="Mario Game" tag="MCQ" isActive={true} description="Test your knowledge by playing the mario game!" imgSrc={Mario} />
        </Link>
      ),
    },
    {
      category: "MCQ",
      element: (
        <Link to="/snakegame/play" key="mcq5">
          <UnlockedCard bg="#2a7d2a" type="Snake Game" tag="MCQ" isActive={true} description="Test your knowledge by playing the snake game!" imgSrc={snake} />
        </Link>
      ),
    },
    {
      category: "MCQ",
      element: (
        <Link to="/sky-quiz/play" key="mcq6">
          <UnlockedCard bg="#2eaebf" type="Sky Quiz Game" tag="MCQ" isActive={true} description="Test your knowledge by playing the sky quiz game!" imgSrc={CloudIconImage} />
        </Link>
      ),
    },
    {
      category: "T&F",
      element: (
        <Link to="/catch-the-apple/play" key="t&f1">
          <UnlockedCard bg="#2da169" type="Catch Apple" tag="T&F" isActive={true} description="Test your knowledge by playing the catch the apple game!" imgSrc={boy} />
        </Link>
      ),
    },
    {
      category: "T&F",
      element: (
        <Link to="/dropdead/play" key="t&f2">
          <UnlockedCard bg="#3fa7d6" type="Drop Dead" tag="T&F" isActive={true} description="Test your knowledge by playing the drop dead game!" imgSrc={cartoon} />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const selectedGameType = localStorage.getItem("selectedGameType");
    if (selectedGameType) {
      const filtered = filteredGames.filter((game) => game.category === selectedGameType);
      setFilterCards(filtered);
      setIsSelected(false);
    } else {
      setFilterCards(filteredGames);
    }

    return () => {
      localStorage.removeItem("selectedGameType");
      localStorage.removeItem("currentVideoId");
    };
  }, []);

  useEffect(() => {
    if (!videoId && questionData.length) return;

    const fetchData = async () => {
      if (!videoId) {
        alert("Oops! Something went wrong. Flying back to Dashboard...");
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "https://www.gameyoutube.com";
        }, 1000);
        return;
      }
      setVideoId(videoId);
      if (!questionData.length) {
        await fetchTranscript(videoId);
        await playMore(videoId, questionType);
      }
    };

    if (videoId && !questionData.length) {
      fetchData();
    }
  }, [videoId, questionData.length, setVideoId, fetchTranscript, playMore]);

  function handleFilterCards(category) {
    const filtered = filteredGames.filter((card) => card.category === category);
    setFilterCards(filtered);
    setIsSelected(true);
  }

  function handleResetFilter() {
    localStorage.removeItem("selectedGameType");
    setFilterCards(filteredGames);
    setIsSelected(false);
  }

  if (!questionData.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <AnimateProvider className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="rounded-xl p-4">
              <Carousel className="w-full">
                {(!isSelected ? category : filterCards).map((card, index) => (
                  <div key={index} className="p-2">
                    {card.element}
                  </div>
                ))}
              </Carousel>
            </div>
            {isSelected && (
              <div className="flex justify-center">
                <button
                  onClick={handleResetFilter}
                  className="transform transition-all duration-200 hover:scale-105 bg-[#f15bb5] text-white px-8 py-2.5 rounded-full font-bold tracking-wide shadow-lg hover:bg-[#e14aa4] focus:outline-none focus:ring-2 focus:ring-[#f15bb5] focus:ring-offset-2"
                >
                  Back
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-[200px] sm:h-[315px] rounded-lg"
                  ></iframe>
                ) : (
                  <img src="https://cdn.pixabay.com/photo/2020/09/23/07/53/quiz-5595288_1280.jpg" alt="Quiz placeholder" className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Game Details</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-800">
                      <span className="font-medium mr-2">Questions :</span>
                      {questionData.length} Questions
                    </p>
                    <p className="flex items-center text-gray-800">
                      <span className="font-medium mr-2">Difficulty :</span>
                      {questionData[0].difficulty || "Easy"}
                    </p>
                    <p className="flex items-center text-gray-800">
                      <span className="font-medium mr-2">Time Limit :</span>
                      30s each question
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateProvider>
  );
}

export default Question;
