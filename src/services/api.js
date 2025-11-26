/**
 * API Service Layer
 * Currently uses mock data from localStorage
 * TODO: Replace with actual API calls when backend is ready
 */

import {
  userStorage,
  pointsStorage,
  transactionsStorage,
  rewardsStorage,
  promotionsStorage,
  feedbackStorage,
  coffeeStorage,
} from './storage';
import { generateId, calculatePoints } from '../utils/helpers';

// Simulated API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock locations
const LOCATIONS = [
  { id: 1, name: 'Pepperhouse Oktogon', address: 'Budapest, Oktogon tér 1.' },
  { id: 2, name: 'Pepperhouse Deák', address: 'Budapest, Deák Ferenc tér 3.' },
  { id: 3, name: 'Pepperhouse Corvin', address: 'Budapest, Corvin köz 2.' },
];

/**
 * User API
 */
export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    await delay();
    const user = userStorage.get();
    if (!user) throw new Error('No user found');
    return user;
  },

  // Update user profile
  updateProfile: async (data) => {
    await delay();
    const user = userStorage.get();
    const updated = { ...user, ...data };
    userStorage.set(updated);
    return updated;
  },

  // Register new user
  register: async (userData) => {
    await delay();
    const user = {
      id: generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      qrCode: generateId().toUpperCase().slice(0, 8),
    };
    userStorage.set(user);
    return user;
  },

  // Login user (mock)
  login: async (email, password) => {
    await delay();
    const user = userStorage.get();
    if (user && user.email === email) {
      return user;
    }
    throw new Error('Invalid credentials');
  },

  // Logout
  logout: async () => {
    await delay();
    userStorage.remove();
    return true;
  },
};

/**
 * Points API
 */
export const pointsAPI = {
  // Get current points
  getPoints: async () => {
    await delay();
    return pointsStorage.get();
  },

  // Get transactions history
  getTransactions: async () => {
    await delay();
    return transactionsStorage.get();
  },

  // Add transaction (for simulation)
  addTransaction: async (amount, locationId = null) => {
    await delay();

    const location = locationId
      ? LOCATIONS.find(l => l.id === locationId)
      : LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

    const points = calculatePoints(amount);
    const transaction = {
      id: generateId(),
      type: 'earn',
      amount,
      points,
      location: location.name,
      date: new Date().toISOString(),
      description: 'Vásárlás',
    };

    // Update points
    const currentPoints = pointsStorage.get();
    const updated = {
      current: currentPoints.current + points,
      total: currentPoints.total + points,
      lifetime: currentPoints.lifetime + points,
    };
    pointsStorage.set(updated);

    // Add transaction
    transactionsStorage.add(transaction);

    // Update coffee count
    coffeeStorage.increment();

    return { transaction, points: updated };
  },
};

/**
 * Rewards API
 */
export const rewardsAPI = {
  // Get all rewards
  getRewards: async () => {
    await delay();
    return rewardsStorage.get();
  },

  // Redeem reward
  redeemReward: async (rewardId) => {
    await delay();

    const rewards = rewardsStorage.get();
    const reward = rewards.available.find(r => r.id === rewardId);

    if (!reward) throw new Error('Reward not found');

    const points = pointsStorage.get();
    if (points.current < reward.pointsCost) {
      throw new Error('Not enough points');
    }

    // Deduct points
    const transaction = {
      id: generateId(),
      type: 'redeem',
      amount: 0,
      points: -reward.pointsCost,
      location: 'Online',
      date: new Date().toISOString(),
      description: `Beváltás: ${reward.title}`,
    };

    const updatedPoints = {
      ...points,
      current: points.current - reward.pointsCost,
    };
    pointsStorage.set(updatedPoints);
    transactionsStorage.add(transaction);

    // Move reward to active
    const activeReward = {
      ...reward,
      redeemedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      qrCode: generateId().toUpperCase().slice(0, 8),
    };

    rewards.active.push(activeReward);
    rewardsStorage.set(rewards);

    return { reward: activeReward, points: updatedPoints };
  },
};

/**
 * Promotions API
 */
export const promotionsAPI = {
  // Get all promotions
  getPromotions: async () => {
    await delay();
    return promotionsStorage.get();
  },
};

/**
 * Feedback API
 */
export const feedbackAPI = {
  // Get user feedback
  getFeedback: async () => {
    await delay();
    return feedbackStorage.get();
  },

  // Submit feedback
  submitFeedback: async (data) => {
    await delay();

    const feedback = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    feedbackStorage.add(feedback);

    // Add bonus points
    const points = pointsStorage.get();
    const transaction = {
      id: generateId(),
      type: 'earn',
      amount: 0,
      points: 10,
      location: 'Online',
      date: new Date().toISOString(),
      description: 'Vélemény bónusz',
    };

    const updatedPoints = {
      current: points.current + 10,
      total: points.total + 10,
      lifetime: points.lifetime + 10,
    };

    pointsStorage.set(updatedPoints);
    transactionsStorage.add(transaction);

    return { feedback, points: updatedPoints };
  },
};

/**
 * Coffee API
 */
export const coffeeAPI = {
  // Get coffee count
  getCount: async () => {
    await delay();
    return coffeeStorage.get();
  },

  // Claim free coffee
  claimFreeCoffee: async () => {
    await delay();

    const count = coffeeStorage.get();
    if (count < 5) throw new Error('Not enough coffees purchased');

    const reward = {
      id: generateId(),
      title: 'Ingyenes kávé',
      description: '1 db ingyenes kávé',
      pointsCost: 0,
      redeemedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      qrCode: generateId().toUpperCase().slice(0, 8),
    };

    const rewards = rewardsStorage.get();
    rewards.active.push(reward);
    rewardsStorage.set(rewards);

    coffeeStorage.reset();

    return reward;
  },
};

export const MOCK_LOCATIONS = LOCATIONS;
