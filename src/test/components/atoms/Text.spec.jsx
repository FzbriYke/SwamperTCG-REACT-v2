// src/test/components/atoms/Text.spec.jsx
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text (atom)', () => {
  it('renderiza un <p> por defecto', () => {
    render(<Text>Hola mundo</Text>);
    expect(screen.getByText('Hola mundo').tagName).toBe('P');
  });

  it('renderiza la etiqueta indicada en variant', () => {
    render(<Text variant="h1">Mi título</Text>);
    expect(screen.getByRole('heading', { level: 1, name: 'Mi título' })).toBeTruthy();
  });

  it('aplica el className recibido', () => {
    render(<Text className="fw-bold">Texto en negrita</Text>);
    expect(screen.getByText('Texto en negrita')).toHaveClass('fw-bold');
  });
});
