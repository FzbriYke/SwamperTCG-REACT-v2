import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/molecules/FormField';
import { validateEmail } from '../utils/Validators';

function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/perfil';

  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const isAdminUser = values.email.trim().toLowerCase() === 'admin';
  
  const errors = {
    email: isAdminUser ? '' : validateEmail(values.email),
    password: values.password ? '' : 'La contraseña es obligatoria.',
  };
  
  const hasErrors = Object.values(errors).some(Boolean);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setServerError('');
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors) return;

    setLoading(true);
    const result = await login(values);
    setLoading(false);
    if (!result.ok) setServerError(result.error);
  };

  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : from} replace />;

  return (
    <Container className="my-5" style={{ maxWidth: '480px' }}>
      <Card className="p-4 shadow-sm">
        <h1 className="h3 fw-bold text-center mb-4">Iniciar sesión</h1>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
          <FormField
            label="Correo electrónico o usuario"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            autoComplete="email"
            showValid={false}
          />
          <FormField
            label="Contraseña"
            name="password"
            type={showPass ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            autoComplete="current-password"
            showValid={false}
          />

          <Form.Check
            type="checkbox"
            id="show-pass-login"
            label="Mostrar contraseña"
            className="mb-3"
            checked={showPass}
            onChange={(e) => setShowPass(e.target.checked)}
          />

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Login;