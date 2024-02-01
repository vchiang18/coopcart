import { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./views/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider baseUrl="http://localhost:8000">
        <Routes>
          <Route element={<LoginForm />} path="/login" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
