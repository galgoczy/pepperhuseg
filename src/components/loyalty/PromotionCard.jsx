import { Card, Badge } from '../common';
import { formatDate, getDaysUntil } from '../../utils/helpers';

export const PromotionCard = ({ promotion, onClick }) => {
  const daysLeft = getDaysUntil(promotion.validUntil);
  const isExpiringSoon = daysLeft <= 3 && daysLeft >= 0;
  const isExpired = daysLeft < 0;

  return (
    <Card onClick={onClick} className="relative overflow-hidden">
      {/* Image or Icon */}
      <div className="w-full h-32 bg-gradient-to-br from-primary to-red-600 rounded-lg mb-4 flex items-center justify-center">
        {promotion.image ? (
          <img src={promotion.image} alt={promotion.title} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        )}
      </div>

      {/* Badge */}
      <div className="absolute top-4 right-4">
        {isExpired ? (
          <Badge variant="default">Lejárt</Badge>
        ) : isExpiringSoon ? (
          <Badge variant="warning">Hamarosan lejár</Badge>
        ) : (
          <Badge variant="primary">Aktív</Badge>
        )}
      </div>

      {/* Content */}
      <h4 className="font-bold text-secondary mb-2">{promotion.title}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{promotion.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Érvényes: {formatDate(promotion.validUntil)}-ig</span>
        {!isExpired && (
          <span className={isExpiringSoon ? 'text-warning font-medium' : ''}>
            {daysLeft === 0 ? 'Ma lejár' : `${daysLeft} nap`}
          </span>
        )}
      </div>
    </Card>
  );
};
