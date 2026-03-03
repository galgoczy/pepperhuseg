import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export const Header = ({ title, showBack = false, actions, hideProfile = false, hideCart = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItems, setShowCart } = useCart();

  const cartButton = !hideCart && (
    <button
      onClick={() => setShowCart(true)}
      className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 active:scale-95 flex-shrink-0"
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );

  const profileButton = !hideProfile && (
    <button
      onClick={() => navigate('/profile')}
      className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-200 hover:shadow-lg active:scale-95"
    >
      {user?.name?.charAt(0) || 'U'}
    </button>
  );

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 safe-top z-30">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-9" />
        )}

        <h1 className="text-lg font-bold text-secondary">{title}</h1>

        <div className="flex items-center gap-2">
          {actions || (
            <>
              {cartButton}
              {profileButton}
            </>
          ) || <div className="w-9" />}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out;
        }
      `}</style>
    </header>
  );
};
