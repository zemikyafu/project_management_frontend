import { useState } from "react"
import { Button } from "../components/ui/button"
import NavBar from "../components/ui/navBar"
import Footer from "@/components/ui/footer"

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <section className="bg-blue-600 text-white text-center py-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Simplify Project Management</h1>
          <p className="text-xl mb-6">Plan, collaborate, and execute projects with ease.</p>
          <div className="space-x-4">
            <a
              href="#"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg"
            >
              Create company
            </a>
            <a
              href="#"
              className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-md text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2"> Management Workspace </h3>
            <p className="text-gray-600">
              create a workspace for your team and manage your projects efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2"> Management Project </h3>
            <p className="text-gray-600">
              Create a project and add tasks, assignees, and due dates to keep track of your work.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2"> Management task </h3>
            <p className="text-gray-600">
              Create task and assign to team members to keep track of your work.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
