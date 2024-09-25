import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/landing/home";
import About from "./Pages/landing/about";
import Navbar from "./components/organisms/navbar";
import Login from "./Pages/auth/login";
import SignUp from "./Pages/auth/signUp";
import Dashboard from "./Pages/Dashboard/dashboard";
import Demo from "./Pages/Dashboard/Demo";

const App: React.FC = () => {
  return (
    <div className="App">
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/sign_up" element={<SignUp/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/demo" element={<Demo/>} />

            </Routes>
    </div>
  );
}

export default App;
