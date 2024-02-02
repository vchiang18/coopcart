import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./signup.css";
import CreateProperty from "./CreateProperty";
import SignInForm from "./Signin";
import SignUpForm from "./Signup";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import UserEdit from "./components/UserEdit";
import PropertyAdd from "./components/PropertyAdd";
import MainPage from "./components/Main";

function App() {
  const [type, setType] = useState("signIn");
  const baseUrl = process.env.REACT_APP_API_HOST;

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const SignInSignUp = () => (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div
        className={`container ${type === "signUp" ? "right-panel-active" : ""}`}
        id="container"
      >
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <div className="Container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/property/" element={<CreateProperty />} />
            <Route path="/signin" element={<SignInSignUp />} />
            <Route path="/signup" element={<SignInSignUp />} />
            <Route path="/user" element={<UserEdit />} />
            <Route path="/property/add" element={<PropertyAdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
