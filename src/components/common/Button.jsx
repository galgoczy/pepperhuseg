export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'touch-target rounded-button font-semibold transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary text-white shadow-button hover:bg-red-700 active:scale-95 disabled:bg-gray-300',
    secondary: 'bg-white border-2 border-primary text-primary hover:bg-red-50 active:scale-95 disabled:border-gray-300 disabled:text-gray-400',
    outline: 'border-2 border-gray-300 text-secondary hover:border-primary hover:text-primary active:scale-95 disabled:border-gray-200 disabled:text-gray-300',
    ghost: 'text-primary hover:bg-red-50 active:scale-95 disabled:text-gray-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
