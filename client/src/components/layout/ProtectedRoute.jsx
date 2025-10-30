// src/components/layout/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function ProtectedRoute() {
  const { user, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
