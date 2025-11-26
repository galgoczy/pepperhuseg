import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, Button } from '../common';
import { formatCurrency } from '../../utils/helpers';

export const QRDisplay = ({ value, label, onFullscreen, vipBalance = 15000 }) => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <Card className="flex flex-col items-center">
      <h3 className="text-lg font-bold text-secondary mb-4">{label}</h3>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-lg border-4 border-gray-100 mb-4">
        <QRCodeSVG
          value={value}
          size={200}
          level="H"
          includeMargin={false}
        />
      </div>

      {/* VIP Balance display */}
      <div className="mb-4 text-center w-full">
        <p className="text-sm text-gray-500 mb-2">Elkölthető VIP keret</p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-bold tabular-nums text-primary">
            {showBalance ? formatCurrency(vipBalance) : '★★★★★'}
          </p>
          <button
            onClick={toggleBalance}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label={showBalance ? 'Egyenleg elrejtése' : 'Egyenleg megjelenítése'}
          >
            {showBalance ? (
              // Eye icon (visible)
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              // Eye slash icon (hidden)
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {showBalance ? 'Kattints az elrejtéshez' : 'Kattints a megjelenítéshez'}
        </p>
      </div>

      {/* Action buttons */}
      {onFullscreen && (
        <Button onClick={onFullscreen} variant="secondary" className="w-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Nagyítás
        </Button>
      )}
    </Card>
  );
};
