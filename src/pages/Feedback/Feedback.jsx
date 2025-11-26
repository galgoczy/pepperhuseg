import { useState, useEffect } from 'react';
import { feedbackAPI } from '../../services/api';
import { MOCK_LOCATIONS } from '../../services/api';
import { Button, Input, Card, LoadingSpinner } from '../../components/common';
import { BottomNav, Header } from '../../components/navigation';
import { formatDate } from '../../utils/helpers';

export const Feedback = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    rating: 0,
    order: '',
    comment: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const data = await feedbackAPI.getFeedback();
      setFeedbackList(data);
    } catch (error) {
      console.error('Error loading feedback:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
    if (errors.rating) {
      setErrors({ ...errors, rating: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.location) {
      newErrors.location = 'Válassz éttermet';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Add meg az értékelést';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Írj véleményt';
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
      await feedbackAPI.submitFeedback(formData);
      setFormData({
        location: '',
        rating: 0,
        order: '',
        comment: '',
      });
      alert('Köszönjük a véleményed! +10 pont jóváírva! 🎉');
      loadFeedback();
      setActiveTab('history');
    } catch (error) {
      alert('Hiba történt. Próbáld újra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        <Header title="Vélemények" />

        {/* Tabs */}
        <div className="bg-white border-b sticky top-14 z-20">
          <div className="max-w-md mx-auto flex">
            <button
              onClick={() => setActiveTab('new')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'new' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Új vélemény
              {activeTab === 'new' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                activeTab === 'history' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Korábbi vélemények
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          {activeTab === 'new' ? (
            <div>
              {/* Incentive */}
              <Card className="bg-gradient-to-r from-success to-green-600 text-white mb-6">
                <div className="flex items-center gap-4">
                  <svg className="w-12 h-12 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg">+10 pont bónusz!</p>
                    <p className="text-sm opacity-90">Minden véleményért jutalom</p>
                  </div>
                </div>
              </Card>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Étterem <span className="text-primary">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-card focus:border-primary transition-colors"
                  >
                    <option value="">Válassz éttermet</option>
                    {MOCK_LOCATIONS.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Értékelés <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-10 h-10 ${
                            star <= formData.rating ? 'text-warning' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
                </div>

                <Input
                  label="Mit rendeltél? (opcionális)"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="pl. Burger menü"
                />

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Vélemény <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Mondd el a véleményed..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-card focus:border-primary transition-colors resize-none"
                  />
                  {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
                </div>

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? 'Küldés...' : 'Vélemény küldése'}
                </Button>
              </form>
            </div>
          ) : (
            <div>
              {feedbackList.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-500">Még nincs véleményed</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedbackList.map((feedback) => (
                    <Card key={feedback.id}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-secondary">{feedback.location}</p>
                          <p className="text-xs text-gray-500">{formatDate(feedback.createdAt)}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating ? 'text-warning' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      {feedback.order && (
                        <p className="text-sm text-gray-600 mb-2">Rendelés: {feedback.order}</p>
                      )}
                      <p className="text-gray-700">{feedback.comment}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
};
