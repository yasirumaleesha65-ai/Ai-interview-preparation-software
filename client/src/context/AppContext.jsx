import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });

        if (res.data?.success) {
          setUser(res.data.user);

          // If already logged in, don't allow login/register pages
          if (
            location.pathname === "/login" ||
            location.pathname === "/register"
          ) {
            navigate("/dash-board");
          }
        }
      } catch (err) {
        console.log("User not logged in");

        // User is not authenticated.
        // Only redirect if they are trying to access protected pages.
        if (
          location.pathname !== "/" &&
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
