// src/test/components/molecules/CardBody.spec.jsx
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

const props = {
  title: 'Darkrai',
  description: 'Edición: SV 151',
  price: 15000,
  idioma: 'Español',
  estado: 'NM',
  stock: 5,
};

describe('CardBody (molecule)', () => {
  it('muestra el título y la descripción', () => {
    render(<CardBody {...props} />);
    expect(screen.getByRole('heading', { level: 5, name: 'Darkrai' })).toBeTruthy();
    expect(screen.getByText('Edición: SV 151')).toBeTruthy();
  });

  it('muestra el precio con formato chileno', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('$15.000')).toBeTruthy();
  });

  it('tiene idioma, estado y stock ocultos', () => {
    render(<CardBody {...props} />);
    const idioma = screen.getByText('Idioma: Español');
    expect(idioma).toBeTruthy();
    expect(screen.getByText('Estado: NM')).toBeTruthy();
    expect(screen.getByText('Stock: 5')).toBeTruthy();
    expect(idioma.parentElement.style.display).toBe('none');
  });
});
