// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Khởi tạo Context với giá trị mặc định
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

// 2. Tạo Provider để bao bọc toàn bộ ứng dụng
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook để sử dụng dễ hơn
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
