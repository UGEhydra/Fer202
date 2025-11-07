// src/contexts/PaymentContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialState = {
  payments: [],
  loading: false,
  error: null,
  filter: { search: '', semester: '', course: '', sort: '' },
  totalAmount: 0,
};

function paymentReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, payments: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PAYMENT':
      return { ...state, payments: state.payments.filter((p) => p.id !== action.payload) };
    case 'SET_TOTAL':
      return { ...state, totalAmount: action.payload };
    default:
      return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const fetchPayments = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getPayments();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message || 'Failed to fetch payments' });
    }
  };

  const addPayment = async (payload) => {
    const res = await api.addPayment(payload);
    dispatch({ type: 'ADD_PAYMENT', payload: res });
    return res;
  };

  const updatePayment = async (id, payload) => {
    const res = await api.updatePayment(id, payload);
    dispatch({ type: 'UPDATE_PAYMENT', payload: res });
    return res;
  };

  const deletePayment = async (id) => {
    await api.deletePayment(id);
    dispatch({ type: 'DELETE_PAYMENT', payload: id });
  };

  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    // compute total for current payment list after any change
    const total = state.payments.reduce((s, p) => s + Number(p.amount || 0), 0);
    dispatch({ type: 'SET_TOTAL', payload: total });
  }, [state.payments]);

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
        setFilter,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
