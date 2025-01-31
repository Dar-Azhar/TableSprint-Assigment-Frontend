import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CategoriesProvider>
        <RouterProvider router={router} />
      </CategoriesProvider>
    </AuthProvider>
  </React.StrictMode>
);


