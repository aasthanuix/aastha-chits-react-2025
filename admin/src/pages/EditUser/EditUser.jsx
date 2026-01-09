import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddTransactions from '../AddTransactions/AddTransactions';
import './EditUser.css';

const EditUser = ({ url }) => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enrolledChits: [],
  });
  const [plans, setPlans] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch user and plans
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          enrolledChits: data.enrolledChits?.map((plan) => plan._id) || [],
        });
      } catch (err) {
        setMessage({ type: 'error', text: err.message });
      }
    };

    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(url + '/api/chit-plans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch plans');
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        setMessage({ type: 'error', text: err.message });
      }
    };

    fetchUser();
    fetchPlans();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'User updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update user' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const enrolledPlans = plans.filter((plan) => formData.enrolledChits.includes(plan._id));

  return (
    <div className="edit-user-page">
      <h2>Edit User</h2>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdateUser} className="edit-user-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          autoComplete="off"
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          autoComplete="off"
        />

        <p>Enroll Chit Plans:</p>
        <div className="multi-select">
          <div className="selected-chips">
            {formData.enrolledChits.map((id) => {
              const plan = plans.find((p) => p._id === id);
              if (!plan) return null;
              return (
                <div key={id} className="chip">
                  {plan.planName}
                  <span
                    className="remove-chip"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        enrolledChits: formData.enrolledChits.filter((pid) => pid !== id),
                      })
                    }
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>

          <select
            onChange={(e) => {
              const value = e.target.value;
              if (!formData.enrolledChits.includes(value) && value !== '') {
                setFormData({
                  ...formData,
                  enrolledChits: [...formData.enrolledChits, value],
                });
              }
              e.target.value = '';
            }}
          >
            <option value="">Select plan...</option>
            {plans
              .filter((p) => !formData.enrolledChits.includes(p._id))
              .map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.planName}
                </option>
              ))}
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn update-btn">
            Update User
          </button>
          <button
            type="button"
            className="btn transaction-btn"
            onClick={() => setShowTransactionForm(true)}
          >
            Initiate Transaction
          </button>
        </div>
      </form>

      {showTransactionForm && (
        <div className="modal-overlay" onClick={() => setShowTransactionForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AddTransactions
              userId={userId}
              plans={enrolledPlans}
              onClose={() => setShowTransactionForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
