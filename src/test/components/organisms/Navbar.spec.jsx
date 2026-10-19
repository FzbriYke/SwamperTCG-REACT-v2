// src/test/components/organisms/Navbar.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';
import { AuthProvider } from '../../../context/AuthContext';
import { ProductsProvider } from '../../../context/ProductsContext';
import { CarritoProvider } from '../../../context/CarritoContext';

const UbicacionActual = () => {
  const location = useLocation();
  return <div data-testid="ubicacion">{location.pathname + location.search}</div>;
};

const renderNavbar = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <ProductsProvider>
          <CarritoProvider>
            <NavBar />
            <UbicacionActual />
          </CarritoProvider>
        </ProductsProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('Navbar (organism)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('muestra el logo y los links del menú', () => {
    renderNavbar();
    expect(screen.getByAltText('SwamperTCG')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Catálogo')).toBeTruthy();
    expect(screen.getByText('¿Quienes somos?')).toBeTruthy();
  });

  it('navega al catálogo con el texto buscado', () => {
    renderNavbar();
    fireEvent.change(screen.getByLabelText('Buscar carta'), { target: { value: 'pikachu' } });
    fireEvent.click(screen.getByText('Buscar'));
    expect(screen.getByTestId('ubicacion').textContent).toBe('/products?q=pikachu');
  });

  it('muestra en el carrito el total de productos', () => {
    localStorage.setItem(
      'swamper_carrito',
      JSON.stringify([{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }])
    );
    renderNavbar();
    expect(screen.getByText('5')).toBeTruthy();
  });
});
