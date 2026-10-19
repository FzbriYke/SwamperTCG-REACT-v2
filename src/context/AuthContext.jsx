import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'swamper_users';
const SESSION_KEY = 'swamper_session';
const ADMIN = { username: 'admin', password: 'admin12345678' };

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const hashPassword = async (password, salt) => {
  const data = new TextEncoder().encode(salt + password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null));

  const startSession = (u) => {
    const session = { id: u.id, name: u.name, email: u.email, role: u.role || 'user' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const register = async ({ name, email, password }) => {
    const users = readJSON(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: 'Ya existe una cuenta con este correo.' };
    }

    const salt = crypto.randomUUID();
    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    startSession(newUser);
    return { ok: true };
  };

  const login = async ({ email, password }) => {
    const identifier = email.trim().toLowerCase();
    const genericError = { ok: false, error: 'Correo o contraseña incorrectos.' };

    if (identifier === ADMIN.username) {
      if (password !== ADMIN.password) return genericError;
      startSession({ id: 'admin', name: 'Administrador', email: ADMIN.username, role: 'admin' });
      return { ok: true };
    }

    const users = readJSON(USERS_KEY, []);
    const found = users.find((u) => u.email === identifier);
    if (!found) return genericError;

    const hash = await hashPassword(password, found.salt);
    if (hash !== found.passwordHash) return genericError;

    startSession(found);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);