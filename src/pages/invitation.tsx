import { useFetchInvitations, useCreateInvitation } from "../features/invitation-hook"
import { InviteUserForm } from "../components/user/invitation-form"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { UUID } from "crypto"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchCompanies } from "@/features/company-hook"
import { Company } from "@/types"
import { InvitationTable } from "@/components/user/invitation-table"

export function InvitationManagement() {
  const { invitations, error, isLoading } = useFetchInvitations()
  const { data: companies, isLoading: companiesLoading } = useFetchCompanies()

  const navigate = useNavigate()
  const { companyId } = useParams<{ companyId: UUID }>()
  const [showInviteForm, setShowInviteForm] = useState(false)

  const sendInvitaion = (newInvitation: { email: string; roleId: string; workspaceId: string }) => {
    setShowInviteForm(false)
  }

  const handleCompanySelect = (id: string) => {
    navigate(`/invitation/${id}`)
  }

  if (!companyId) {
    return (
      <div className="flex flex-col items-center py-10">
        {companiesLoading ? (
          <p className="text-xl">Loading companies...</p>
        ) : (
          <>
            <p className="text-xl mb-4">Select a company to view Invitation lists</p>
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
    return <div>Loading Invitations...</div>
  }

  if (error) {
    console.log("error", error)
    return <div>Error loading invitations.</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold">Invitation </h1>
          <Button onClick={() => setShowInviteForm(true)}>Invite User</Button>
          {showInviteForm && (
            <InviteUserForm companyId={companyId} onCancel={() => setShowInviteForm(false)} />
          )}
          {invitations ? <InvitationTable invitations={invitations} /> : null}
        </div>
      </main>
    </div>
  )
}
