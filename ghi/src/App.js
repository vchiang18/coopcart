import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSignUp from "./components/SignupSignin.js";
import SignupProperty from "./SignupProperty";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import UserEdit from "./components/UserEdit";
import PropertyAdd from "./components/PropertyAdd";
import Dashboard from "./components/Dashboard";

function App() {
  const [type, setType] = useState("signIn");
  const baseUrl = process.env.REACT_APP_API_HOST;

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <div className="Container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="signup" element={<SignupProperty />} />
            <Route path="/signin" element={<SignInSignUp />} />
            <Route path="/user" element={<UserEdit />} />
            <Route path="/property/add" element={<PropertyAdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
