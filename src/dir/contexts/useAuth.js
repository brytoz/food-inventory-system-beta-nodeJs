import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  useReducer
} from 'react'
import axios from 'axios'
import AuthReducer from "./AuthReducer";
import {INITIAL_STATE} from "./AuthContext";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
 

  const [user, setUsername] = useState(null)
  const [role, setRole] = useState(null)
  const [code, setCode] = useState(null)

  // check if user is logged in and keep user logged in

  useEffect(() => {
  axios.defaults.withCredentials = true

    async function getUser() {
      try {
        await axios.get(`${process.env.REACT_APP_DB}/me`).then((result) => {
          if (result.data) {
            setUsername(result.data.data.username)
            setRole(result.data.data.role)
            setCode(result.data.data.code)
          } else {
            return false
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [state.currentUser])

  // memoize the values
  const memoizedValue = useMemo(
    () => ({
      user,
      role,
      code,
    }),
    [user],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
