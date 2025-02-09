import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { quizzdata } from "../utilities/Data.js"; // Assuming you have quizzdata defined properly
=======
import { quizzdata } from "../utilities/Data"; // Assuming you have quizzdata defined properly
>>>>>>> 81f3905 (Your commit message here)

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const Quizcard = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selanswer, setSelanswer] = useState<string>(""); // Selected answer
  const [currentquestionindex, setCurrentquestionindex] = useState(0);
  const [totalscore, setTotalscore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Timer duration in seconds
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Store timer ID for cleanup
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track if quiz is completed

  useEffect(() => {
    console.log("Loading data...");
    setQuestions(quizzdata.questions);
    setLoading(false); // Mark loading as false after data is set
  }, []);

  useEffect(() => {
    if (loading) {
      console.log("Loading state is true");
      // Show loading indicator while quiz data is being loaded
      return;
    }
    if (timerId) {
      clearInterval(timerId);
    }

    setTimeLeft(15); // Reset timer for each question

    const newTimerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(newTimerId);
          handleTimeout();
          return 0;
        }
      });
    }, 1000);

    setTimerId(newTimerId); // Store the new timer ID

    return () => {
      if (newTimerId) {
        clearInterval(newTimerId); // Cleanup the timer when component unmounts or question changes
      }
    };
  }, [currentquestionindex]);

  const handleTimeout = () => {
    if (currentquestionindex < questions.length - 1) {
      setCurrentquestionindex((prev) => prev + 1);
    } else {
      alert("Time's up for the quiz!");
      setQuizCompleted(true); // Mark quiz as completed when time is up
    }
  };

  const nextQuestion = () => {
    // Check if the selected answer is correct and update the score
    if (selanswer === currentQuestion.correct_answer) {
      setTotalscore((prev) => prev + 1);
    }

    if (currentquestionindex < questions.length - 1) {
      setCurrentquestionindex((prev) => prev + 1);
    } else {
      setQuizCompleted(true); // End the quiz when the last question is answered
    }
  };

  const currentQuestion = questions[currentquestionindex];
  const progressPercentage =
    ((currentquestionindex + 1) / questions.length) * 100;
  if (loading) {
    console.log("Loading state is true");
    // Show loading indicator while quiz data is being loaded
    return (
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-blue-500">
          Loading Quiz...
        </h2>
      </div>
    );
  }

  console.log("Quiz data loaded");

  if (quizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-green-500">
          Quiz Completed
        </h2>
        <h3 className="text-xl mt-4">
          Your Score: {totalscore} / {questions.length}
        </h3>

        <h2>
          {totalscore > 10 ? (
            "You Passed! 🎉"
          ) : (
            <Link to="/">You Failed! ❌ Retest Again</Link>
          )}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="w-[83%] h-20 text-2xl text-indigo-700 rounded-lg border-2 p-5">
          {currentQuestion?.question}
        </h1>
        {/* Circular Timer */}
        <div className="w-20 h-20 bg-blue-500 rounded-full text-center p-6">
          {timeLeft}'s
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        {currentQuestion?.options.map((option, index) => {
          // Check if this option is the selected answer
          const isSelected = selanswer === option;
          const isCorrect = option === currentQuestion.correct_answer;

          return (
            <button
              key={index}
              className={`py-2 px-4 rounded-md transition-all duration-300 ${
                isSelected
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
              }`}
              onClick={(e) => {
                const selectedOption =
                  (e.target as HTMLButtonElement).textContent || "";
                setSelanswer(selectedOption);
                // Optionally check the answer immediately or after timer finishes
                if (selectedOption === currentQuestion.correct_answer) {
                  setTotalscore((prev) => prev + 1);
                }
              }}
              disabled={isSelected} // Disable button after selection
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={() =>
            setCurrentquestionindex((prev) => Math.max(0, prev - 1))
          }
          disabled={currentquestionindex === 0}
          className={`py-2 px-4 rounded-md ${
            currentquestionindex === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 transition"
          }`}
        >
          Previous Question
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentquestionindex === questions.length - 1}
          className={`py-2 px-4 rounded-md ${
            currentquestionindex === questions.length - 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 transition"
          }`}
        >
          Next Question
        </button>
      </div>

      <h1 className="text-2xl text-green-500 text-center mt-4">{`${totalscore}/${questions.length}`}</h1>

      <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden mt-4">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="flex justify-center items-center h-full">
            <span className="text-sm p-2 font-medium text-black text-center">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizcard;
