import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

function Reg() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('')

  const navitage = useNavigate()
  axios.defaults.withCredentials = true
 
  const onSubmit = async (e) => {

    e.preventDefault();


    try{

       await axios.post(`${process.env.REACT_APP_DB}/register`,   {
            username:username,
            password: password,
            code:code,
            role:role
    }).then((result) => {

        if(result.status === 200) {
            setSuccess(true)
            setStatus(result.data)
            setTimeout(() => {
                navitage('/login')

            }, 1000);
        } else {
            setError(true)
            setStatus(result.data)
        }

        setTimeout(() => {
            setStatus('')
            setSuccess(false)
            setError(false)
        }, 10000);
        
        console.log(result);
    });
    } catch(err){
        console.log(err);
    }
}


  

  return (
    <div className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 h-screen  flex justify-center items-center p-24">
      <div className="bg-white p-8 rounded-xl">
        <div className="text-4xl text-center text-black" >
          Register
        </div>
        
        <div className="mt-4">
          <div className="flex justify-center ">
            {error && (
              <span className="text-center text-red-600 bold">
                {status}
              </span>
            )} 
            {success && (
              <span className="text-center text-xl text-green-600 bold">
                Success! Redirecting...
              </span>
            )}
             
          </div>
            <form
              onSubmit={onSubmit}
              className="px-8 pt-6 pb-2 bg-white rounded"
            >
              <div className="mb-4 md:flex md:justify-between"></div>
              <div className="mb-4">
                 
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required={true}
                  placeholder="Username"
                />
              </div>

              <div className="mb-4">
                 
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  required={true}
                  title='This is the code you were given for registration'
                  placeholder="Given Code"
                />
              </div>


              <div className="mb-4">
               
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required={true}
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <select
                required={true}
                 value={role}  onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                    <option value="">Select your role</option>
                    <option value="developer">Developer</option>
                    <option value="writer">Writer</option>
                    <option value="designer">Designer</option>
                    <option value="designer">Manager</option>
                </select>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-xl hover:bg-[#042b56] focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                    Register
                  {/* Go to dashboard */}
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <span className="inline-block text-sm  align-baseline text-black">
                  Forgotten Password? Contact the developer.
                </span>
              </div>

              <div className="text-center pt-4">
                <Link to="/login">
                  <span className="inline-block cursor-pointer font-bold text-base  align-baseline text-[#042b56]">
                    Login.
                  </span>
                </Link>
              </div>
            </form>
          </div>
 
      </div>
    </div>
  )
}

export default Reg