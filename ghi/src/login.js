import { update, remove } from "./store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "./store/authApi";

export default function Login() {
  const token = useSelector((state) => state.authHandler.token);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const handleClick = async (e) => {
    let t = await login({ email: "jm@aloha.com", password: "test" });
    console.log(t);
    dispatch(update(t.data.access_token));
  };

  return (
    <div>
      <h1>{token}</h1>
      <button onClick={handleClick}>Login</button>
      <button onClick={() => dispatch(remove())}>Delete</button>
    </div>
  );
}

// import React, { useState } from 'react';
// import useToken from '@galvanize-inc/jwtdown-for-react';

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useToken();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//     e.target.reset();
//   }

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setState({
//       ...state,
//       [name]: value
//     });
//   };

//   const handleOnSubmit = async (evt) => {
//     evt.preventDefault();
//     try {
//       await login(state.username, state.password);
//       alert('Login successful');
//     } catch (error) {
//       alert('Login failed: ' + error.message);
//     }
//   };

//   //Use token in fetch

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Sign in</h1>
//         <input
//           type="username"
//           name="username"
//           value={state.username}
//           onChange={handleChange}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <a href="#">Forgot your password?</a>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;
