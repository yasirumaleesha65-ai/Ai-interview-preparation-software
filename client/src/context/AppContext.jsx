import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.log("User not logged in");
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
