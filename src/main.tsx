import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Home } from "./pages/home"
import { LoginPage } from "./pages/auth/login"
import { SignupPage } from "./pages/auth/signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { UserManagement } from "./pages/dashboard/user-managment"
import { RoleManagement } from "./pages/dashboard/role-management"
import { TaskManagement } from "./pages/task-management"
import { InvitationManagement } from "./pages/invitation"
import PrivateRoute from "./components/private-route"
import Profile from "./pages/auth/profile"
import Company from "./pages/company"
import "./index.css"

import { LayoutRoute } from "./pages/layout-route"
import Workspaces from "./pages/workspaces"
import WorkspaceProjects from "./pages/workspace-projects"
import OnboardingForm from "./components/onboarding-form"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding/:invitationId" element={<OnboardingForm />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route element={<LayoutRoute />}>
          <Route path="/workspaces/:companyId?" element={<Workspaces />} />
          <Route path="/projectes/:workspaceId" element={<WorkspaceProjects />} />
          <Route path="/tasks/:projectId" element={<TaskManagement />} />
          <Route path="/invitation/:companyId?" element={<InvitationManagement />} />
          <Route
            path="/userManagement"
            element={<PrivateRoute element={<UserManagement />} requiredRole="company-owner" />}
          />
          <Route
            path="/roleManagement/:companyId?"
            element={<PrivateRoute element={<RoleManagement />} requiredRole="company-owner" />}
          />
          <Route path="/company" element={<PrivateRoute element={<Company />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
