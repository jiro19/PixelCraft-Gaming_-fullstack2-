import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas Principales de la Tienda
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import PagoExitoso from './pages/PagoExitoso';
import PagoFallido from './pages/PagoFallido';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import Login from './pages/Login';
import Registro from './pages/Registro';
function App() {
  // Estado global del carrito inicializado con localStorage
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('pixelcraft_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('pixelcraft_cart', JSON.stringify(carrito));
  }, [carrito]);

  // Función global para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Cálculo total de ítems agregados para la insignia (Badge) del Navbar
  const totalItemsCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route 
          path="/" 
          element={<Home totalItemsCarrito={totalItemsCarrito} />} 
        />
        <Route 
          path="/productos" 
          element={
            <Productos 
              totalItemsCarrito={totalItemsCarrito} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          } 
        />
        <Route 
          path="/carrito" 
          element={
            <Carrito 
              carrito={carrito} 
              setCarrito={setCarrito} 
              totalItemsCarrito={totalItemsCarrito} 
            />
          } 
        />
        <Route 
          path="/pago-exitoso" 
          element={<PagoExitoso totalItemsCarrito={totalItemsCarrito} />} 
        />
        <Route 
          path="/pago-fallido" 
          element={<PagoFallido totalItemsCarrito={totalItemsCarrito} />} 
        />

        {/* Redirección por defecto para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<AdminDashboard totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/admin/productos" element={<AdminProductos totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/login" element={<Login totalItemsCarrito={totalItemsCarrito} />} />
<Route path="/registro" element={<Registro totalItemsCarrito={totalItemsCarrito} />} />
      </Routes>
    </Router>
  );
}

export default App;