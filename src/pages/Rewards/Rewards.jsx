import { useState } from 'react';
import { usePoints } from '../../hooks/usePoints';
import { useRewards } from '../../hooks/useRewards';
import { useTransactions } from '../../hooks/useTransactions';
import { LoadingSpinner, Modal, Button } from '../../components/common';
import { RewardCard, TransactionItem } from '../../components/loyalty';
import { BottomNav, Header } from '../../components/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { formatDate } from '../../utils/helpers';

export const Rewards = () => {
  const [activeTab, setActiveTab] = useState('rewards');
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemModal, setRedeemModal] = useState(false);
  const [activeRewardModal, setActiveRewardModal] = useState(null);
  const [filter, setFilter] = useState('all');

  const { points, loading: pointsLoading } = usePoints();
  const { rewards, loading: rewardsLoading, redeemReward } = useRewards();
  const { transactions, loading: transactionsLoading } = useTransactions();

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setRedeemModal(true);
  };

  const handleConfirmRedeem = async () => {
    try {
      const result = await redeemReward(selectedReward.id);
      setRedeemModal(false);
      setActiveRewardModal(result.reward);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'earn') return t.type === 'earn';
    if (filter === 'redeem') return t.type === 'redeem';
    return true;
  });

  if (pointsLoading || rewardsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        <Header title="Pontok & Jutalmak" />

        {/* Tabs */}
        <div className="bg-white border-b sticky top-14 z-20">
          <div className="max-w-md mx-auto flex">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'rewards' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Jutalmak
              {activeTab === 'rewards' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'points' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Pontok
              {activeTab === 'points' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          {activeTab === 'rewards' ? (
            <div className="space-y-6">
              {/* Available Rewards */}
              <div>
                <h2 className="text-xl font-bold text-secondary mb-4">Beváltható jutalmak</h2>
                {rewards.available.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Jelenleg nincs elérhető jutalom
                  </p>
                ) : (
                  <div className="space-y-3">
                    {rewards.available.map((reward) => (
                      <RewardCard
                        key={reward.id}
                        reward={reward}
                        userPoints={points.current}
                        onRedeem={handleRedeemClick}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Active Rewards */}
              {rewards.active.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-secondary mb-4">Aktív jutalmaid</h2>
                  <div className="space-y-3">
                    {rewards.active.map((reward) => (
                      <div key={reward.id} onClick={() => setActiveRewardModal(reward)}>
                        <RewardCard reward={reward} isActive />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Used Rewards */}
              {rewards.used.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-secondary mb-4">Felhasznált jutalmak</h2>
                  <div className="space-y-3">
                    {rewards.used.map((reward) => (
                      <RewardCard key={reward.id} reward={reward} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Points Summary */}
              <div className="bg-gradient-to-br from-primary to-red-600 text-white rounded-card p-6">
                <p className="text-sm opacity-90 mb-2">Aktuális pontszám</p>
                <p className="text-5xl font-bold tabular-nums mb-4">
                  {points.current.toLocaleString('hu-HU')}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-75">Összesen gyűjtve:</span>
                  <span className="font-semibold">{points.lifetime.toLocaleString('hu-HU')} pont</span>
                </div>
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  Mind
                </button>
                <button
                  onClick={() => setFilter('earn')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    filter === 'earn'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  Bevétel
                </button>
                <button
                  onClick={() => setFilter('redeem')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    filter === 'redeem'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  Beváltás
                </button>
              </div>

              {/* Transactions History */}
              <div>
                <h2 className="text-xl font-bold text-secondary mb-4">Pont történet</h2>
                {transactionsLoading ? (
                  <LoadingSpinner />
                ) : filteredTransactions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nincs tranzakció</p>
                ) : (
                  <div className="bg-white rounded-card p-4 space-y-2">
                    {filteredTransactions.map((transaction) => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      <Modal
        isOpen={redeemModal}
        onClose={() => setRedeemModal(false)}
        title="Jutalom beváltása"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setRedeemModal(false)} fullWidth>
              Mégse
            </Button>
            <Button onClick={handleConfirmRedeem} fullWidth>
              Beváltom
            </Button>
          </div>
        }
      >
        {selectedReward && (
          <div className="text-center">
            <p className="text-lg font-semibold text-secondary mb-2">
              {selectedReward.title}
            </p>
            <p className="text-gray-600 mb-4">{selectedReward.description}</p>
            <p className="text-2xl font-bold text-primary mb-2">
              {selectedReward.pointsCost} pont
            </p>
            <p className="text-sm text-gray-500">
              Jelenlegi egyenleg: {points.current} pont
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Beváltás után: {points.current - selectedReward.pointsCost} pont
            </p>
          </div>
        )}
      </Modal>

      {/* Active Reward QR Modal */}
      <Modal
        isOpen={!!activeRewardModal}
        onClose={() => setActiveRewardModal(null)}
        title={activeRewardModal?.title}
      >
        {activeRewardModal && (
          <div className="text-center">
            <p className="text-gray-600 mb-6">{activeRewardModal.description}</p>

            <div className="bg-white p-4 rounded-lg border-4 border-gray-100 inline-block mb-4">
              <QRCodeSVG value={activeRewardModal.qrCode} size={200} level="H" />
            </div>

            <p className="text-sm text-gray-500 mb-2">Egyedi kód:</p>
            <p className="text-2xl font-bold tabular-nums text-secondary mb-4">
              #{activeRewardModal.qrCode}
            </p>

            <p className="text-sm text-gray-500">
              Lejárat: {formatDate(activeRewardModal.expiresAt)}
            </p>

            <div className="mt-6 p-4 bg-light-gray rounded-lg">
              <p className="text-sm text-gray-600">
                Mutasd meg ezt a QR kódot a pénztárnál a jutalmad felhasználásához!
              </p>
            </div>
          </div>
        )}
      </Modal>

      <BottomNav />
    </>
  );
};
