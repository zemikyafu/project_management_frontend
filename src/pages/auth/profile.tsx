import React, { useState, useEffect } from "react"
import { getUserProfile, updateProfile } from "../../api/AuthService"
import NavBar from "../../components/ui/navBar"
import { UUID } from "crypto"

const Profile: React.FC = () => {
  const [user, setUser] = useState({ name: "", email: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [userId, setUserId] = useState<UUID>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        setUserId(userId as UUID)
        if (!userId) {
          throw new Error("User ID not found in localStorage")
        }
        const userData = await getUserProfile(
          userId as UUID,
          localStorage.getItem("token") as string
        )
        setUser(userData)
        setFormData(userData)
      } catch (error) {
        console.error("Failed to fetch user data", error)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = async () => {
    try {
      if (userId === undefined || formData.name === "" || formData.email === "") {
        throw new Error("Name and Email cannot be empty")
      }
      if (userId) {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Token not found in localStorage")
        }
        await updateProfile(userId, formData.name, formData.email, token)
      } else {
        console.error("User ID is undefined")
      }
      setUser(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update user data", error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Name: {user.name}</p>
              <p className="text-lg font-medium mb-6">Email: {user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
