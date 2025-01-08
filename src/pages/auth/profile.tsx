import React, { useState, useEffect } from "react"
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
import { getUserProfile, updateProfile } from "../../api/AuthService"
import { UUID } from "crypto"
interface User {
  name: string
  email: string
  avatar: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)
  const [userId, setUserId] = useState<UUID>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSave = async () => {
    try {
      if (userId === undefined || formData.name === "" || formData.email === "") {
        throw new Error("Name and Email cannot be empty")
      }
      if (userId) {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Token not found in localStorage")
        }
        await updateProfile(userId, formData.name, formData.email, token)
      } else {
        console.error("User ID is undefined")
      }
      setUser(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update user data", error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        setUserId(userId as UUID)
        if (!userId) {
          throw new Error("User ID not found in localStorage")
        }
        const userData = await getUserProfile(
          userId as UUID,
          localStorage.getItem("token") as string
        )
        setUser(userData)
        setFormData(userData)
      } catch (error) {
        console.error("Failed to fetch user data", error)
      }
    }

    fetchUserData()
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            {isEditing ? (
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
                  <p className="text-lg font-medium">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="text-lg font-medium">{user.email}</p>
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
