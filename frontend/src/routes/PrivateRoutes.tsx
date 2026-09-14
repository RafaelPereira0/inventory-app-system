import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface PrivateRoutesProps {
    allowedRoules?: ("ADMIN" | "MANAGER")
}

export default function PrivateRoutes({allowedRoules} : PrivateRoutesProps) {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading) return <div>Carregando...</div>

    if(!user) return <Navigate to="/login" state={{from: location}} replace/>

    if(allowedRoules && !allowedRoules.includes(user.role)) return <Navigate to="/" replace/>

    return <Outlet/>
}