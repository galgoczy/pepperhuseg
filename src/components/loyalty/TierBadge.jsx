import { Badge, ProgressBar } from '../common';
import { getUserTier, getTierInfo } from '../../utils/helpers';

export const TierBadge = ({ totalPoints, showProgress = false }) => {
  const tier = getUserTier(totalPoints);
  const tierInfo = getTierInfo(tier);

  const nextTierPoints = tier === 'gold' ? null : (tier === 'silver' ? 3000 : 1000);
  const progressToNext = nextTierPoints
    ? ((totalPoints - tierInfo.minPoints) / (nextTierPoints - tierInfo.minPoints)) * 100
    : 100;

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Badge variant={tier} className="text-base px-4 py-2">
          ★ {tierInfo.name}
        </Badge>
        {nextTierPoints && (
          <span className="text-sm text-gray-600">
            {totalPoints} / {nextTierPoints} pont
          </span>
        )}
      </div>

      {showProgress && nextTierPoints && (
        <div className="mb-4">
          <ProgressBar
            current={totalPoints - tierInfo.minPoints}
            total={nextTierPoints - tierInfo.minPoints}
            showLabel={false}
          />
          <p className="text-xs text-gray-500 mt-1 text-center">
            Még {nextTierPoints - totalPoints} pont a következő szintig
          </p>
        </div>
      )}

      <div className="bg-light-gray rounded-lg p-3">
        <p className="text-sm font-medium text-secondary mb-2">Szinted előnyei:</p>
        <ul className="space-y-1">
          {tierInfo.benefits.map((benefit, index) => (
            <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
              <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
