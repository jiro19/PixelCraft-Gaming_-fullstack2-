import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../pages/Registro';

const renderRegistroWithRouter = (totalItemsCarrito = 0) => {
  return render(
    <BrowserRouter>
      <Registro totalItemsCarrito={totalItemsCarrito} />
    </BrowserRouter>
  );
};

describe('Prueba Unitaria: Página Registro.jsx', () => {
  test('Renderiza todos los campos del formulario de registro', () => {
    renderRegistroWithRouter();

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  test('Muestra un mensaje de error cuando las contraseñas no coinciden', () => {
    renderRegistroWithRouter();

    const inputNombre = screen.getByLabelText(/nombre completo/i);
    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputPassword = screen.getByLabelText(/^contraseña/i);
    const inputConfirm = screen.getByLabelText(/confirmar contraseña/i);
    const botonRegistro = screen.getByRole('button', { name: /registrarse/i });

    fireEvent.change(inputNombre, { target: { value: 'Usuario Ejemplo' } });
    fireEvent.change(inputEmail, { target: { value: 'ejemplo@correo.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.change(inputConfirm, { target: { value: 'diferente123' } });

    fireEvent.click(botonRegistro);

    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });
});