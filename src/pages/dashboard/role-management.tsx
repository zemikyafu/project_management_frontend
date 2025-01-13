import { Sidebar } from "../../components/sidebar"
import { Navbar } from "../../components/navbar"
import { RoleManagementMatrix } from "../../components/role/role-management-matrix"
export function RoleManagement() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 overflow-auto">
          <RoleManagementMatrix />
        </main>
      </div>
    </div>
  )
}
