import { useState, useEffect } from 'react';
import { promotionsAPI } from '../../services/api';
import { LoadingSpinner, Modal, Badge } from '../../components/common';
import { PromotionCard } from '../../components/loyalty';
import { BottomNav, Header } from '../../components/navigation';
import { formatDate } from '../../utils/helpers';

export const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const data = await promotionsAPI.getPromotions();
      setPromotions(data);
    } catch (error) {
      console.error('Error loading promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPromotions = promotions.filter((promo) => {
    const now = new Date();
    const validUntil = new Date(promo.validUntil);
    const isActive = validUntil >= now;

    if (filter === 'all') return true;
    if (filter === 'active') return isActive;
    if (filter === 'personal') return promo.isPersonal;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        <Header title="Ajánlatok & Promóciók" />

        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
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
              Összes
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Aktív
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                filter === 'personal'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Csak nekem
            </button>
          </div>

          {/* Promotions List */}
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <p className="text-gray-500">Nincs megjeleníthető promóció</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPromotions.map((promotion) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  onClick={() => setSelectedPromotion(promotion)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Promotion Details Modal */}
      <Modal
        isOpen={!!selectedPromotion}
        onClose={() => setSelectedPromotion(null)}
        title={selectedPromotion?.title}
      >
        {selectedPromotion && (
          <div>
            {selectedPromotion.image && (
              <img
                src={selectedPromotion.image}
                alt={selectedPromotion.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <div className="mb-4">
              <Badge variant="primary">
                Érvényes: {formatDate(selectedPromotion.validUntil)}-ig
              </Badge>
            </div>

            <p className="text-gray-600 mb-6 whitespace-pre-line">
              {selectedPromotion.details || selectedPromotion.description}
            </p>

            {selectedPromotion.terms && (
              <div className="bg-light-gray rounded-lg p-4">
                <p className="text-sm font-medium text-secondary mb-2">Feltételek:</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {selectedPromotion.terms}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <BottomNav />
    </>
  );
};
