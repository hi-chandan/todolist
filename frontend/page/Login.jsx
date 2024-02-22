import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const loginfo = async (e) => {
    e.preventDefault();
    https: try {
      const data = await axios.post(
        "/user/login",
        {
          email,
          password,
        },
        axiosConfig
      );
      toast.success(data.message);
    } catch (error) {
      toast.error("some Error has occure");
    }
  };

  return (
    <div className="h-full flex justify-center items-center flex-col bg-red-200 ">
      <form
        action=" "
        className="flex flex-col justify-center items-center  w-1/4 h-80 rounded-lg  p-10 space-y-6 mb-32 bg-blue-300 "
        onSubmit={loginfo}
      >
        <input
          className="p-2 w-full border-none outline-none text-lg"
          type="text"
          placeholder="Enter you email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          className="p-2 w-full outline-none text-lg"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="bg-green-600 p-3 w-2/4 ">Login</button>
      </form>
    </div>
  );
};

export default Login;
