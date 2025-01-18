import { Navigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import { PrivateRouteProps } from "../types/PrivateRouteProps"

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/" />
  }

  try {
    const decodedToken: { exp: number; roles?: string[] } = jwtDecode(token)

    const isTokenExpired = decodedToken.exp * 1000 < Date.now()
    if (isTokenExpired) {
      console.warn("Token has expired.")
      return <Navigate to="/" />
    }
    if (requiredRole && (!decodedToken.roles || !decodedToken.roles.includes(requiredRole))) {
      console.warn("User does not have the required role.")
      return <Navigate to="/home" />
    }

    return element
  } catch (error) {
    console.error("Failed to decode token:", error)
    return <Navigate to="/" />
  }
}

export default PrivateRoute
