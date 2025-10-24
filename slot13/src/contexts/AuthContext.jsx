import React, { createContext, useReducer, useContext } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Trạng thái ban đầu
const initialState = { 
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// 3. Hàm reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...initialState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// 4. Provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 5. Mock data
  const mockAccounts = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
    { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user', status: 'active' },
    { id: 3, username: 'user2', email: 'user2@example.com', password: '123456', role: 'user', status: 'locked' },
  ];

  // 6. Hàm login (Promise-based)
  function login(identifier, password) {
    dispatch({ type: 'LOGIN_START' });

    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes('@');
        const account = mockAccounts.find(acc =>
          isEmail
            ? acc.email === identifier && acc.password === password
            : acc.username === identifier && acc.password === password
        );

        if (!account) {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials.' });
          resolve({ ok: false, message: 'Invalid credentials.' });
          return;
        }

        if (account.status === 'locked') {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Account is locked.' });
          resolve({ ok: false, message: 'Account is locked.' });
          return;
        }

        if (account.role !== 'admin') {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Access denied: Admin only.' });
          resolve({ ok: false, message: 'Access denied: Admin only.' });
          return;
        }

        const userInfo = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo });
        resolve({ ok: true, account: userInfo });
      }, 1000);
    });
  }

  // 7. Đăng xuất
  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  // 8. Xóa lỗi
  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// 9. Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthContext;
