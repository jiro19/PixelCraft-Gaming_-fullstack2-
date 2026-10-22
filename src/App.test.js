import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Pruebas Unitarias de Integración - App Principal', () => {
  test('Renderiza los títulos de PixelCraft Gaming en la interfaz', () => {
    render(<App />);
    // Usamos getAllByText para validar que el nombre de la marca existe en la página
    const elementosTitulo = screen.getAllByText(/PixelCraft Gaming/i);
    expect(elementosTitulo.length).toBeGreaterThan(0);
  });

  test('Renderiza el botón principal para ir al catálogo completo', () => {
    render(<App />);
    const botonElemento = screen.getByRole('button', { name: /ver catálogo completo/i });
    expect(botonElemento).toBeInTheDocument();
  });
});