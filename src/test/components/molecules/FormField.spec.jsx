// src/test/components/molecules/FormField.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/molecules/FormField';

describe('FormField (molecule)', () => {
  it('renderiza el label y el input con su valor', () => {
    render(<FormField label="Nombre" name="name" value="Juan" onChange={() => {}} />);

    const input = screen.getByLabelText('Nombre');
    expect(input.value).toBe('Juan');
  });

  it('ejecuta onChange al escribir', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<FormField label="Nombre" name="name" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('muestra el error y marca el campo inválido cuando fue tocado', () => {
    render(
      <FormField
        label="Nombre"
        name="name"
        value=""
        onChange={() => {}}
        touched={true}
        error="El nombre es obligatorio."
      />
    );
    expect(screen.getByLabelText('Nombre')).toHaveClass('is-invalid');
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
  });
});
