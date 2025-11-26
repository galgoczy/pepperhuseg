import { createContext, useContext, useState, useEffect } from 'react';
import { userStorage, onboardingStorage } from '../services/storage';
import { userAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = userStorage.get();
    const onboarded = onboardingStorage.isCompleted();

    setUser(storedUser);
    setOnboardingCompleted(onboarded);
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const newUser = await userAPI.register(userData);
      setUser(newUser);
      onboardingStorage.setCompleted();
      setOnboardingCompleted(true);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const loggedInUser = await userAPI.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await userAPI.logout();
      setUser(null);
      setOnboardingCompleted(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (data) => {
    try {
      const updated = await userAPI.updateProfile(data);
      setUser(updated);
      return updated;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    onboardingCompleted,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
