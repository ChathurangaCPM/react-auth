import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contex/authProvider';
import useAuth from './hooks/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Provider = () => {
  const { auth, persist } = useAuth();
  const providerValue = auth;
  return(
    <AuthProvider >
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
