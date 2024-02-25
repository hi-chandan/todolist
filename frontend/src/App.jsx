import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../componet/Header";

import "./index.css";
import Home from "../page/Home";
import Myprofile from "./test/Myprofile";

import Login from "../page/Login";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main";
import Register from "../page/Register";

function App() {
  const { isAuthentication, setisAuthentication } = useContext(Context);
  const { user, setuser } = useContext(Context);

  useEffect(() => {
    axios
      .get(`api/v1/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setisAuthentication(true);
        setuser(res.data.user);
      })
      .catch((error) => {
        setuser({});
        setisAuthentication(false);
      });
  }, []);

  return (
    <div className="h-screen ">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<Myprofile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      //{" "}
    </div>
  );
}

export default App;
