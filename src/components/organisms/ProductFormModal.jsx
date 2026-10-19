import { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import { validateProduct, IDIOMAS, ESTADOS } from '../../utils/productValidators';

const EMPTY = {
  name: '', description: '', price: '', stock: '', idioma: '', estado: '', image: '',
};

const fromProduct = (p) => ({
  name: p.name,
  description: p.description,
  price: String(p.price),
  stock: p.stock === undefined ? '' : String(p.stock),
  idioma: p.idioma ?? '',
  estado: p.estado ?? '',
  image: p.image,
});

const SELECTS = [
  { name: 'idioma', label: 'Idioma', options: IDIOMAS },
  { name: 'estado', label: 'Estado', options: ESTADOS },
];

function ProductFormModal({ product, onClose, onSave }) {
  const [values, setValues] = useState(product ? fromProduct(product) : EMPTY);
  const [touched, setTouched] = useState({});

  const errors = validateProduct(values);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true, description: true, price: true, stock: true,
      idioma: true, estado: true, image: true,
    });
    if (hasErrors) return;

    onSave({
      name: values.name.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      idioma: values.idioma,
      estado: values.estado,
      image: values.image.trim(),
    });
  };

  const showPreview = values.image.trim() && !errors.image;

  return (
    <Modal show onHide={onClose} backdrop="static" centered>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="h5">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />
          <FormField
            label="Edición / descripción"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description}
            touched={touched.description}
            hint="Ejemplo: Edición: SV: 151."
          />

          <Row>
            <Col sm={6}>
              <FormField
                label="Precio (CLP)"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.price}
                touched={touched.price}
              />
            </Col>
            <Col sm={6}>
              <FormField
                label="Stock"
                name="stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.stock}
                touched={touched.stock}
              />
            </Col>
          </Row>

          <Row>
            {SELECTS.map((s) => (
              <Col sm={6} key={s.name}>
                <Form.Group className="mb-3" controlId={s.name}>
                  <Form.Label>{s.label}</Form.Label>
                  <Form.Select
                    name={s.name}
                    value={values[s.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched[s.name] && !!errors[s.name]}
                  >
                    <option value="">Selecciona...</option>
                    {s.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors[s.name]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            ))}
          </Row>

          <FormField
            label="Imagen"
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.image}
            touched={touched.image}
            hint="Ruta de un archivo de la carpeta public, por ejemplo /imagenes/cartas/charizard.jpg"
          />

          {showPreview && (
            <img
              key={values.image}
              src={values.image.trim()}
              alt="Vista previa"
              height="140"
              className="rounded border"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{product ? 'Guardar cambios' : 'Crear producto'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProductFormModal;