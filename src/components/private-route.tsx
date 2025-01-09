import { Navigate } from "react-router-dom"
import { PrivateRouteProps } from "../types/PrivateRouteProps"

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? element : <Navigate to="/" />
}

export default PrivateRoute
