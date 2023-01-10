import * as React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Error from '../pages/Error'
import Login from '../pages/Login.jsx'
import Index from '../pages/dashboard/Index.jsx'
import Read from '../pages/dashboard/Read.jsx'
import AddProducts from '../pages/dashboard/AddProducts.jsx'
import { AuthContext } from '../contexts/AuthContext'
import Reg from '../pages/Reg'
import Profile from '../pages/dashboard/Profile'

const Stack = () => {
  const { currentUser } = React.useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />

          <Route
           path="/dashboard"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

<Route
           path="/addInventory"
            element={
              <RequireAuth>
                <AddProducts />
              </RequireAuth>
            }
          />

          
<Route
           path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            index
            element={
              <RequireAuth>
                <Index />
              </RequireAuth>
            }
          />
          <Route
            path="/read"
            element={
              <RequireAuth>
                <Read />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default Stack
