import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function Login() {
  axios.defaults.withCredentials = true;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_DB}/login`, {
          username: username,
          password: password,
        })
        .then(async (result) => {
          if (result.status === 200) {
            setSuccess(true);
            setStatus(result.data.data);
            dispatch({ type: "LOGIN", payload: username });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            setError(true);
            setStatus(result.data);
          }

          setTimeout(() => {
            setStatus("");
            setSuccess(false);
            setError(false);
          }, 5000);
        });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400  h-screen  flex justify-center items-center">
      <div className="bg-white p-6 md:p-12 rounded-xl">
        <div className="text-4xl text-center text-black">Admin Login</div>
        <div className="mt-2">
          <div className="flex justify-center ">
            {error && (
              <span className="text-center text-red-600 bold">{status}</span>
            )}
            {success && (
              <span className="text-center text-xl text-green-600 bold">
                {status}
              </span>
            )}
          </div>
          <div id="OffIt">
            <form
              onSubmit={handleLogin} 
              className="px-8 pt-6 pb-8  bg-white rounded"
            >
              <div className="mb-4 md:flex md:justify-between"></div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username Here"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="******************"
                />
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-xl hover:bg-black focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Go to dashboard
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <span className="inline-block text-sm  align-baseline text-black">
                  Forgotten Password? Contact the developer.
                </span>
              </div>

              <div className="text-center pt-4">
                <Link to="/register">
                  <span className="inline-block cursor-pointer text-base  align-baseline text-black">
                    Register.
                  </span>
                </Link>
              </div>
            </form>
          </div>

          <hr className="mb-6 border-t" />

          <div className="text-center mt-4">
            <span className="font-extrabold inline-block text-sm text-blue-900 align-baseline  ">
              Nora Inc.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
