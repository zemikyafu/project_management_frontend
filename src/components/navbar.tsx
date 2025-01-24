import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const getInitials = (name: string) => {
  return name.trim().charAt(0).toUpperCase() || "U"
}

const name = localStorage.getItem("name") || "User"

const getColorFromInitial = (initial: string) => {
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-indigo-500"]
  const index = initial.charCodeAt(0) % colors.length
  return colors[index]
}
const user = {
  name: name,
  init: getInitials(name),
  avatarColor: getColorFromInitial(getInitials(name))
}
const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
  event.preventDefault()
  localStorage.removeItem("token")
  localStorage.removeItem("name")
  console.log("User logged out")
  window.location.href = "/"
}

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-6">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="Project Management" className="h-20 w-auto" />
            </div>

            <Link to="/home" className="text-sm font-medium text-primary hover:underline">
              Home
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={`h-full w-full flex items-center justify-center rounded-full ${user.avatarColor}`}
                    >
                      {user.init}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full flex items-center">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/logout" onClick={handleLogout} className="w-full flex items-center">
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
