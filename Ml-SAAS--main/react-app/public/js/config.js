/**
 * DECONSTRUCTING AI SYSTEMS — Centralized App Configuration
 * Modify these values to configure the app for different environments.
 */

const Config = {
  // App metadata
  APP_NAME: 'DECONSTRUCTING AI SYSTEMS',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Learn Machine Learning through interactive visualizations.',

  // API settings — change BASE_URL when deploying backend
  API: {
    BASE_URL: window.location.hostname === 'localhost'
      ? 'http://localhost:8000/api/v1'
      : 'https://your-backend.onrender.com/api/v1',
    TIMEOUT_MS: 10000,
  },

  // Feature flags
  FEATURES: {
    QUIZ_ENABLED: true,
    DATA_PLAYGROUND: true,
    PRO_FEATURES: false,   // set to true to unlock pro features
  },

  // Plans
  PLANS: {
    FREE: 'Free',
    PRO: 'Pro',
  },
};

export default Config;
