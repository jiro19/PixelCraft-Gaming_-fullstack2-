import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ProductCard from '../components/molecules/ProductCard';

const Productos = ({ totalItemsCarrito, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('http://localhost/pixelcraft-api/obtener_productos.php')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then((data) => {
        // Mapeo para asegurar que precio e id sean numéricos
        const productosFormateados = data.map((p) => ({
          ...p,
          id: Number(p.id),
          precio: Number(p.precio),
          stock: Number(p.stock)
        }));
        setProductos(productosFormateados);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al conectar con XAMPP:', err);
        setError('No se pudo conectar con la base de datos de XAMPP.');
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter((p) =>
    (p.nombre || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (p.categoria || '').toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fw-bold text-info mb-1">Catálogo de Productos</h1>
              <p className="text-muted mb-0">Encuentra periféricos y componentes de alto rendimiento.</p>
            </div>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="bg-secondary text-white border-secondary"
              style={{ maxWidth: '300px' }}
            />
          </div>

          {cargando && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="info" />
              <p className="mt-2 text-muted">Cargando productos desde la base de datos...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {!cargando && !error && (
            <Row className="g-4">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <Col key={producto.id} sm={6} md={4} lg={3}>
                    <ProductCard 
                      producto={producto} 
                      onAgregarAlCarrito={agregarAlCarrito} 
                    />
                  </Col>
                ))
              ) : (
                <Col xs={12}>
                  <div className="text-center py-5 text-muted">
                    <p className="fs-5">No se encontraron productos coincidentes.</p>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Productos;