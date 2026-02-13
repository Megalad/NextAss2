import { Routes, Route } from "react-router-dom";
import { Items } from "./Items";
import { ItemDetail } from "./ItemDetail";
import TestApi from "./TestApi";
import Profile from "./Profile";
import Login from "./Login";
import RequireAuth from "./middleware/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/items" element={<Items />} />      
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="/test_api" element={<TestApi />} />

      {/* Add the Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protect the Profile Route */}
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;