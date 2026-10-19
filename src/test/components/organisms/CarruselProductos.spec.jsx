// src/test/components/organisms/CarruselProductos.spec.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarruselProductos from '../../../components/organisms/CarruselProductos';

const productos = [
  { id: 1, name: 'Carta Uno', description: 'Desc uno', price: 1000, image: 'uno.jpg' },
  { id: 2, name: 'Carta Dos', description: 'Desc dos', price: 2000, image: 'dos.jpg' },
  { id: 3, name: 'Carta Tres', description: 'Desc tres', price: 3000, image: 'tres.jpg' },
];

const renderCarrusel = (lista = productos) =>
  render(
    <MemoryRouter>
      <CarruselProductos productos={lista} />
    </MemoryRouter>
  );
describe('CarruselProductos (organism)', () => {
  it('muestra los botones anterior y siguiente', () => {
    renderCarrusel();
    expect(screen.getByLabelText('Cartas anteriores')).toBeTruthy();
    expect(screen.getByLabelText('Cartas siguientes')).toBeTruthy();
  });

  it('muestra todas las cartas recibidas', () => {
    renderCarrusel();
    expect(screen.getAllByText('Carta Uno').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Carta Dos').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Carta Tres').length).toBeGreaterThan(0);
  });

  it('no muestra tarjetas si la lista está vacía', () => {
    renderCarrusel([]);
    expect(screen.queryAllByText('Ver detalles').length).toBe(0);
  });
});
