import React, { useState } from "react";
import SideNav from "../../components/SideNav";
import Top from "../../components/Top";
import axios from "axios";
import useAuth from "../../contexts/useAuth";

function Profile() {
  axios.defaults.withCredentials = true;
  const { user, role } = useAuth();

  const [errorPass, setErrorPass] = useState(false);
  const [successPass, setSuccessPass] = useState(false);
  const [status, setStatus] = useState("");

  const [password, setPassword] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_DB}/updatepassword`, {
          username: user,
          password: password,
        })
        .then(async (result) => {
          if (result.status === 200) {
            setSuccessPass(true);
            setStatus(result.data);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          } else {
            setErrorPass(true);
            setStatus(result.data);
          }

          setTimeout(() => {
            setStatus("");
            setSuccessPass(false);
            setErrorPass(false);
          }, 5000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <SideNav />
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className="hidden md:block w-60 h-full"></div>
        <div className="flex-1 flex-wrap px-4">
          <Top />

          <div className=" flex-wrap  md:flex  justify-around">
            <div className="text-xl font-bold ">My Role: <span className="text-indigo-600 capitalize">{role}</span></div>
            <form onSubmit={resetPassword} className="pt-8 md:pt-3">
              <div className="text-3xl font-bold w-full pb-4">
                Change Password
              </div>
              {errorPass && (
                <span className="text-center text-red-600 bold">{status}</span>
              )}
              {successPass && (
                <span className="text-center text-xl text-green-600 bold">
                  {status}
                </span>
              )}
              <div className="mb-1 sm:mb-2">
                <label
                  htmlFor="password"
                  className="inline-block mb-1 font-medium"
                >
                  Enter new Password
                </label>
                <input
                  placeholder="********"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                />
              </div>
              <div className="mt-4 mb-2 sm:mb-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-600 focus:shadow-outline focus:outline-none"
                >
                  Update my Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
