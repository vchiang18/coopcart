import Nav from "./Nav";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "../signin.css";

function Dashboard() {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("../signin/");
  };

  return (
    <>
      {token ? (
        <>
          <Nav />
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold">CoopCart</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">
                Organizing your community's food needs!
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sign-in-form-container">
            <p>Please sign in to use the dashboard!</p>
            <button onClick={handleSignin} className="mainpage-button loginBtn">
              Login
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
