import React from "react";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Students from "./Students";
import Classes from "./Classes";

const Home = () => {
  const navigate = useNavigate();

  const navigateToStudents = () => {
    navigate("/students");
  };

  const navigateToClasses = () => {
    navigate("/classes");
  };

  return (
    <>
      <Header />
      <div className="Container my-5 mx-3 text-center">
        <Button variant="primary" className="mx-2" onClick={navigateToStudents}>
          Students
        </Button>{" "}
        <Button variant="secondary" onClick={navigateToClasses}>
          Classes
        </Button>{" "}
        <Routes>
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;
