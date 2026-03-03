import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header = ({ title, showBack = false, actions, hideProfile = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const profileButton = !hideProfile && (
    <button
      onClick={() => navigate('/profile')}
      className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0"
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
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
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
          {actions || profileButton || <div className="w-9" />}
        </div>
      </div>
    </header>
  );
};
