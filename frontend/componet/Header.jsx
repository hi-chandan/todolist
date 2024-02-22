import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-gray-400">
      <div className="flex justify-center items-center  ">
        <h1 className="text-2xl font-bold ml-10 ">ToDoList</h1>
        <ul className=" space-x-10 w-full text-right text-2xl p-5 mr-20">
          <Link to="">Home</Link>
          <Link to="">MyProfile</Link>
          <Link to="/login">Login</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
