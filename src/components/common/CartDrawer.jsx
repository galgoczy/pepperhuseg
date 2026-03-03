import { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/helpers';
import { Button } from './Button';

export const CartDrawer = () => {
  const { items, totalPrice, totalItems, showCart, setShowCart, removeItem, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCart]);

  if (!showCart) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={() => setShowCart(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between safe-top">
          <div>
            <h2 className="text-xl font-bold text-secondary">Kosár</h2>
            <p className="text-sm text-gray-500">{totalItems} tétel</p>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">A kosarad üres</p>
              <p className="text-gray-400 text-sm mt-1">Adj hozzá ételeket az étlapról!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-light-gray rounded-lg p-3 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary text-sm">{item.name}</h4>
                      <p className="text-primary font-bold text-sm mt-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-full hover:bg-red-100 flex items-center justify-center transition-all duration-200 active:scale-90"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 hover:border-primary hover:text-primary active:scale-90"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-bold text-secondary tabular-nums">
                      {item.quantity}×
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 hover:border-primary hover:text-primary active:scale-90"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <span className="ml-auto font-bold text-secondary tabular-nums">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-4 safe-bottom space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Összesen:</span>
              <span className="text-2xl font-bold text-primary tabular-nums">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <Button fullWidth className="animate-pulse-slow">
              Rendelés leadása
            </Button>

            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              Kosár kiürítése
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
};
