import { Home } from "./pages/home"
import { LoginPage } from "./pages/auth/login"
import { SignupPage } from "./pages/auth/signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { UserManagement } from "./pages/dashboard/user_managment"
import PrivateRoute from "./components/privateRoute"
import Profile from "./pages/auth/profile"
import Company from "./pages/company"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/userManagement" element={<PrivateRoute element={<UserManagement />} />} />
          <Route path="/company" element={<PrivateRoute element={<Company />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
