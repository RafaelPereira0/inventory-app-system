
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRoutesProps {
    allowedRoles?: ("ADMIN" | "MANAGER" | "CUSTOMER")[];
}

export default function PrivateRoutes({
    allowedRoles,
}: PrivateRoutesProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return (
            <Navigate
                to="/login/erp"
                state={{ from: location }}
                replace
            />
        );
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === "ADMIN" || user.role === "MANAGER") {
            return <Navigate to="/erp" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}