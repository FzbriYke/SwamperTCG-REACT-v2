// src/test/components/atoms/Button.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button (atom)', () => {
  it('muestra el texto del botón', () => {
    render(<Button>Haz click</Button>);
    expect(screen.getByText('Haz click')).toBeTruthy();
  });

  it('aplica la variante de Bootstrap', () => {
    render(<Button variant="danger">Eliminar</Button>);
    expect(screen.getByText('Eliminar')).toHaveClass('btn-danger');
  });

  it('ejecuta onClick al hacer click', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button onClick={onClick}>Comprar</Button>);
    fireEvent.click(screen.getByText('Comprar'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
