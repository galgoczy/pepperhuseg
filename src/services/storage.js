/**
 * LocalStorage wrapper for managing app data
 * This will be replaced with API calls in production
 */

const STORAGE_KEYS = {
  USER: 'pepperhouse_user',
  POINTS: 'pepperhouse_points',
  TRANSACTIONS: 'pepperhouse_transactions',
  REWARDS: 'pepperhouse_rewards',
  PROMOTIONS: 'pepperhouse_promotions',
  FEEDBACK: 'pepperhouse_feedback',
  ONBOARDING_COMPLETED: 'pepperhouse_onboarding',
  COFFEE_COUNT: 'pepperhouse_coffee_count',
};

/**
 * Get item from localStorage
 */
const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

/**
 * Set item in localStorage
 */
const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 */
const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    return false;
  }
};

/**
 * Clear all app data
 */
const clearAll = () => {
  Object.values(STORAGE_KEYS).forEach(key => removeItem(key));
};

// User methods
export const userStorage = {
  get: () => getItem(STORAGE_KEYS.USER),
  set: (user) => setItem(STORAGE_KEYS.USER, user),
  remove: () => removeItem(STORAGE_KEYS.USER),
};

// Points methods
export const pointsStorage = {
  get: () => getItem(STORAGE_KEYS.POINTS) || { current: 0, total: 0, lifetime: 0 },
  set: (points) => setItem(STORAGE_KEYS.POINTS, points),
};

// Transactions methods
export const transactionsStorage = {
  get: () => getItem(STORAGE_KEYS.TRANSACTIONS) || [],
  set: (transactions) => setItem(STORAGE_KEYS.TRANSACTIONS, transactions),
  add: (transaction) => {
    const transactions = transactionsStorage.get();
    transactions.unshift(transaction);
    return setItem(STORAGE_KEYS.TRANSACTIONS, transactions);
  },
};

// Rewards methods
export const rewardsStorage = {
  get: () => getItem(STORAGE_KEYS.REWARDS) || { available: [], active: [], used: [] },
  set: (rewards) => setItem(STORAGE_KEYS.REWARDS, rewards),
};

// Promotions methods
export const promotionsStorage = {
  get: () => getItem(STORAGE_KEYS.PROMOTIONS) || [],
  set: (promotions) => setItem(STORAGE_KEYS.PROMOTIONS, promotions),
};

// Feedback methods
export const feedbackStorage = {
  get: () => getItem(STORAGE_KEYS.FEEDBACK) || [],
  set: (feedback) => setItem(STORAGE_KEYS.FEEDBACK, feedback),
  add: (item) => {
    const feedback = feedbackStorage.get();
    feedback.unshift(item);
    return setItem(STORAGE_KEYS.FEEDBACK, feedback);
  },
};

// Onboarding methods
export const onboardingStorage = {
  isCompleted: () => getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) || false,
  setCompleted: () => setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true),
};

// Coffee count methods
export const coffeeStorage = {
  get: () => getItem(STORAGE_KEYS.COFFEE_COUNT) || 0,
  set: (count) => setItem(STORAGE_KEYS.COFFEE_COUNT, count),
  increment: () => {
    const count = coffeeStorage.get();
    coffeeStorage.set(count + 1);
    return count + 1;
  },
  reset: () => coffeeStorage.set(0),
};

export { clearAll, STORAGE_KEYS };
