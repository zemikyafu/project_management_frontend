import { Home } from "./pages/home"
import { LoginPage } from "./pages/auth/login"
import { SignupPage } from "./pages/auth/signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { UserManagement } from "./pages/dashboard/user-managment"
import { RoleManagememt } from "./pages/dashboard/role-management"
import { TaskManagememt } from "./pages/task-management"
import PrivateRoute from "./components/private-route"
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
          <Route path="/roleManagememt" element={<PrivateRoute element={<RoleManagememt />} />} />
          <Route path="/taskManagement" element={<PrivateRoute element={<TaskManagememt />} />} />
          <Route path="/company" element={<PrivateRoute element={<Company />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
