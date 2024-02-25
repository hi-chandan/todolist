import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../src/main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthentication, setisAuthentication } = useContext(Context);
  const [loader, setloader] = useState(false);
  const logoutHandler = async () => {
    setloader(true);
    try {
      await axios.get("/api/v1/logout", {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setisAuthentication(false);
      setloader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthentication(true);
      setloader(false);
    }
  };

  useEffect(() => {
    if (!isAuthentication) return navigate("/login");
  }, [isAuthentication]);

  return (
    <div className="bg-gray-400">
      <div className="flex justify-center items-center  ">
        <h1 className="text-2xl font-bold ml-10 ">ToDoList</h1>
        <ul className=" space-x-10 w-full text-right text-2xl p-5 mr-20">
          <Link to="">Home</Link>
          <Link to="/me">MyProfile</Link>

          {isAuthentication ? (
            <button disabled={loader} onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            // <Link to="/login">Logout</Link>
            <Link to="/login">Login</Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
