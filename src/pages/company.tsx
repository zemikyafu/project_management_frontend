import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { createCompany } from "@/api/companyService"
import { Navbar } from "../components/navbar"
import { Sidebar } from "../components/sidebar"
const Company: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: ""
  })

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!formState.name || !formState.email || !formState.address) {
        console.error("All fields are required")
        return
      }
      console.log("formState", formState)
      const response = await createCompany(formState.name, formState.email, formState.address)
      console.log("Company Created:", response)
      setFormState({ name: "", email: "", address: "" })
    } catch (error) {
      console.error("Error creating company:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Card className="w-full max-w-4xl md:w-[90%] lg:w-[70%]">
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
              Create Company
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Company
