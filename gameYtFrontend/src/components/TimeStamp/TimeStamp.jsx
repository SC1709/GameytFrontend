import { useEffect, useState } from "react";
import useQuestionStore from "../../store/zustand";
import { getTimeByMs } from "../../utils";
import { useNavigate } from "react-router-dom";

const defaultCountdown = {
  minutes: "00",
  seconds: "00",
};

function TimeStamp() {
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [startTime, setStartTime] = useState(true);
  const { totalTime, setTimeStamp, question } = useQuestionStore();

  const navigate = useNavigate();

  // Set the timestamp when `question` is available
  useEffect(() => {
    if (question.length > 0 && !totalTime) {
      const totalSeconds = question.length * 30; // 30 seconds per question
      setTimeStamp(new Date().getTime() + totalSeconds * 1000); // Set totalTime
    }
  }, [question, totalTime, setTimeStamp]);

  // Countdown logic
  useEffect(() => {
    let intervalId;
    if (startTime && totalTime) {
      intervalId = setInterval(() => {
        const timeNext = getTimeByMs(totalTime);

        if (timeNext) {
          setCountDown(timeNext);
        } else {
          clearInterval(intervalId);
          setStartTime(false);
          navigate("/finish");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, totalTime, navigate]);

  return (
    <div className="bg-black text-white font-semibold text-lg px-5 py-1 rounded-3xl shadow-lg shadow-neutral-500 ">
      <span>{countDown.minutes}</span>
      <span>:</span>
      <span>{countDown.seconds}</span>
    </div>
  );
}

export default TimeStamp;
