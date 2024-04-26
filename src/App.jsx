import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Screens/Register/Register";
import Login from "./Screens/Login/login";
import Home from "./Screens/Convert/Home";
import NavBar from "./components/Navbar/NavBar";
import LandingPage from "./Screens/Home/LandingPage";
import Dash from "./Screens/DashBoard/Dash";

function App() {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/Convert" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
