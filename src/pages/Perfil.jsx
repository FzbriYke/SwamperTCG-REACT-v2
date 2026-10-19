import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container className="my-5" style={{ maxWidth: '480px' }}>
      <Card className="p-4 shadow-sm">
        <h1 className="h3 fw-bold mb-4">Mi perfil</h1>
        <p className="mb-1"><strong>Nombre:</strong> {user.name}</p>
        <p className="mb-4"><strong>Correo:</strong> {user.email}</p>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Card>
    </Container>
  );
}

export default Perfil;