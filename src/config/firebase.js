// Firebase configuration for frontend
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// API base URL - use Firebase Functions URL in production
const apiUrl = import.meta.env.PROD
  ? 'https://yipa-01.github.io/frontend-test/api' // Production API URL
  : 'http://localhost:5001/frontend-test/us-central1/api' // Local development URL

export const API_BASE_URL = apiUrl 