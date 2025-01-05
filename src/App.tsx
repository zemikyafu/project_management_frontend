import { Home } from "./pages/home"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./components/privateRoute"
import Profile from "./pages/auth/profile"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
