import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../hooks/usePoints';
import { useTransactions } from '../../hooks/useTransactions';
import { Button, Card, LoadingSpinner } from '../../components/common';
import { QRDisplay, QRFullscreen } from '../../components/qr';
import { PointsCard, CoffeeTracker, TransactionItem } from '../../components/loyalty';
import { BottomNav } from '../../components/navigation';
import { pointsAPI, coffeeAPI } from '../../services/api';

export const Home = () => {
  const [showQRFullscreen, setShowQRFullscreen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { points, coffeeCount, loading: pointsLoading, refresh: refreshPoints } = usePoints();
  const { transactions, loading: transactionsLoading, refresh: refreshTransactions } = useTransactions();

  const handleSimulatePurchase = async () => {
    const amount = Math.floor(Math.random() * 4500) + 500;
    await pointsAPI.addTransaction(amount);
    refreshPoints();
    refreshTransactions();
  };

  const handleClaimCoffee = async () => {
    try {
      await coffeeAPI.claimFreeCoffee();
      refreshPoints();
      alert('Gratulálunk! Ingyenes kávéd aktiválva! Ellenőrizd a Jutalmak menüpontban.');
    } catch (error) {
      alert(error.message);
    }
  };

  if (pointsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 3);
  const nextRewardPoints = Math.ceil(points.current / 500) * 500;
  const progressToNextReward = ((points.current % 500) / 500) * 100;

  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        {/* Header */}
        <div className="bg-white px-4 py-6 safe-top">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-secondary">
                Szia, {user?.name?.split(' ')[0] || 'Vendég'}! 👋
              </h1>
              <p className="text-sm text-gray-500">Jó étvágyat kívánunk!</p>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg"
            >
              {user?.name?.charAt(0) || 'U'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* QR Code */}
          <QRDisplay
            value={user?.qrCode || '12345678'}
            label="Mutasd meg a pénztárnál!"
            onFullscreen={() => setShowQRFullscreen(true)}
          />

          {/* Points Card */}
          <PointsCard points={points} onClick={() => navigate('/rewards')} />

          {/* Coffee Tracker */}
          <CoffeeTracker count={coffeeCount % 5} onClaim={handleClaimCoffee} />

          {/* Next Reward Progress */}
          <Card>
            <h3 className="text-lg font-bold text-secondary mb-4">Következő jutalom</h3>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {points.current} / {nextRewardPoints} pont
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progressToNextReward)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-red-600 transition-all duration-500"
                  style={{ width: `${progressToNextReward}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Még {nextRewardPoints - points.current} pont a következő jutalmadhoz
            </p>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <Card onClick={() => navigate('/rewards')} className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="font-semibold text-secondary">Jutalmak</p>
            </Card>

            <Card onClick={() => navigate('/promotions')} className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <p className="font-semibold text-secondary">Ajánlatok</p>
            </Card>

            <Card onClick={() => navigate('/feedback')} className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-semibold text-secondary">Vélemény</p>
            </Card>

            <Card className="text-center bg-gradient-to-br from-success to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={handleSimulatePurchase}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-semibold">Demo vásárlás</p>
            </Card>
          </div>

          {/* Recent Activity */}
          {recentTransactions.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-secondary">Legutóbbi aktivitás</h3>
                <button
                  onClick={() => navigate('/rewards')}
                  className="text-sm text-primary font-medium"
                >
                  Összes →
                </button>
              </div>

              <div className="space-y-2">
                {transactionsLoading ? (
                  <LoadingSpinner />
                ) : (
                  recentTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* QR Fullscreen Modal */}
      {showQRFullscreen && (
        <QRFullscreen
          value={user?.qrCode || '12345678'}
          label="Mutasd meg a pénztárnál!"
          onClose={() => setShowQRFullscreen(false)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};
