// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export const getUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

export const getPayments = async () => {
  const res = await API.get('/payments');
  return res.data;
};

export const addPayment = async (payload) => {
  const res = await API.post('/payments', payload);
  return res.data;
};

export const updatePayment = async (id, payload) => {
  const res = await API.put(`/payments/${id}`, payload);
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await API.delete(`/payments/${id}`);
  return res.data;
};
