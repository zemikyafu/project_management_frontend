import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { completeOnboarding } from "@/features/auth-hook"
import { useNavigate, useParams } from "react-router-dom"
import { OnboardingRequestSchema, OnboardingFormValues } from "../schemas/auth"
import { UUID } from "crypto"

export default function OnboardingForm() {
  const [formState, setFormState] = useState<OnboardingFormValues>({
    name: "",
    password: ""
  })
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({})
  const { invitationId } = useParams()
  const navigate = useNavigate()
  if (!invitationId) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Invitation ID is required to complete onboarding.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }
  const mutation = completeOnboarding(invitationId as UUID)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    setErrorMessages((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      OnboardingRequestSchema.parse(formState)
      mutation.mutate(formState, {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token)
          localStorage.setItem("name", response.name)
          localStorage.setItem("userId", response.userId)
          navigate("/home")
        },
        onError: (err: Error) => {
          setErrorMessages({ form: err.message })
        }
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = (err as z.ZodError).flatten().fieldErrors
        const formattedErrors = Object.keys(fieldErrors).reduce((acc, key) => {
          acc[key] = fieldErrors[key]?.join(", ") || ""
          return acc
        }, {} as Record<string, string>)
        setErrorMessages(formattedErrors)
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Compelete Onboarding to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formState.name}
              onChange={handleChange}
              aria-invalid={!!errorMessages.name}
              aria-describedby="name-error"
            />
            {errorMessages.name && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="name-error">{errorMessages.name}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formState.password}
              onChange={handleChange}
              aria-invalid={!!errorMessages.password}
              aria-describedby="password-error"
            />
            {errorMessages.password && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="password-error">{errorMessages.password}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Onboarding..." : "Complete Onboarding "}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
