import { QRCodeSVG } from 'qrcode.react';
import { Card, Button } from '../common';

export const QRDisplay = ({ value, label, onFullscreen }) => {
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

      {/* Code display */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-500 mb-1">Kód:</p>
        <p className="text-2xl font-bold tabular-nums tracking-wider text-secondary">
          #{value}
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
