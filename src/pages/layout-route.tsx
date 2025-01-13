import React from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Outlet } from "react-router-dom"

export const LayoutRoute: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}