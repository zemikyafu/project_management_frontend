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
import PrivateRoute from "./components/private-route"
import Profile from "./pages/auth/profile"
import Company from "./pages/company"
import App from "./App"
import "./index.css"

import { LayoutRoute } from "./pages/layout-route"
import Workspaces from "./pages/workspaces"
import WorkspaceProjects from "./pages/workspace-projects"

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
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        {/* Layout Protected Routes */}
        <Route element={<LayoutRoute />}>
          <Route path="/workspaces/:companyId?" element={<Workspaces />} />
          <Route path="/projectes/:workspaceId" element={<WorkspaceProjects />} />
          <Route path="/userManagement" element={<PrivateRoute element={<UserManagement />} />} />
          <Route path="/roleManagement" element={<PrivateRoute element={<RoleManagement />} />} />
          <Route path="/taskManagement" element={<PrivateRoute element={<TaskManagement />} />} />
          <Route path="/company" element={<PrivateRoute element={<Company />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
