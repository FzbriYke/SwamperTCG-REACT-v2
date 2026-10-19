import { Form } from 'react-bootstrap';

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  hint,
  autoComplete,
  showValid = true,
}) {
  const invalid = touched && !!error;
  const valid = showValid && touched && !error;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={invalid}
        isValid={valid}
        autoComplete={autoComplete}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {hint && !invalid && <Form.Text className="text-muted">{hint}</Form.Text>}
    </Form.Group>
  );
}

export default FormField;