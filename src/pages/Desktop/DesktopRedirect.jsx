import { QRCodeSVG } from 'qrcode.react';

export const DesktopRedirect = () => {
  const appUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-600 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-primary rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-white">P</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Pepperhouse Hűségprogram
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Ez az alkalmazás csak mobileszközökön használható
        </p>

        {/* QR Code */}
        <div className="bg-white p-6 rounded-xl border-4 border-gray-100 inline-block mb-8">
          <QRCodeSVG value={appUrl} size={200} level="H" />
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-left max-w-md mx-auto">
          <h2 className="text-xl font-bold text-secondary text-center mb-4">
            Hogyan használd?
          </h2>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <p className="text-gray-600 pt-1">
              Olvasd be a QR kódot a mobiloddal
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <p className="text-gray-600 pt-1">
              Regisztrálj vagy jelentkezz be
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <p className="text-gray-600 pt-1">
              Gyűjts pontokat és váltsd be jutalmaidra!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-1">Gyűjts pontokat</h3>
            <p className="text-sm text-gray-600">Minden vásárlás után</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-1">Ingyenes jutalmak</h3>
            <p className="text-sm text-gray-600">Minden 5. kávé ingyen</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-gray flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-1">Exkluzív ajánlatok</h3>
            <p className="text-sm text-gray-600">Csak hűségkártya tulajdonosoknak</p>
          </div>
        </div>
      </div>
    </div>
  );
};
