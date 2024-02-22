import Header from "../componet/Header";
import "./index.css";
import Home from "../page/Home";
import Myprofile from "./test/Myprofile";
import Login from "../page/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="h-screen">
      <Header />
      <Routes>
        <Route path="/user/login" element={<Login />} />
      </Routes>
      <h1 className="text-3xl bg-red-400 font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
