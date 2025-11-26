import { useState, useEffect } from 'react';
import { pointsAPI } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await pointsAPI.getTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const refresh = () => {
    fetchTransactions();
  };

  return {
    transactions,
    loading,
    error,
    refresh,
  };
};
