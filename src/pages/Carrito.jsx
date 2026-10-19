import { useState } from 'react';
import { Container, Table, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';

const generarPedido = () => ({
  numero: Date.now().toString().slice(-6),
  fecha: new Date().toLocaleString('es-CL'),
});

function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar } = useCarrito();
  const { products, adjustStock } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [compra, setCompra] = useState(null);
  const [error, setError] = useState('');

  const lineas = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const total = lineas.reduce((suma, l) => suma + l.product.price * l.cantidad, 0);

  const finalizarCompra = () => {
    if (!user) {
      navigate('/login', { state: { from: '/carrito' } });
      return;
    }
    const sinStock = lineas.find((l) => l.cantidad > l.product.stock);
    if (sinStock) {
      setError(`No hay stock suficiente de ${sinStock.product.name} (quedan ${sinStock.product.stock}).`);
      return;
    }
    lineas.forEach((l) => adjustStock(l.product.id, -l.cantidad));
    setCompra({
      ...generarPedido(),
      cliente: { name: user.name, email: user.email },
      lineas,
      total,
    });
    setError('');
    vaciar();
  };

 
  if (compra) {
    const neto = Math.round(compra.total / 1.19);
    const iva = compra.total - neto;

    return (
      <Container className="my-5" style={{ maxWidth: '700px' }}>
        <Card>
          <Card.Body>
            <div className="text-center mb-3">
              <h2 className="mb-0">SwamperTCG</h2>
              <p className="text-muted mb-0">Recibo de compra</p>
            </div>

            <div className="d-flex justify-content-between small mb-3">
              <div>
                <div><strong>Pedido N°:</strong> {compra.numero}</div>
                <div><strong>Fecha:</strong> {compra.fecha}</div>
              </div>
              <div className="text-end">
                <div><strong>Cliente:</strong> {compra.cliente.name}</div>
                <div>{compra.cliente.email}</div>
              </div>
            </div>

            <Table responsive size="sm" className="align-middle">
              <thead>
                <tr>
                  <th>Carta</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cant.</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {compra.lineas.map(({ product, cantidad }) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td className="text-end">${product.price.toLocaleString('es-CL')}</td>
                    <td className="text-center">{cantidad}</td>
                    <td className="text-end">${(product.price * cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-end">
              <div>Neto: ${neto.toLocaleString('es-CL')}</div>
              <div>IVA (19%): ${iva.toLocaleString('es-CL')}</div>
              <h4 className="mt-2">Total pagado: ${compra.total.toLocaleString('es-CL')}</h4>
            </div>

            <p className="text-center text-muted small mt-4 mb-0">
              Gracias por tu compra. Esto es una simulación, no se realizó ningún cobro.
            </p>
          </Card.Body>
        </Card>

        <div className="d-flex gap-2 justify-content-center mt-3 d-print-none">
          <Button as={Link} to="/products" variant="primary">
            Seguir comprando
          </Button>
        </div>
      </Container>
    );
  }

  if (lineas.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h1>Carrito</h1>
        <p className="fs-5">Tu carrito está vacío.</p>
        <Button as={Link} to="/products" variant="primary">
          Ver catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Carrito</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Carta</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lineas.map(({ product, cantidad }) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} style={{ height: '80px' }} className="me-3 rounded" />
                {product.name}
              </td>
              <td>${product.price.toLocaleString('es-CL')}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-secondary" disabled={cantidad <= 1}
                    onClick={() => cambiarCantidad(product.id, cantidad - 1)} aria-label="Disminuir cantidad">−</Button>
                  <span>{cantidad}</span>
                  <Button size="sm" variant="outline-secondary" disabled={cantidad >= product.stock}
                    onClick={() => cambiarCantidad(product.id, cantidad + 1)} aria-label="Aumentar cantidad">+</Button>
                </div>
              </td>
              <td>${(product.price * cantidad).toLocaleString('es-CL')}</td>
              <td>
                <Button size="sm" variant="outline-danger" onClick={() => quitar(product.id)}>Quitar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="outline-secondary" onClick={vaciar}>Vaciar carrito</Button>
        <div className="text-end">
          <h3 className="mb-2">Total: ${total.toLocaleString('es-CL')}</h3>
          <Button variant="success" onClick={finalizarCompra}>Finalizar compra</Button>
        </div>
      </div>
    </Container>
  );
}

export default Carrito;