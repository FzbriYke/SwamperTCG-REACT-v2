// src/test/components/atoms/Image.spec.jsx
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image (atom)', () => {
  it('renderiza la imagen con su src y su alt', () => {
    render(<Image src="carta.jpg" alt="Carta de Darkrai" />);
    const img = screen.getByRole('img', { name: 'Carta de Darkrai' });
    expect(img.getAttribute('src')).toBe('carta.jpg');
  });

  it('aplica el className recibido', () => {
    render(<Image src="carta.jpg" alt="Carta" className="card-img-top" />);
    expect(screen.getByRole('img')).toHaveClass('card-img-top');
  });
  it('aplica el style recibido', () => {
    render(<Image src="carta.jpg" alt="Carta" style={{ width: '100px' }} />);
    expect(screen.getByRole('img').style.width).toBe('100px');
  });
});
