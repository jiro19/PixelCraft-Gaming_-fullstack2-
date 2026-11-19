import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import PagoExitoso from './pages/PagoExitoso';
import PagoFallido from './pages/PagoFallido';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';

const RutaAdmin = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario || (usuario.rol !== 'ADMIN' && usuario.rol !== 'VENDEDOR')) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('pixelcraft_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('pixelcraft_cart', JSON.stringify(carrito));
  }, [carrito]);

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

  const totalItemsCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home totalItemsCarrito={totalItemsCarrito} />} />
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
        <Route path="/pago-exitoso" element={<PagoExitoso totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/pago-fallido" element={<PagoFallido totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/login" element={<Login totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/registro" element={<Registro totalItemsCarrito={totalItemsCarrito} />} />
        <Route path="/contacto" element={<Contacto totalItemsCarrito={totalItemsCarrito} />} />

        {/* Rutas Protegidas (ADMIN / VENDEDOR) */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminDashboard totalItemsCarrito={totalItemsCarrito} />
            </RutaAdmin>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <RutaAdmin>
              <AdminProductos totalItemsCarrito={totalItemsCarrito} />
            </RutaAdmin>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;