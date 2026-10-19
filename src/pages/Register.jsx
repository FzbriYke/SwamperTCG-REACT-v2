import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/molecules/FormField';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirm,
} from '../utils/Validators';

function Register() {
  const { user, register } = useAuth();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const errors = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirm: validateConfirm(values.password, values.confirm),
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
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (hasErrors) return;

    setLoading(true);
    const result = await register(values);
    setLoading(false);
    if (!result.ok) setServerError(result.error);
  };

  if (user) return <Navigate to="/perfil" replace />;

  const passType = showPass ? 'text' : 'password';

  return (
    <Container className="my-5" style={{ maxWidth: '480px' }}>
      <Card className="p-4 shadow-sm">
        <h1 className="h3 fw-bold text-center mb-4">Crear cuenta</h1>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
          <FormField
            label="Nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            autoComplete="name"
          />
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            autoComplete="email"
          />
          <FormField
            label="Contraseña"
            name="password"
            type={passType}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            hint="Mínimo 8 caracteres, con mayúscula, minúscula y número."
            autoComplete="new-password"
          />
          <FormField
            label="Confirmar contraseña"
            name="confirm"
            type={passType}
            value={values.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirm}
            touched={touched.confirm}
            autoComplete="new-password"
          />

          <Form.Check
            type="checkbox"
            id="show-pass"
            label="Mostrar contraseña"
            className="mb-3"
            checked={showPass}
            onChange={(e) => setShowPass(e.target.checked)}
          />

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Register;