import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useToken();
  // const { token } = useAuthContext();

  // console.log(token);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  }

  };

  return (
    <div clasName="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Sign In</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="username"
              placeholder="email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
