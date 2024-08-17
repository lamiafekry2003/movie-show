import React from 'react'
import ReactDOM from 'react-dom/client'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-circular-progressbar/dist/styles.css';
import App from './App.jsx'

import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
