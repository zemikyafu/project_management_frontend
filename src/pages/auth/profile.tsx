import React, { useState } from "react"
import { usefetchProfile, useUpdateProfile } from "@/features/auth-management"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar"
import { UUID } from "crypto"

interface User {
  name: string
  email: string
  avatar: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const userId = localStorage.getItem("userId") as UUID

  const { profile, error, isPending } = usefetchProfile(userId)

  const [formData, setFormData] = useState<User>({
    name: profile?.name || "",
    email: profile?.email || "",
    avatar: profile?.avatar || ""
  })

  const { newProfile, errors: updateError } = useUpdateProfile(userId, formData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const response = newProfile.data
      if (!updateError) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Failed to update user data", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar} alt={profile?.name} />
                <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            {isPending ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Failed to load profile: {error.message}</p>
            ) : isEditing ? (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="text-lg font-medium">{profile?.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="text-lg font-medium">{profile?.email}</p>
                </div>
              </div>
            )}
          </CardContent>
          <Separator className="my-4" />
          <CardFooter className="flex justify-center">
            {isEditing ? (
              <div className="space-x-4">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
