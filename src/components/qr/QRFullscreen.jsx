import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const QRFullscreen = ({ value, label, onClose }) => {
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Try to maximize brightness (works on some browsers)
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(err => {
        console.log('Wake Lock not supported:', err);
      });
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white bg-opacity-20 text-white flex items-center justify-center text-2xl hover:bg-opacity-30 transition-colors z-10"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-4">
        {label && (
          <h2 className="text-white text-xl font-bold mb-6 text-center">{label}</h2>
        )}

        {/* QR Code - maximized */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
          <QRCodeSVG
            value={value}
            size={Math.min(window.innerWidth - 100, 320)}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Code display */}
        <div className="text-center">
          <p className="text-white text-opacity-80 text-sm mb-2">Egyedi kód:</p>
          <p className="text-white text-4xl font-bold tabular-nums tracking-widest">
            #{value}
          </p>
        </div>
      </div>

      {/* Hint */}
      <p className="absolute bottom-8 text-white text-opacity-60 text-sm text-center px-4">
        Mutasd meg a pénztárnál a pontok jóváírásához
      </p>
    </div>
  );
};
