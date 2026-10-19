// src/test/components/templates/ProtectedRoute.spec.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../../components/templates/ProtectedRoute';
import { AuthProvider } from '../../../context/AuthContext';

const renderRuta = ({ session = null, adminOnly = false } = {}) => {
  if (session) localStorage.setItem('swamper_session', JSON.stringify(session));
  return render(
    <MemoryRouter initialEntries={['/privado']}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<div>Pantalla de inicio</div>} />
          <Route path="/login" element={<div>Pantalla de login</div>} />
          <Route
            path="/privado"
            element={
              <ProtectedRoute adminOnly={adminOnly}>
                <div>Contenido privado</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('ProtectedRoute (template)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('redirige al login si no hay sesión', () => {
    renderRuta();
    expect(screen.getByText('Pantalla de login')).toBeTruthy();
    expect(screen.queryByText('Contenido privado')).toBeNull();
  });

  it('muestra el contenido si hay sesión iniciada', () => {
    renderRuta({ session: { id: '1', name: 'Ana', email: 'ana@gmail.com', role: 'user' } });
    expect(screen.getByText('Contenido privado')).toBeTruthy();
  });

  it('manda al inicio a un usuario normal en una ruta de admin', () => {
    renderRuta({
      session: { id: '1', name: 'Ana', email: 'ana@gmail.com', role: 'user' },
      adminOnly: true,
    });
    expect(screen.getByText('Pantalla de inicio')).toBeTruthy();
    expect(screen.queryByText('Contenido privado')).toBeNull();
  });
});
