import React from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignOutButton() {
  const { logout } = useToken();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const success = await logout();
    navigate("/");
  };

  return (
    <button onClick={handleSignOut} className="sign-out-button">
      Sign Out
    </button>
  );
}

export default SignOutButton;
