import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../contexts/useAuth";

function Top() {
  const { user } = useAuth();
  return (
    <div className="w-full p-4  flex justify-between items-center  space-x-4 shadow-lg">
      <div className="font-bold text-indigo-600">
        <span className="hidden md:inline-block">Welcome Back</span>
        <span className="text-black font-bold opacity-75 capitalize"> {user}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div>Hello </div>
        <div>
          <FaUser />
        </div>
      </div>
    </div>
  );
}

export default Top;
