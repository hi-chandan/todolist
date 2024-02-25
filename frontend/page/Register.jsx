import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../src/main";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthentication, setisAuthentication } = useContext(Context);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `api/v1/register`,
        {
          name,
          email,
          password,
        },
        axiosConfig
      );
      toast.success(data.message);
      setisAuthentication(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthentication(false);
    }
  };

  if (isAuthentication) return navigate("/");

  return (
    <div className="h-full flex justify-center items-center flex-col bg-red-200 ">
      <form
        action=" "
        className="flex flex-col justify-center items-center  w-1/4 h-80 rounded-lg  p-10 space-y-6 mb-32 bg-blue-300 "
        onSubmit={handelsubmit}
      >
        <input
          className="p-2 w-full border-none outline-none text-lg rounded-md"
          type="text"
          placeholder="your name"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="p-2 w-full border-none outline-none text-lg rounded-md"
          type="text"
          placeholder="Enter you email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          className="p-2 w-full outline-none text-lg rounded-md"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="bg-green-600 p-3 w-2/4 ">Register</button>
      </form>
    </div>
  );
};

export default Register;
