import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await getMe(token);
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) return;
    const res = await getMe(token);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        authLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
