import { useState, useEffect } from 'react';
import { rewardsAPI } from '../services/api';

export const useRewards = () => {
  const [rewards, setRewards] = useState({ available: [], active: [], used: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const data = await rewardsAPI.getRewards();
      setRewards(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const redeemReward = async (rewardId) => {
    try {
      const result = await rewardsAPI.redeemReward(rewardId);
      await fetchRewards();
      return result;
    } catch (err) {
      console.error('Error redeeming reward:', err);
      throw err;
    }
  };

  const refresh = () => {
    fetchRewards();
  };

  return {
    rewards,
    loading,
    error,
    redeemReward,
    refresh,
  };
};
