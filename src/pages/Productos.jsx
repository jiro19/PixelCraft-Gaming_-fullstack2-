import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ProductCard from '../components/molecules/ProductCard';
import { productosIniciales } from '../data/productosData';

const Productos = ({ totalItemsCarrito, agregarAlCarrito }) => {
  const [productos] = useState(productosIniciales);
  const [filtro, setFiltro] = useState('');

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtro.toLowerCase())
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

          <Row className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
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
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Productos;