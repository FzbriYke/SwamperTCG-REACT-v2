// src/test/components/organisms/ProductFormModal.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductFormModal from '../../../components/organisms/ProductFormModal';

const productoExistente = {
  id: 1,
  name: 'Darkrai',
  description: 'Edición: SV 151',
  price: 15000,
  stock: 3,
  idioma: 'ingles',
  estado: 'NM',
  image: '/imagenes/cartas/darkrai.jpg',
};

describe('ProductFormModal (organism)', () => {
  it('muestra "Nuevo producto" con los campos vacíos', () => {
    render(<ProductFormModal onClose={() => {}} onSave={() => {}} />);
    expect(screen.getByText('Nuevo producto')).toBeTruthy();
    expect(screen.getByText('Crear producto')).toBeTruthy();
    expect(screen.getByLabelText('Nombre').value).toBe('');
  });

  it('al editar, carga los datos del producto', () => {
    render(
      <ProductFormModal product={productoExistente} onClose={() => {}} onSave={() => {}} />
    );

    expect(screen.getByText('Editar producto')).toBeTruthy();
    expect(screen.getByText('Guardar cambios')).toBeTruthy();
    expect(screen.getByLabelText('Nombre').value).toBe('Darkrai');
    expect(screen.getByLabelText('Precio (CLP)').value).toBe('15000');
    expect(screen.getByLabelText('Estado').value).toBe('NM');
  });

  it('no llama a onSave si el formulario es inválido', () => {
    const onSave = jasmine.createSpy('onSave');
    render(<ProductFormModal onClose={() => {}} onSave={onSave} />);
    fireEvent.click(screen.getByText('Crear producto'));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
  });
});
