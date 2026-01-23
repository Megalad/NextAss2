import { Routes, Route } from "react-router-dom";
import TestApi from "./TestApi";

function App() {
  return (
    <Routes>
      <Route path="/test_api" element={<TestApi />} />
    </Routes>
  );
}

export default App;
