import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// REDUX
import { Provider } from 'react-redux';
import { store } from './redux/Store';

// React Router
import { BrowserRouter } from 'react-router-dom'; // Dodaj ovo za React Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Omotaj aplikaciju sa BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
