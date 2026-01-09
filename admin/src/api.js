import axios from 'axios';

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true
});

API_URL.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminLogin = async (email, password) => {
  const { data } = await API_URL.post('/admin/login', { email, password });
  return data;
};

// Chit Plans APIs
export const getChitPlans = () => API_URL.get('/chit-plans');
export const addChitPlan = (data) =>
  API_URL.post('/chit-plans', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateChitPlan = (id, data) =>
  API_URL.put(`/chit-plans/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteChitPlan = (id) => API_URL.delete(`/chit-plans/${id}`);

// Users API
export const getUsers = () => API_URL.get('/users');
export const addUser = (userData) => API_URL.post('/users', userData);
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API_URL.delete(`/users/${id}`);

// Transactions API
export const getTransactions = () => API_URL.get('/transactions');
export const addTransaction = (data) => API_URL.post('/transactions', data);
export const deleteTransaction = (id) => API_URL.delete(`/transactions/${id}`);
export const updateTransactionStatus = async (req, res) => {
  try {
    const { userId, txnId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transaction = user.transactions.id(txnId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    transaction.status = 'Paid';
    await user.save();

    res.json({ message: 'Transaction updated successfully', transactions: user.transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error });
  }
};
