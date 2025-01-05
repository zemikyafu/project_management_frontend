import React, { useState } from "react"
import { register } from "../../api/AuthService"
import { useNavigate } from "react-router-dom"
export function Register() {
  const [formState, setFormState] = useState({ name: "", email: "", password: "" })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formState.password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/
    if (!passwordRegex.test(formState.password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one special character"
      )
      return
    }
    try {
      setError("")
      setMessage("")
      const response = await register(formState.name, formState.email, formState.password)
      setMessage("Registration successful. Please login to continue.")
      navigate("/")
    } catch (err) {
      console.log(err)
      setError("Registration failed. Please try again.")
    }
  }
  const handleOnchange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setFormState({ ...formState, [name]: value })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              id="name"
              name="name"
              onChange={handleOnchange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="email"
              id="email"
              name="email"
              onChange={handleOnchange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              id="password"
              name="password"
              onChange={handleOnchange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
