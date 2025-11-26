import { formatDate, formatCurrency } from '../../utils/helpers';

export const TransactionItem = ({ transaction }) => {
  const isEarn = transaction.type === 'earn';

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isEarn ? 'bg-success bg-opacity-10' : 'bg-primary bg-opacity-10'
        }`}
      >
        {isEarn ? (
          <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 mx-3">
        <p className="font-medium text-secondary">{transaction.description}</p>
        <p className="text-xs text-gray-500">{transaction.location}</p>
        <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
      </div>

      {/* Amount and points */}
      <div className="text-right">
        <p
          className={`font-bold tabular-nums ${
            isEarn ? 'text-success' : 'text-primary'
          }`}
        >
          {isEarn ? '+' : ''}{transaction.points} pont
        </p>
        {transaction.amount > 0 && (
          <p className="text-xs text-gray-500">{formatCurrency(transaction.amount)}</p>
        )}
      </div>
    </div>
  );
};
