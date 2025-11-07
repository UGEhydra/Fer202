import React, { createContext, useReducer, useContext, useEffect } from "react";

// Tạo context
const StoreContext = createContext();

// Khởi tạo state ban đầu
const initialState = {
  products: [],
  cart: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "BUY_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload
            ? { ...item, stock: item.stock - 1 }
            : item
        ),
      };

    case "ADD_TO_CART":
      const product = state.products.find((p) => p.id === action.payload);
      return { ...state, cart: [...state.cart, product] };

    default:
      return state;
  }
};


// Tạo Provider
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Fetch dữ liệu từ JSON server 1 lần khi khởi tạo
  useEffect(() => {
    fetch("http://localhost:4000/store")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          dispatch({ type: "SET_PRODUCTS", payload: data.products });
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook để gọi context dễ hơn
export const useStore = () => useContext(StoreContext);
