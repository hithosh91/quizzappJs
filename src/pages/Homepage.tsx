import { useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [mode, setMode] = useState(true); // true for light mode, false for dark mode
  const [name, setName] = useState("");

  const userlength = name.length > 0 ? name.length : 0;
  const profileNumber = Math.round(userlength * Math.random() * 2.2);

  return (
    <main className="w-full h-[100vh] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div
        className={`w-[75%] h-[80vh] ${
          mode ? "bg-white text-gray-800" : "bg-black text-white"
        } rounded-lg shadow-lg flex flex-col justify-center items-center relative`}
      >
        <span
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setMode(!mode)}
        >
          {mode ? "🌞" : "🌒"}
        </span>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Javascript Quiz App
        </h1>
        <p className="text-lg mb-6 text-center">
          Test your knowledge with our exciting quizzes!
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          className="m-4 w-[35%] h-16 bg-gray-100 rounded-lg p-7 focus:bg-green-200"
          onChange={(e) => setName(e.target.value)}
        />
        <Link
          to={"/quizz"}
          state={{ name, profileNumber }} // Correctly passing the state
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
};

export default Homepage;
