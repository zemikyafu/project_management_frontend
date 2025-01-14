import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCreateCompany } from "../features/company-hook"

const Company: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: ""
  })

  const [company, setCompany] = useState<typeof formState | null>(null)
  const [viewMode, setViewMode] = useState<"form" | "view">("form")

  const { newCompany, errors } = useCreateCompany()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.address) {
      console.error("All fields are required")
      return
    }

    newCompany.mutate(formState, {
      onSuccess: (data) => {
        setCompany(data)
        setViewMode("view")
        setFormState({ name: "", email: "", address: "" })
      }
    })
  }

  const handleEdit = () => {
    setFormState(company!)
    setViewMode("form")
  }

  if (newCompany.isPending) {
    return <p>Loading...</p>
  }

  if (newCompany.isError) {
    return <p>Error: {errors?.message}</p>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Card className="w-full max-w-4xl md:w-[90%] lg:w-[70%]">
          {viewMode === "form" ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Create Company</CardTitle>
              </CardHeader>
              <Separator className="my-4" />
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="flex justify-center">
                <Button type="submit" className="w-full md:w-auto" onClick={handleSubmit}>
                  {newCompany.isPending ? "Creating..." : "Create Company"}
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Company Details</CardTitle>
              </CardHeader>
              <Separator className="my-4" />
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <p>{company?.name}</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p>{company?.email}</p>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <p>{company?.address}</p>
                  </div>
                </div>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="flex justify-center space-x-4">
                <Button onClick={handleEdit} className="w-full md:w-auto">
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  className="w-full md:w-auto"
                  onClick={() => setViewMode("form")}
                >
                  Cancel
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Company
