import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { createContext } from "react";
export const Context = createContext();

const AppWrapper = () => {
  const [isAuthentication, setisAuthentication] = useState(false);
  const [user, setuser] = useState({});

  return (
    // <BrowserRouter>
    <Context.Provider
      value={{
        isAuthentication,
        setisAuthentication,
        user,
        setuser,
      }}
    >
      <App />
      <Toaster />
    </Context.Provider>
    // </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppWrapper />
  // </React.StrictMode>
);
