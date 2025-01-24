import { UserTable } from "../../components/user/user-table"
import { useFetchUser, useUpdateUserStatus } from "@/features/user-hook"
import { UUID } from "crypto"
import { useParams, useNavigate } from "react-router-dom"
import { useFetchCompanies } from "@/features/company-hook"
import { Company } from "@/types"

export function UserManagement() {
  const { companyId } = useParams<{ companyId: UUID }>()
  const navigate = useNavigate()

  const { data: companies, isLoading: companiesLoading } = useFetchCompanies()
  const { users = [], error, isLoading } = useFetchUser(companyId as UUID)
  const updateStatusMutation = useUpdateUserStatus()

  const handleCompanySelect = (id: string) => {
    navigate(`/userManagement/${id}`)
  }
  const toggleUserStatus = async (userId: UUID, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    await updateStatusMutation.mutateAsync({ userId, status: newStatus })
  }

  if (!companyId) {
    return (
      <div className="flex flex-col items-center py-10">
        {companiesLoading ? (
          <p className="text-xl">Loading companies...</p>
        ) : (
          <>
            <p className="text-xl mb-4">Select a company to view the Company users</p>
            <select
              onChange={(e) => handleCompanySelect(e.target.value)}
              className="p-3 border rounded w-80 bg-white shadow-md"
            >
              <option value="">Select a company</option>
              {companies?.map((company: Company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    )
  }
  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error loading users.</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          {users && <UserTable users={users} onToggleStatus={toggleUserStatus} />}
        </div>
      </main>
    </div>
  )
}
