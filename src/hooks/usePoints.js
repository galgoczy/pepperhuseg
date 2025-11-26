import { useState, useEffect } from 'react';
import { pointsAPI, coffeeAPI } from '../services/api';

export const usePoints = () => {
  const [points, setPoints] = useState({ current: 0, total: 0, lifetime: 0 });
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPoints = async () => {
    try {
      setLoading(true);
      const [pointsData, coffee] = await Promise.all([
        pointsAPI.getPoints(),
        coffeeAPI.getCount(),
      ]);
      setPoints(pointsData);
      setCoffeeCount(coffee);
      setError(null);
    } catch (err) {
      console.error('Error fetching points:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const refresh = () => {
    fetchPoints();
  };

  return {
    points,
    coffeeCount,
    loading,
    error,
    refresh,
  };
};
