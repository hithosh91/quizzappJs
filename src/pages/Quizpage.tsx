import { useLocation } from "react-router-dom";
import Quizcard from "../components/Quizcard";

const Quizpage = () => {
  const location = useLocation();
  const username = location?.state?.name || "Guest";
  const profileNumber = location?.state?.profileNumber || 10; // Correct property name: 'profileNumber'

  console.log(profileNumber); // Check if profileNumber is being passed correctly

  return (
    <main className="w-full h-[100vh] bg-gradient-to-r from-indigo-800 to-blue-900">
      <header className="flex justify-between p-10">
        <h1 className="text-4xl text-teal-500 opacity-0.6">
          Welcome <span className="text-blue-300 italic">{username}</span> to
          Test your skills
        </h1>

        <img
          src={`https://i.pravatar.cc/150?img=${profileNumber}`} // Dynamic profile image based on profileNumber
          alt="Profile"
          className="w-30 h-30 ml-5 rounded-full border-4 border-yellow-500 transform hover:scale-110 transition duration-300 ease-in-out animate-bounceIn"
        />
      </header>

      <div className="flex justify-center items-center m-10 bg-white w-[70%] h-[75vh] mx-auto my-4 rounded-lg shadow-lg">
        <Quizcard />
      </div>
    </main>
  );
};

export default Quizpage;
