// src/components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import api from "../../api/axios";

export default function Navbar() {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          CareerCopilot
        </Link>

        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/resume/my-resumes" className="hover:text-indigo-600">
                My Resumes
              </Link>
              <Link
                to="/interview/my-interviews"
                className="hover:text-indigo-600"
              >
                My Interviews
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
