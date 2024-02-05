import { useState } from "react";
import "../signup.css";
import SignInForm from "./Signin";
import SignUpForm from "./Signup";

function SignInSignUp() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  return (
    <div className="App">
      <h2 className="SignInSignUp-h2">Sign in/up Form</h2>
      <div
        className={`container ${type === "signUp" ? "right-panel-active" : ""}`}
        id="container"
      >
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="SignInSignUp-h1">Welcome Back!</h1>
              <p className="SignInSignUp-p">
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
              <h1 className="SignInSignUp-h1">Hello, Friend!</h1>
              <p className="SignInSignUp-p">Enter your personal details and start journey with us</p>
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
}

export default SignInSignUp;
