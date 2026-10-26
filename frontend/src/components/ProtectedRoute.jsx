import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionUser } from "../hooks/useSessionUser.js";
export default function ProtectedRoute() {
  const user = useSessionUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
