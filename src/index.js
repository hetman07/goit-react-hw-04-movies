import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //обязательно оборачиваем в этот компонент что бы можно было использовать(отслеживать)  компонент Router
import './index.css';
import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
