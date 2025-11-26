export const ProgressBar = ({ current, total, showLabel = true, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary">
            {current} / {total}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-red-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
