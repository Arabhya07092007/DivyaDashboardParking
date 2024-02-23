import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAeVlNjdPlsnMGwAycX5gGWSaKt2YEkiz0',
  authDomain: 'backendintegration-2fdc3.firebaseapp.com',
  databaseURL:
    'https://backendintegration-2fdc3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'backendintegration-2fdc3',
  storageBucket: 'backendintegration-2fdc3.appspot.com',
  messagingSenderId: '910813817712',
  appId: '1:910813817712:web:1dca70684b862cfacb3db5',
  measurementId: 'G-7SZVXEVRQJ',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };
