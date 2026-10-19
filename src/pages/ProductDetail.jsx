import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import CarruselProductos from '../components/organisms/CarruselProductos';
import { useCarrito } from '../context/CarritoContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { agregar, cantidadDe } = useCarrito();
  const product = products.find((p) => p.id === parseInt(id));
  const enCarrito = product ? cantidadDe(product.id) : 0;

  if (!product) {
    return (
      <Container className="my-5">
        <h1>Producto no encontrado</h1>
      </Container>
    );
  }

  const otras = products.filter((p) => p.id !== product.id);

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col md={5}>
          <Image src={product.image} alt={product.name} className="img-fluid rounded" style={{ maxWidth: '24rem' }} />
        </Col>

        <Col md={7}>
          <Text variant="h2">{product.name}</Text>
          <Text variant="p">{product.description}</Text>
          <Text variant="h4">${product.price.toLocaleString('es-CL')}</Text>
          <Text variant="p">Idioma: {product.idioma}</Text>
          <Text variant="p">Estado: {product.estado}</Text>
          <Text variant="p">Stock: {product.stock}</Text>
          {enCarrito > 0 && (
            <Text variant="p" className="text-success">
              Tienes {enCarrito} en el carrito
            </Text>
          )}
          <div className="d-flex gap-2">
            <Button
              variant="success"
              disabled={product.stock < 1 || enCarrito >= product.stock}
              onClick={() => agregar(product.id)}
            >
              {product.stock < 1 ? 'Sin stock' : 'Añadir al carrito'}
            </Button>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Volver
            </Button>
          </div>
        </Col>
      </Row>

      <h2 className="text-center fw-bold mt-5 mb-3">OTRAS CARTAS</h2>
      <CarruselProductos productos={otras} />
    </Container>
  );
}

export default ProductDetail;
