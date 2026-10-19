import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Nosotros from './pages/Nosotros';
import Perfil from './pages/Perfil';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/templates/ProtectedRoute';
import Admin from './pages/Admin';

function App() {
 return (
   <div className="d-flex flex-column min-vh-100">
    <NavBar />
    <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      </Routes>
    </main>
    <Footer />
   </div>
 );
}


export default App;
