import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EmployeesContextProvider } from './context/EmployeeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <EmployeesContextProvider>
        <App />
      </EmployeesContextProvider>
    </React.StrictMode>
  </Provider>
)

