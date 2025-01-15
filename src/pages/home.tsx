import React from "react"
import { Navbar } from "../components/navbar"
import { useFetchCompanies, useSelectedCompany } from "../features/company-hook"
import { useNavigate } from "react-router-dom"

export function Home() {
  const { data: companies, isLoading, isError } = useFetchCompanies()
  const { setSelectedCompany } = useSelectedCompany()

  const navigate = useNavigate()

  const handleComanyselect = (companyId: string) => {
    setSelectedCompany(companyId)
    // navigate(`/workspaces/${companyId}`)
    navigate(`/workspaces`)
  }

  return (
    <div className="flex h-screen">
      <aside className="w-1/10 bg-blue-600 text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Project Management</h1>
          <p className="text-lg mb-6">Plan, and collaborate, and execute projects.</p>
          <a
            href="/company"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-6 rounded-md text-lg block text-center mb-4 w-full"
          >
            Create Company
          </a>
          {isLoading && (
            <p className="bg-blue-700 text-center px-6 py-6 rounded-md">Loading companies...</p>
          )}
          {isError && (
            <p className="bg-red-500 text-center px-6 py-6 rounded-md">Failed to fetch companies</p>
          )}
          {!isLoading && !isError && companies?.length === 0 && (
            <p className="bg-blue-700 text-center px-6 py-6 rounded-md">
              No companies available. Create one to get started!
            </p>
          )}
          {!isLoading && !isError && companies?.length > 0 && (
            <div className="space-y-2 mt-4">
              {companies.map((company: any) => (
                <button
                  key={company.id}
                  onClick={() => handleComanyselect(company.id)}
                  className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-6 rounded-md block text-center mb-4 w-full"
                >
                  {company.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm mt-8">© 2025 Project Management Inc.</p>
      </aside>
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="flex-grow bg-gray-100 py-16 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2">Manage Workspace</h3>
                <p className="text-gray-600">
                  Create a workspace for your team and manage your projects efficiently.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2">Manage Project</h3>
                <p className="text-gray-600">
                  Create a project with due dates and keep track of your work.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2">Manage Task</h3>
                <p className="text-gray-600">
                  Create tasks and assign them to team members to keep track of your work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
