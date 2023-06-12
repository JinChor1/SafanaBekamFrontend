import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap-grid.css';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BookContextProvider } from './context/BookContext';
import Modal from 'react-modal'

const root = ReactDOM.createRoot(document.getElementById('root'));

Modal.setAppElement(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookContextProvider>
          <App />
      </BookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
