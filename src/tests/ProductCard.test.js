import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';

const productoPrueba = {
  id: 1,
  codigo: "MOUSE-01",
  nombre: "Mouse Gamer RGB 16000 DPI",
  precio: 29990,
  descripcion: "Mouse óptico de alta precisión con iluminación RGB.",
  imagen: "https://via.placeholder.com/150",
  categoria: "Periféricos",
  stock: 10
};

describe('Prueba Unitaria: Componente Molecule - ProductCard', () => {
  test('Renderiza la información del producto correctamente', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} onAgregarAlCarrito={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('Mouse Gamer RGB 16000 DPI')).toBeInTheDocument();
    expect(screen.getByText('$29.990')).toBeInTheDocument();
    expect(screen.getByText(/En Stock/i)).toBeInTheDocument();
  });

  test('Llama a la función onAgregarAlCarrito al presionar el botón Añadir', () => {
    const handleAgregar = jest.fn();
    render(
      <BrowserRouter>
        <ProductCard producto={productoPrueba} onAgregarAlCarrito={handleAgregar} />
      </BrowserRouter>
    );

    const botonAñadir = screen.getByRole('button', { name: /añadir/i });
    fireEvent.click(botonAñadir);

    expect(handleAgregar).toHaveBeenCalledWith(productoPrueba);
  });
});