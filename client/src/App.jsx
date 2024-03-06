import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Likes from "./pages/Likes";
import Explore from "./pages/Explore";

import Sidebar from "./components/Sidebar";

import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { loading, authUser } = useAuthContext();

  if (loading) return null;

  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="max-w-5xl my-5 mx-auto text-white flex-1 transition-all duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route
            path="/likes"
            element={authUser ? <Likes /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/explore"
            element={authUser ? <Explore /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}
