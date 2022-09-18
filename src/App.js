import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Students from "./Components/Students";
import Classes from "./Components/Classes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
