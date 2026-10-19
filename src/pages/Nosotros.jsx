import { Container, Row, Col, Card } from 'react-bootstrap';
import logo from '/imagenes/logo.png';

const valores = [
  {
    titulo: 'Comunidad primero',
    texto: 'Detrás de cada carta hay una persona. Tratamos a cada cliente como parte de la comunidad.',
  },
  {
    titulo: 'Pasión por el juego',
    texto: 'Vivimos el TCG y usamos lo que vendemos. Entendemos el hobby porque somos parte de él.',
  },
  {
    titulo: 'Confianza y transparencia',
    texto: 'Reglas claras y compras seguras, para que comprar sea siempre tranquilo.',
  },
  {
    titulo: 'Mejora constante',
    texto: 'Escuchamos a la comunidad y evolucionamos para ofrecer un mejor servicio.',
  },
];

function Nosotros() {
  return (
    <Container className="my-5" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-5">
        <img
            src={logo}
            alt="SwamperTCG"
            className="img-fluid mb-3"
            style={{ width: '100%', maxWidth: '450px'  }}
        />
        <h1 className="fw-bold">Quiénes somos</h1>
        <p className="text-muted fs-5 mb-0">
            SwamperTCG es una tienda chilena de cartas Pokémon hecha por y para coleccionistas.
        </p>
        </div>
      <Row className="mb-5">
        <Col md={4}>
          <h2 className="h4 fw-bold">Nuestra historia</h2>
        </Col>
        <Col md={8}>
          <p>
            SwamperTCG nació de la pasión por las cartas Pokémon. Empezamos como
            coleccionistas y vimos la necesidad de contar con una tienda confiable en Chile.
          </p>
          <p className="mb-0">
            Hoy ofrecemos cartas seleccionadas con cuidado, con información clara de
            cada edición y un trato cercano.
          </p>
        </Col>
      </Row>
      <div className="bg-primary-subtle rounded-4 p-4 mb-5">
        <small className="text-uppercase fw-semibold text-primary">Nuestro propósito</small>
        <p className="h4 fw-bold mt-2 mb-0">
          Que cada jugador y coleccionista encuentre las cartas que busca, de forma segura y confiable.
        </p>
      </div>
      <h2 className="h4 fw-bold">Lo que nos mueve</h2>
      <p className="text-muted">Los principios que guían cómo trabajamos.</p>
      <Row xs={1} md={2} className="g-3">
        {valores.map((valor) => (
          <Col key={valor.titulo}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title as="h3" className="h6 fw-bold">{valor.titulo}</Card.Title>
                <Card.Text className="text-muted small">{valor.texto}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Nosotros;