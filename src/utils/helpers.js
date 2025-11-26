/**
 * Format number as Hungarian currency
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date as Hungarian format
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
};

/**
 * Format date with time
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

/**
 * Calculate points from purchase amount
 * Every 100 HUF = 1 point
 * @param {number} amount
 * @returns {number}
 */
export const calculatePoints = (amount) => {
  return Math.floor(amount / 100);
};

/**
 * Calculate user tier based on total points
 * @param {number} totalPoints
 * @returns {'bronze'|'silver'|'gold'}
 */
export const getUserTier = (totalPoints) => {
  if (totalPoints >= 3000) return 'gold';
  if (totalPoints >= 1000) return 'silver';
  return 'bronze';
};

/**
 * Get tier display info
 * @param {'bronze'|'silver'|'gold'} tier
 * @returns {object}
 */
export const getTierInfo = (tier) => {
  const tiers = {
    bronze: {
      name: 'Bronze',
      color: '#CD7F32',
      minPoints: 0,
      maxPoints: 999,
      benefits: ['Pontgyűjtés', 'Szülinapi ajándék', 'Promóciók'],
    },
    silver: {
      name: 'Silver',
      color: '#C0C0C0',
      minPoints: 1000,
      maxPoints: 2999,
      benefits: ['Pontgyűjtés', 'Szülinapi ajándék', 'Promóciók', 'Dupla pontok szülinapon'],
    },
    gold: {
      name: 'Gold',
      color: '#FFD700',
      minPoints: 3000,
      maxPoints: Infinity,
      benefits: ['Pontgyűjtés', 'Szülinapi ajándék', 'Promóciók', 'Dupla pontok szülinapon', 'Exkluzív ajánlatok'],
    },
  };
  return tiers[tier] || tiers.bronze;
};

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Detect if device is mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Get days until date
 * @param {Date|string} date
 * @returns {number}
 */
export const getDaysUntil = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
