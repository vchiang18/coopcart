import React from "react";
import "./../css/mainpage.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("../signin/");
  };

  const handleSignup = () => {
    navigate("../signup/");
  };

  return (
    <div className="mainpage-center background-cover">
      <header className="mainpage-header">
        <h1>CoopCart</h1>
        <div className="mainpage-btns">
          <button onClick={handleSignin} className="mainpage-button loginBtn">
            Login
          </button>
          <button onClick={handleSignup} className="mainpage-button signupBtn">
            Signup
          </button>
        </div>
      </header>
      <div style={{ height: "225px" }}></div>
      <div>
        <h1 className="mainpage-title">Welcome to CoopCart</h1>
        <h2 className="mainpage-subtitle">
          Organizing your community's food needs!
        </h2>
        <p className="mainpage-subtitle">🍏🥕🍋</p>
      </div>
      <div style={{ height: "200px" }}></div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
