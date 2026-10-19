import { useState } from 'react';
import { Container, Button, Card, Row, Col, Table, Form, Badge, Tabs, Tab } from 'react-bootstrap';
import { Plus, Dash, Pencil, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import ProductFormModal from '../components/organisms/ProductFormModal';

const LOW_STOCK = 2;

const normalize = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getUsers = () => {
  try {
    const raw = localStorage.getItem('swamper_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const stockBadge = (stock) => {
  if (stock === undefined) return <Badge bg="secondary">Sin datos</Badge>;
  if (stock === 0) return <Badge bg="danger">Agotado</Badge>;
  if (stock <= LOW_STOCK) return <Badge bg="warning" text="dark">Stock bajo</Badge>;
  return <Badge bg="success">Disponible</Badge>;
};

function Admin() {
  const { user, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, adjustStock, resetProducts } =
    useProducts();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const users = getUsers();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleSave = (data) => {
    if (editing) updateProduct(editing.id, data);
    else addProduct({ ...data, destacada: false });
    setFormOpen(false);
  };

  const handleDelete = (p) => {
    if (window.confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) {
      deleteProduct(p.id);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Restaurar los productos originales? Se perderán todos los cambios.')) {
      resetProducts();
    }
  };

  const withStock = products.filter((p) => p.stock !== undefined);
  const totalStock = withStock.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = withStock.reduce((sum, p) => sum + p.price * p.stock, 0);
  const soldOut = withStock.filter((p) => p.stock === 0).length;
  const lowStock = withStock.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK).length;
  const mostExpensive = products.length
    ? products.reduce((max, p) => (p.price > max.price ? p : max), products[0])
    : null;

  const stats = [
    { label: 'Productos', value: products.length },
    { label: 'Unidades en stock', value: totalStock },
    { label: 'Valor del inventario', value: `$${totalValue.toLocaleString('es-CL')}` },
    { label: 'Agotados', value: soldOut, className: soldOut > 0 ? 'text-danger' : '' },
    { label: 'Stock bajo', value: lowStock, className: lowStock > 0 ? 'text-warning-emphasis' : '' },
    {
      label: 'Carta más cara',
      value: mostExpensive ? mostExpensive.name : '—',
      note: mostExpensive ? `$${mostExpensive.price.toLocaleString('es-CL')}` : '',
    },
  ];

  const filtered = products.filter((p) => {
    const matchesText = normalize(`${p.name} ${p.description}`).includes(normalize(search));
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'soldout' && p.stock === 0) ||
      (stockFilter === 'low' && p.stock > 0 && p.stock <= LOW_STOCK);
    return matchesText && matchesStock;
  });

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-0">Panel de administración</h1>
          <small className="text-muted">Sesión: {user.name}</small>
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <Row xs={1} sm={2} lg={3} className="g-3 mb-4">
        {stats.map((s) => (
          <Col key={s.label}>
            <Card body className="text-center shadow-sm h-100">
              <div className="text-muted small">{s.label}</div>
              <div className={`fs-3 fw-bold ${s.className || ''}`}>{s.value}</div>
              {s.note && <div className="small text-muted">{s.note}</div>}
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs defaultActiveKey="productos" className="mb-3">
        <Tab eventKey="productos" title="Productos">
          <Card className="p-3 shadow-sm">
            <Row className="g-2 mb-3">
              <Col lg={5}>
                <Form.Control
                  type="search"
                  placeholder="Buscar por nombre o edición..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Buscar producto"
                />
              </Col>
              <Col sm={6} lg={3}>
                <Form.Select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  aria-label="Filtrar por stock"
                >
                  <option value="all">Todo el stock</option>
                  <option value="soldout">Solo agotados</option>
                  <option value="low">Stock bajo</option>
                </Form.Select>
              </Col>
              <Col sm={6} lg={4} className="d-flex gap-2">
                <Button className="flex-fill" onClick={openNew}>
                  <Plus /> Nuevo producto
                </Button>
                <Button variant="outline-secondary" onClick={handleReset}>
                  Restaurar originales
                </Button>
              </Col>
            </Row>

            <p className="text-muted small">
              Mostrando {filtered.length} de {products.length} productos
            </p>

            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Carta</th>
                  <th>Idioma</th>
                  <th>Estado</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Stock</th>
                  <th>Disponibilidad</th>
                  <th className="text-center">Destacada</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.idioma ?? '—'}</td>
                    <td>{p.estado ?? '—'}</td>
                    <td className="text-end">${p.price.toLocaleString('es-CL')}</td>
                    <td className="text-center text-nowrap">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => adjustStock(p.id, -1)}
                        disabled={(p.stock ?? 0) === 0}
                        aria-label={`Quitar una unidad de ${p.name}`}
                      >
                        <Dash />
                      </Button>
                      <span className="mx-2">{p.stock ?? '—'}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => adjustStock(p.id, 1)}
                        aria-label={`Agregar una unidad de ${p.name}`}
                      >
                        <Plus />
                      </Button>
                    </td>
                    <td>{stockBadge(p.stock)}</td>
                    <td className="text-center">
                      <Form.Check
                        type="switch"
                        id={`featured-${p.id}`}
                        className="d-inline-block"
                        checked={!!p.destacada}
                        onChange={(e) => updateProduct(p.id, { destacada: e.target.checked })}
                        aria-label={`Destacar ${p.name} en el inicio`}
                      />
                    </td>
                    <td className="text-end text-nowrap">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-1"
                        onClick={() => openEdit(p)}
                        aria-label={`Editar ${p.name}`}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(p)}
                        aria-label={`Eliminar ${p.name}`}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {filtered.length === 0 && (
              <p className="text-center text-muted mt-3 mb-0">
                No hay productos que coincidan con la búsqueda.
              </p>
            )}
          </Card>
        </Tab>

        <Tab eventKey="usuarios" title={`Usuarios (${users.length})`}>
          <Card className="p-3 shadow-sm">
            {users.length === 0 ? (
              <p className="text-center text-muted mb-0">Todavía no hay usuarios registrados.</p>
            ) : (
              <Table responsive hover className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.createdAt).toLocaleDateString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Tab>
      </Tabs>

      {formOpen && (
        <ProductFormModal
          key={editing ? editing.id : 'nuevo'}
          product={editing}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}

export default Admin;