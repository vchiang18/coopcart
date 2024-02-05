import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProperty from "./components/PropertyForm";
// import SignInForm from "./Signin";
// import SignUpForm from "./Signup";
// import SignInSignUp from "./components/SignupSignin.js";
// import PropertyAdd from "./components/PropertyAdd";
import SignupProperty from "./SignupProperty";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  return (
    <AuthProvider baseUrl="http://localhost:8000">
      <BrowserRouter>
        <div className="Container">
          <Routes>
            <Route path="/property/" element={<CreateProperty />} />
            <Route path="signup/property" element={<SignupProperty />} />            
            {/* <Route path="/signin" element={<SignInSignUp />} />
            <Route path="/signup" element={<SignInSignUp />} />
            <Route path="property/add" element={<PropertyAdd />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
