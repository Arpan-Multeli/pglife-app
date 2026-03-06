import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "./assets/css/bootstrap.min.css";
import "./assets/css/common.css";
import "./assets/css/home.css";
import "./assets/css/property_list.css";
import "./assets/css/property_detail.css";
import "./assets/css/dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/PropertyCard.css";
import"./assets/css/property_detail.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
