import { Navbar, Nav, Container, Form, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import logo from '/imagenes/logo.png';
import { Cart, Person } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';

function NavBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItems } = useCarrito();
  const profilePath = user?.role === 'admin' ? '/admin' : '/perfil';

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };
 return (
   <Navbar bg="dark" variant="dark" expand="lg">
     <Container>
       <Navbar.Brand href="/">
          <img
            src={logo}
            alt="SwamperTCG"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav>
           <Nav.Link href="/">Inicio</Nav.Link>
           <Nav.Link href="/products">Catálogo</Nav.Link>
           <Nav.Link href="/Nosotros">¿Quienes somos?</Nav.Link>
         </Nav>
         <Form
            className="d-flex mx-auto mt-2 mt-lg-0"
            style={{ maxWidth: '400px', width: '100%' }}
            onSubmit={handleSubmit}
            role="search"
          >
          <Form.Control
            type="search"
            placeholder="Buscar carta..."
            className="me-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar carta"
          />
            <Button variant="outline-light" type="submit">Buscar</Button>
          </Form>
          
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            <Nav.Link as={Link} to="/carrito" className="text-light fs-4 p-0" aria-label="Carrito">
              <Cart />
              {totalItems > 0 && (
                <Badge bg="danger" pill className="ms-1 fs-6">{totalItems}</Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to={profilePath} className="text-light fs-4 p-0" aria-label="Perfil">
              <Person />
            </Nav.Link>
          </div>
       </Navbar.Collapse>
     </Container>
   </Navbar>
 );
}


export default NavBar;
