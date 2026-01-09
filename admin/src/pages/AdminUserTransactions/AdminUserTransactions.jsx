import React, { useEffect, useState } from 'react';
import './AdminUserTransactions.css';

const AdminUserTransactions = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(url + '/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch transactions of selected user
  const fetchTransactions = async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`${url}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTransactions(data.transactions || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add transaction
  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/users/${selectedUser}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions);
        setMessage('Transaction added successfully!');
        setAmount('');
      } else {
        setMessage(data.message || 'Failed to add transaction');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error adding transaction');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-transactions-container">
      <h2>Manage User Transactions</h2>

      {/* Select User */}
      <div className="select-user">
        <label>Select User:</label>
        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            fetchTransactions(e.target.value);
          }}
        >
          <option value="">-- Choose a user --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user._id})
            </option>
          ))}
        </select>
      </div>

      {/* Add Transaction */}
      {selectedUser && (
        <form className="add-transaction-form" onSubmit={addTransaction}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" className="btn add-btn">
            Add Transaction
          </button>
        </form>
      )}

      {message && <p className="message">{message}</p>}

      {/* Transactions Table */}
      {transactions.length > 0 && (
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>₹{txn.amount}</td>
                  <td>
                    {new Date(txn.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className={txn.status === 'Paid' ? 'paid' : 'pending'}>
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserTransactions;
