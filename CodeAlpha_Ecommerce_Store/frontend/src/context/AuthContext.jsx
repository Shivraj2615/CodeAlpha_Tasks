import { createContext, useState, useContext, useEffect } from "react";
import { registerUser, loginUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (name, email, password) => {
    const { data } = await registerUser({ name, email, password });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
