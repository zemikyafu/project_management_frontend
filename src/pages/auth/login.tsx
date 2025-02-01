import { AppDescription } from "@/components/app-description"
import LoginForm from "../../components/login-form"

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row  items-stretch">
        <div className="w-full max-w-md flex">
          <LoginForm />
        </div>
        <div className="w-full max-w-md flex">
          <AppDescription />
        </div>
      </div>
    </div>
  )
}
