import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

