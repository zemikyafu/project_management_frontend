import React, { useState } from "react"
const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleNavBar = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const user = {
    name: localStorage.getItem("user") || "User",
    avatarUrl: "https://via.placeholder.com/150"
  }
  const getAvatarColor = (name: string) => {
    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"]
    const charCode = name.charCodeAt(0)
    return colors[charCode % colors.length]
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    console.log("User logged out")
    window.location.href = "/"
  }

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Side - Home Link */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-2xl font-semibold">
              Project Management
            </a>
            <a href="#" className="hover:bg-blue-600 px-4 py-2 rounded">
              Home
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleNavBar} className="md:hidden text-3xl focus:outline-none">
            ☰
          </button>

          {/* Right Side - User Profile */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="ml-2">{user.name}</span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-1 mt-12 w-48 bg-white text-black rounded shadow-lg z-50">
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </a>

                <a href="#" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Menu (Mobile View) */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden flex flex-col space-y-4 pb-4`}>
          <a href="#" className="hover:bg-blue-600 px-4 py-2 rounded">
            Home
          </a>
          <div className="flex items-center space-x-4" onClick={toggleDropdown}>
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span>{user.name}</span>
          </div>

          {dropdownOpen && (
            <div className="bg-white text-black rounded shadow-lg mt-2">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
