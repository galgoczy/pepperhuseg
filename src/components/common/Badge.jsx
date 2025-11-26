export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    bronze: 'bg-[#CD7F32] text-white',
    silver: 'bg-[#C0C0C0] text-white',
    gold: 'bg-[#FFD700] text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
