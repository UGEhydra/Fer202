import React, { createContext, useState, useContext } from "react";
import movieApi from "../api/movieAPI";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    try {
      const res = await movieApi.get("/accounts");
      const found = res.data.find(
        (acc) => acc.username === username && acc.password === password
      );
      if (found) {
        setUser(found);
        setError("");
        return true;
      } else {
        setError("Sai tài khoản hoặc mật khẩu!");
        return false;
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối server!");
      return false;
    }
  };

  // ✅ Thêm hàm logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
