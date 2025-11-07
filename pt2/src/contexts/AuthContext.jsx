// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as api from "../services/api";

const AuthContext = createContext();

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...initialAuthState };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // ✅ Load user khi reload trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) });
    }
  }, []);

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  // ✅ Hàm login hoàn chỉnh
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const accounts = await api.getUsers();

      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail ||
            (acc.email && acc.email === usernameOrEmail)) &&
          acc.password === password
      );

      // ❌ Không tìm thấy user
      if (!user) {
        const err = "Invalid username/email or password!";
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        return { success: false, error: err };
      }

      // ⚠️ Tài khoản bị khóa hoặc không phải admin
      if (user.status !== "active") {
        const err = "Tài khoản của bạn đã bị khóa!";
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        return { success: false, error: err };
      }

      if (user.role !== "admin") {
        const err = "Bạn không có quyền truy cập hệ thống!";
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        return { success: false, error: err };
      }

      // ✅ Thành công
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return { success: true, user };
    } catch (error) {
      const err = error.message || "Login failed due to network error";
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      return { success: false, error: err };
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
