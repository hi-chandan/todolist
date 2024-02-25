import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Myprofile = () => {
  const navigate = useNavigate();
  const { isAuthentication } = useContext(Context);
  const { user, setuser } = useContext(Context);

  useEffect(() => {
    if (!isAuthentication) return navigate("/login");
  }, []);
  return (
    <div className="bg-green-500 flex justify-center h-full">
      <h1 className="text-3xl">Welcom {user.name}</h1>
      <p className="text-2xl">{user.email}</p>
    </div>
  );
};

export default Myprofile;
