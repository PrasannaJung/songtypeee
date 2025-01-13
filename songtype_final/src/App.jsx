import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";

import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Settings from "./pages/settings/Settings";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import SignUpPage from "./components/AuthForm/Signupform";
import Profile from "./pages/profile/profile";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />

        {/* error route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/404" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
