import React, { useState } from 'react';
import './AddTransactions.css';

// Single source of truth for API
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined. Check your environment variables.');
}

const AddTransactions = ({ userId, plans, onClose }) => {
  const [formData, setFormData] = useState({
    chitPlanId: '',
    amount: '',
    date: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Authentication required. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/transactions/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const contentType = res.headers.get('content-type');
      const data =
        contentType && contentType.includes('application/json')
          ? await res.json()
          : { message: await res.text() };

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add transaction');
      }

      setMessage('Transaction added successfully');
      setFormData({ chitPlanId: '', amount: '', date: '' });
    } catch (error) {
      console.error('Add Transaction Error:', error);
      setMessage(error.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Transaction</h3>

        {message && (
          <p className={message.includes('success') ? 'success' : 'error'}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <select
            name="chitPlanId"
            value={formData.chitPlanId}
            onChange={handleChange}
            required
          >
            <option value="">Select Chit Plan</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.planName}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Transaction'}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactions;
