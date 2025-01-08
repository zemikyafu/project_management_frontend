import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useNavigate } from "react-router-dom"
import { login } from "../api/AuthService"

export default function LoginForm() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login(formState.email, formState.password)
      localStorage.setItem("token", response.token)
      localStorage.setItem("name", response.name)
      localStorage.setItem("userId", response.userId)
      navigate("/home")
    } catch (err) {
      setErrorMessage((err as Error).message)
    }
  }

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setFormState({ ...formState, [name]: value })
  }

  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "" }
    if (!formState.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formState.password) {
      newErrors.password = "Password is required"
    } else if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="email-error">{errors.email}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="password-error">{errors.password}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
