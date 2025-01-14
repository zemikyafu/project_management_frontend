// import { useState } from "react"
// import { Button } from "../components/ui/button"
// import { Navbar } from "../components/navbar"

// export function Home() {
//   return (
//     <div className="flex h-screen">
//       <div className="flex flex-col flex-grow">
//         <Navbar />
//         <div className="min-h-screen bg-gray-100">
//           <section className="bg-blue-600 text-white text-center py-24 px-4">
//             <div className="container mx-auto">
//               <h1 className="text-5xl font-bold mb-4">Project Management</h1>
//               <p className="text-xl mb-6">Plan, collaborate, and execute projects.</p>
//               <div className="space-x-4">
//                 <a
//                   href="/company"
//                   className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg"
//                 >
//                   Create company
//                 </a>
//                 //make this part to be dynamic list of companies featched
//                 <a
//                   href="/workspace/{company_id}"
//                   className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-md text-lg"
//                 >
//                  {CompanyName}
//                 </a>
//               </div>
//             </div>
//           </section>

//           <section className="container mx-auto py-16 px-6 text-center">
//             <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-2xl font-semibold mb-2">Manage Workspace</h3>
//                 <p className="text-gray-600">
//                   Create a workspace for your team and manage your projects efficiently.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-2xl font-semibold mb-2">Manage Project</h3>
//                 <p className="text-gray-600">
//                   Create a project with due dates and keep track of your work.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-2xl font-semibold mb-2">Manage Task</h3>
//                 <p className="text-gray-600">
//                   Create tasks and assign them to team members to keep track of your work.
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   )
// }
import React from "react"
import { Navbar } from "../components/navbar"
import { useFetchCompanies } from "../features/company-hook"

export function Home() {
  const { data: companies, isLoading, isError } = useFetchCompanies()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-600 text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Project Management</h1>
          <p className="text-lg mb-6">Plan, collaborate, and execute projects.</p>
          <a
            href="/company"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg block text-center mb-4"
          >
            Create Company
          </a>
          {isLoading && (
            <p className="bg-blue-700 text-center px-4 py-2 rounded-md">Loading companies...</p>
          )}
          {isError && (
            <p className="bg-red-500 text-center px-4 py-2 rounded-md">Failed to fetch companies</p>
          )}
          {!isLoading && !isError && companies?.length === 0 && (
            <p className="bg-blue-700 text-center px-4 py-2 rounded-md">
              No companies available. Create one to get started!
            </p>
          )}
          {!isLoading && !isError && companies?.length > 0 && (
            <div className="space-y-2 mt-4">
              {companies.map((company: any) => (
                <a
                  key={company.id}
                  href={`/workspace/${company.id}`}
                  className="bg-white text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-md block text-center"
                >
                  {company.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm mt-8">© 2025 Project Management Inc.</p>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Cards Section */}
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
