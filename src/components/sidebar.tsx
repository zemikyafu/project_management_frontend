import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, ShieldCheck, ChevronDown, ChevronRight, Briefcase } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    name: "User Management",
    href: "/userManagement",
    icon: Users,
    subItems: [
      { name: "All Users", href: "/userManagement" },
      { name: "All Invitations", href: "/invitation" }
    ]
  },
  {
    name: "Role Management",
    href: "/roleManagement/",
    icon: ShieldCheck,
    subItems: [{ name: "All Roles", href: "/roleManagement/" }]
  },
  {
    name: "Workspace Management",
    href: "/workspaces",
    icon: Briefcase,
    subItems: [{ name: "Workspaces", href: "/workspaces" }]
  }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-blue-600">
      <div className="flex flex-col min-h-screen lg:h-screen  text-white border-r w-64">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item?.subItems ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between hover:bg-blue-700 text-white"
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 py-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={cn(
                              "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                              location.pathname === subItem.href ? "bg-blue-700" : "transparent",
                              "hover:bg-blue-700"
                            )}
                          >
                            <ChevronRight className="mr-2 h-4 w-4" />
                            {subItem.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                        location.pathname === item.href ? "bg-blue-700" : "transparent",
                        "justify-start hover:bg-blue-700"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
