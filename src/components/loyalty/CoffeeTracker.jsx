import { Card, Button } from '../common';

export const CoffeeTracker = ({ count, onClaim }) => {
  const cups = Array.from({ length: 5 }, (_, i) => i < count);
  const canClaim = count >= 5;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-secondary">Ingyenes kávé</h3>
        <span className="text-sm text-gray-500">{count}/5</span>
      </div>

      {/* Coffee cups visual */}
      <div className="flex items-center justify-between mb-4">
        {cups.map((filled, index) => (
          <div key={index} className="relative">
            <svg
              className={`w-12 h-12 transition-colors ${
                filled ? 'text-primary' : 'text-gray-200'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 004 4h6a4 4 0 004-4v-3h2a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
            {filled && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress text */}
      <p className="text-sm text-gray-600 text-center mb-3">
        {canClaim
          ? 'Gratulálunk! Jogosult vagy egy ingyenes kávéra!'
          : `Még ${5 - count} vásárlás a következő ingyenes kávéig`}
      </p>

      {canClaim && (
        <Button onClick={onClaim} fullWidth>
          Ingyenes kávé beváltása
        </Button>
      )}
    </Card>
  );
};
