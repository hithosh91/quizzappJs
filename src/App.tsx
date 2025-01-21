import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Quizpage from "./pages/Quizpage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quizz" element={<Quizpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
