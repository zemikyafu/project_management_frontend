import { createCompany } from "@/api/companyService"
import React, { useState } from "react"

const Company: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: ""
  })

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!formState.name || !formState.email || !formState.address) {
        console.error("All fields are required")
        return
      }
      console.log("formState", formState)
      const response = await createCompany(formState.name, formState.email, formState.address)
      console.log("Company Created:", response)
      setFormState({ name: "", email: "", address: "" })
    } catch (error) {
      console.error("Error creating company:", error)
    }
  }

  return (
    <div className="flex">
      <header className="fixed w-full bg-blue-600 text-white">
        <div className="container mx-auto p-4">
          <h1 className="text-xl">Company Management</h1>
        </div>
      </header>
      <aside className="w-60 bg-gray-800 text-white h-screen pt-16 fixed">
        <nav className="mt-4">
          <ul>
            {["Home", "Companies", "Settings"].map((text) => (
              <li key={text} className="p-4 hover:bg-gray-700">
                {text}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-grow bg-gray-100 p-8 ml-60 mt-16">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl mb-4">Create Company</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Company
