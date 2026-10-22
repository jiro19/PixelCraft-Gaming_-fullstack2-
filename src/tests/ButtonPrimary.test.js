import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

describe('Prueba Unitaria: Componente Atom - ButtonPrimary', () => {
  test('Renderiza el botón con el texto correcto', () => {
    render(<ButtonPrimary>Añadir al Carrito</ButtonPrimary>);
    const botonElemento = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(botonElemento).toBeInTheDocument();
  });

  test('Ejecuta la función onClick al hacer clic', () => {
    const handleClick = jest.fn();
    render(<ButtonPrimary onClick={handleClick}>Comprar</ButtonPrimary>);
    const botonElemento = screen.getByRole('button', { name: /comprar/i });
    
    fireEvent.click(botonElemento);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('El botón se deshabilita correctamente cuando la prop disabled es true', () => {
    render(<ButtonPrimary disabled={true}>Agotado</ButtonPrimary>);
    const botonElemento = screen.getByRole('button', { name: /agotado/i });
    expect(botonElemento).toBeDisabled();
  });
});