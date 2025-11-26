export const Card = ({ children, className = '', onClick, padding = true, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-card shadow-card ${padding ? 'p-4' : ''} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
