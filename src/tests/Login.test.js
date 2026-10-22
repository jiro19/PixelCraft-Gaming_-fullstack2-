import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const renderLoginWithRouter = (totalItemsCarrito = 0) => {
  return render(
    <BrowserRouter>
      <Login totalItemsCarrito={totalItemsCarrito} />
    </BrowserRouter>
  );
};

describe('Prueba Unitaria: Página Login.jsx', () => {
  test('Renderiza los campos de formulario y el botón de ingreso', () => {
    renderLoginWithRouter();

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  test('Muestra un mensaje de error si el correo no tiene un formato válido', () => {
    renderLoginWithRouter();

    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);
    const botonIngresar = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(inputEmail, { target: { value: 'correoinvalido' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(botonIngresar);

    expect(screen.getByText(/ingresa un correo electrónico válido/i)).toBeInTheDocument();
  });
});