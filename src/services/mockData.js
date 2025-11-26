/**
 * Initialize mock data for demo purposes
 * This should be called once when the app first loads
 */

import {
  transactionsStorage,
  rewardsStorage,
  promotionsStorage,
  pointsStorage,
} from './storage';
import { generateId, calculatePoints } from '../utils/helpers';

export const initializeMockData = () => {
  // Check if data already exists
  const existingTransactions = transactionsStorage.get();
  if (existingTransactions.length > 0) {
    return; // Data already initialized
  }

  // Mock transactions (past purchases)
  const mockTransactions = [
    {
      id: generateId(),
      type: 'earn',
      amount: 2500,
      points: 25,
      location: 'Pepperhouse Oktogon',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Vásárlás',
    },
    {
      id: generateId(),
      type: 'earn',
      amount: 3200,
      points: 32,
      location: 'Pepperhouse Deák',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Vásárlás',
    },
    {
      id: generateId(),
      type: 'earn',
      amount: 1800,
      points: 18,
      location: 'Pepperhouse Corvin',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Vásárlás',
    },
    {
      id: generateId(),
      type: 'earn',
      amount: 4200,
      points: 42,
      location: 'Pepperhouse Oktogon',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Vásárlás',
    },
    {
      id: generateId(),
      type: 'redeem',
      amount: 0,
      points: -50,
      location: 'Online',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Beváltás: 10% kedvezmény',
    },
    {
      id: generateId(),
      type: 'earn',
      amount: 2900,
      points: 29,
      location: 'Pepperhouse Deák',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Vásárlás',
    },
  ];

  transactionsStorage.set(mockTransactions);

  // Calculate initial points
  const totalEarned = mockTransactions
    .filter(t => t.type === 'earn')
    .reduce((sum, t) => sum + t.points, 0);
  const totalSpent = Math.abs(
    mockTransactions
      .filter(t => t.type === 'redeem')
      .reduce((sum, t) => sum + t.points, 0)
  );

  pointsStorage.set({
    current: totalEarned - totalSpent,
    total: totalEarned,
    lifetime: totalEarned,
  });

  // Mock available rewards
  const mockRewards = {
    available: [
      {
        id: generateId(),
        title: 'Ingyenes desszert',
        description: '1 db ingyenes desszert választék szerint',
        pointsCost: 100,
      },
      {
        id: generateId(),
        title: '10% kedvezmény',
        description: '10% kedvezmény a teljes rendelésből',
        pointsCost: 200,
      },
      {
        id: generateId(),
        title: 'Ingyenes főétel',
        description: '1 db ingyenes főétel a napi ajánlatból',
        pointsCost: 500,
      },
      {
        id: generateId(),
        title: 'VIP asztalfoglalás',
        description: 'Prioritásos asztalfoglalás hétvégére',
        pointsCost: 300,
      },
      {
        id: generateId(),
        title: '20% kedvezmény',
        description: '20% kedvezmény a teljes rendelésből',
        pointsCost: 800,
      },
    ],
    active: [
      {
        id: generateId(),
        title: 'Ingyenes kávé',
        description: '1 db ingyenes kávé tetszőleges méretben',
        pointsCost: 0,
        redeemedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
        qrCode: generateId().toUpperCase().slice(0, 8),
      },
    ],
    used: [],
  };

  rewardsStorage.set(mockRewards);

  // Mock promotions
  const mockPromotions = [
    {
      id: generateId(),
      title: 'Hétfői hétindító',
      description: 'Minden hétfőn dupla pontokat kapsz minden vásárlás után!',
      details: 'A promóció minden Pepperhouse étteremben érvényes hétfőnként.\n\nIndítsd jól a hetet, gyűjts dupla pontokat!\n\nNem vonható össze más kedvezményekkel.',
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      isPersonal: false,
      image: null,
      terms: 'Minimum 1000 Ft vásárlási érték szükséges.',
    },
    {
      id: generateId(),
      title: 'Happy Hour akció',
      description: 'Hétköznap 14:00-16:00 között 15% kedvezmény minden italra!',
      details: 'Az akció minden Pepperhouse kávézóban érvényes hétfőtől péntekig.\n\nA kedvezmény automatikusan érvényesül.',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isPersonal: false,
      image: null,
      terms: 'Nem érvényes alkoholos italokra.',
    },
    {
      id: generateId(),
      title: 'Hozz egy barátot!',
      description: 'Hívd meg barátaidat és mindketten kaptok +50 pontot!',
      details: 'Oszd meg a referral kódodat és amikor barátod regisztrál és első vásárlást végez, mindketten +50 pontot kaptok ajándékba!',
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      isPersonal: true,
      image: null,
      terms: 'Korlátlan számú barát meghívható.',
    },
  ];

  promotionsStorage.set(mockPromotions);

  console.log('✅ Mock data initialized');
};
