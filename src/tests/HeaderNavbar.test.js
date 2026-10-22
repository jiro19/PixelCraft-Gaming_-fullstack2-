import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';

describe('Prueba Unitaria: Componente Organism - HeaderNavbar', () => {
  test('Renderiza el nombre de la marca y los enlaces de navegación', () => {
    render(
      <BrowserRouter>
        <HeaderNavbar totalItemsCarrito={0} />
      </BrowserRouter>
    );

    expect(screen.getByText('PixelCraft Gaming')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument();
  });

  test('Muestra el número dinámico de productos en la insignia del carrito', () => {
    render(
      <BrowserRouter>
        <HeaderNavbar totalItemsCarrito={3} />
      </BrowserRouter>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});