
import { render, screen, within } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer (organism)', () => {
  it('muestra el nombre SwamperTCG', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeTruthy();
    expect(screen.getByText('SwamperTCG')).toBeTruthy();
  });
  it('tiene los enlaces a Instagram y TCGMatch en pestaña nueva', () => {
    const { container } = render(<Footer />);
    const links = within(container).getAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toContain('instagram.com/swampertcg.cl');
    expect(links[1].getAttribute('href')).toBe('https://tcgmatch.cl/@swampertcg');
    links.forEach((link) => expect(link.getAttribute('target')).toBe('_blank'));
  });

  it('muestra el año actual en el copyright', () => {
    render(<Footer />);
    const anio = new Date().getFullYear();
    expect(screen.getByText(`© ${anio} Todos los derechos reservados`)).toBeTruthy();
  });
});
