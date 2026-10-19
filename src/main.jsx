import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CarritoProvider } from './context/CarritoContext';

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <AuthProvider>
    <ProductsProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ProductsProvider>
  </AuthProvider>
</BrowserRouter>
)
