import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  bikes: [],
  cart: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_BIKES":
      return { ...state, bikes: action.payload };

    case "SET_CART": // ✅ dùng khi load giỏ hàng từ server
      return { ...state, cart: action.payload };

    case "ADD_TO_CART": // ✅ thêm sản phẩm mới
      return { ...state, cart: [...state.cart, action.payload] };

    case "UPDATE_CART": // ✅ cập nhật giỏ hàng (số lượng, xóa, ...)
      return { ...state, cart: action.payload };

    case "REMOVE_FROM_CART": // ✅ xóa sản phẩm cụ thể
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
