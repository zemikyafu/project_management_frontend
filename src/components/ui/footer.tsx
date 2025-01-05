import React from "react"
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} Project Management App</p>
    </footer>
  )
}
export default Footer
