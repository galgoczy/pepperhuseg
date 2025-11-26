import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components/common';

const slides = [
  {
    id: 'welcome',
    title: 'Üdvözlünk a Pepperhouse Hűségprogramban!',
    description: 'Gyűjts pontokat minden vásárlás után és váltsd be őket fantasztikus jutalmakra.',
    icon: (
      <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
    ),
  },
  {
    id: 'points',
    title: 'Gyűjts pontokat',
    description: 'Minden 100 Ft vásárlás után 1 pontot kapsz. A pontokat kedvezményekre és ingyenes termékekre válthatod be.',
    icon: (
      <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'coffee',
    title: 'Ingyenes kávé',
    description: 'Minden 5. kávévásárlás után automatikusan kapsz egy ingyenes kávét ajándékba!',
    icon: (
      <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 004 4h6a4 4 0 004-4v-3h2a2 2 0 002-2V5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    id: 'exclusive',
    title: 'Exkluzív ajánlatok',
    description: 'Hozzáférés speciális kedvezményekhez, előzetes akciókhoz és szülinapi meglepetésekhez.',
    icon: (
      <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    password: '',
    gdprAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const isLastSlide = step === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowRegistration(true);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (showRegistration) {
      setShowRegistration(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Az email megadása kötelező';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'A telefonszám megadása kötelező';
    }

    if (!formData.birthdate) {
      newErrors.birthdate = 'A születési dátum megadása kötelező';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
    }

    if (!formData.gdprAccepted) {
      newErrors.gdprAccepted = 'Az adatvédelmi tájékoztató elfogadása kötelező';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/home');
    } catch (error) {
      setErrors({ submit: 'Hiba történt a regisztráció során. Kérlek próbáld újra.' });
    } finally {
      setLoading(false);
    }
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-light-gray flex flex-col">
        <div className="bg-white p-4 flex items-center border-b">
          <button onClick={handlePrev} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Regisztráció</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              label="Teljes név"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Batka Miklós"
              error={errors.name}
              required
            />

            <Input
              label="Email cím"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="batka.miklos@pepperhouse.hu"
              error={errors.email}
              required
            />

            <Input
              label="Telefonszám"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+36 20 123 4567"
              error={errors.phone}
              required
            />

            <Input
              label="Születési dátum"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              error={errors.birthdate}
              required
            />

            <Input
              label="Jelszó"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 karakter"
              error={errors.password}
              required
            />

            <div className="pt-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="gdprAccepted"
                  checked={formData.gdprAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-primary rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">
                  Elfogadom az{' '}
                  <a href="#" className="text-primary underline">
                    Adatvédelmi tájékoztatót
                  </a>{' '}
                  és az{' '}
                  <a href="#" className="text-primary underline">
                    Általános Szerződési Feltételeket
                  </a>
                  .
                </span>
              </label>
              {errors.gdprAccepted && (
                <p className="mt-1 text-sm text-red-500">{errors.gdprAccepted}</p>
              )}
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Regisztráció...' : 'Regisztráció'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const currentSlide = slides[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-600 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <div className="w-20 h-20 mb-8 bg-white rounded-2xl flex items-center justify-center">
          <span className="text-3xl font-bold text-primary">P</span>
        </div>

        {/* Icon */}
        <div className="mb-8">{currentSlide.icon}</div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-white text-center mb-4 px-4">
          {currentSlide.title}
        </h1>
        <p className="text-white text-opacity-90 text-center mb-12 px-4 max-w-md">
          {currentSlide.description}
        </p>

        {/* Dots */}
        <div className="flex items-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step ? 'w-8 bg-white' : 'w-2 bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-3">
        <Button onClick={handleNext} fullWidth variant="secondary">
          {isLastSlide ? 'Kezdjük!' : 'Következő'}
        </Button>

        {step > 0 && (
          <button
            onClick={handlePrev}
            className="w-full text-white text-opacity-80 text-sm py-2"
          >
            Vissza
          </button>
        )}
      </div>
    </div>
  );
};
