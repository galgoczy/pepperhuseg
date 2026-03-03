import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../hooks/usePoints';
import { Button, Input, Card, Modal } from '../../components/common';
import { TierBadge } from '../../components/loyalty';
import { BottomNav, Header } from '../../components/navigation';
import { getUserTier } from '../../utils/helpers';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    favoriteLocation: '',
  });

  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { points } = usePoints();

  const handleEditToggle = () => {
    if (!isEditing) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthdate: user.birthdate,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSettingChange = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profil sikeresen frissítve!');
    } catch (error) {
      alert('Hiba történt a frissítés során.');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/onboarding');
  };

  const tier = getUserTier(points.lifetime);

  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        <Header title="Profil" hideProfile />

        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Profile Header */}
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-red-600 text-white flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-secondary">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <TierBadge totalPoints={points.lifetime} showProgress />
          </Card>

          {/* Personal Info */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-secondary">Személyes adatok</h3>
              <button
                onClick={handleEditToggle}
                className="text-sm text-primary font-medium"
              >
                {isEditing ? 'Mégse' : 'Szerkesztés'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Név"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Telefonszám"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Születési dátum"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
                <Button onClick={handleSave} fullWidth>
                  Mentés
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Név</p>
                  <p className="font-medium text-secondary">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-secondary">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefonszám</p>
                  <p className="font-medium text-secondary">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Születési dátum</p>
                  <p className="font-medium text-secondary">{user?.birthdate}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Settings */}
          <Card>
            <h3 className="text-lg font-bold text-secondary mb-4">Beállítások</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary">Push értesítések</p>
                  <p className="text-sm text-gray-500">Promóciók és újdonságok</p>
                </div>
                <button
                  onClick={() => handleSettingChange('pushNotifications')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary">Email értesítések</p>
                  <p className="text-sm text-gray-500">Heti összefoglaló</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Other Links */}
          <Card>
            <h3 className="text-lg font-bold text-secondary mb-4">Egyéb</h3>

            <div className="space-y-2">
              <button className="w-full text-left py-3 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 -mx-4 px-4 transition-colors">
                <span className="text-secondary">Általános Szerződési Feltételek</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full text-left py-3 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 -mx-4 px-4 transition-colors">
                <span className="text-secondary">Adatvédelmi tájékoztató</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full text-left py-3 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 -mx-4 px-4 transition-colors">
                <span className="text-secondary">Kapcsolat</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full text-left py-3 flex items-center justify-between hover:bg-gray-50 -mx-4 px-4 transition-colors">
                <span className="text-secondary">Verzió</span>
                <span className="text-gray-500 text-sm">1.0.0</span>
              </button>
            </div>
          </Card>

          {/* Logout */}
          <Button
            onClick={() => setShowLogoutModal(true)}
            variant="outline"
            fullWidth
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Kijelentkezés
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Kijelentkezés"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowLogoutModal(false)} fullWidth>
              Mégse
            </Button>
            <Button
              onClick={handleLogout}
              fullWidth
              className="bg-red-600 hover:bg-red-700"
            >
              Kijelentkezés
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">Biztosan ki szeretnél jelentkezni?</p>
      </Modal>

      <BottomNav />
    </>
  );
};
