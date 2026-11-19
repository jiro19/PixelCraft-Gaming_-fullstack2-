import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const categorias = [
    {
      icono: '⌨️',
      titulo: 'Periféricos',
      descripcion: 'Mouses ultraligeros, teclados mecánicos RGB y padmats de alta precisión.',
    },
    {
      icono: '🎧',
      titulo: 'Audio Gamer',
      descripcion: 'Audífonos con sonido envolvente 7.1 y micrófonos de grado estudio.',
    },
    {
      icono: '🖥️',
      titulo: 'Monitores & Consolas',
      descripcion: 'Pantallas de alta tasa de refresco y consolas de última generación.',
    },
  ];

  return (
    <div>
      {/* Hero Principal */}
      <section className="hero-gaming py-5 text-center">
        <Container className="py-5">
          <Badge bg="info" text="dark" className="mb-3 px-3 py-2 rounded-pill fw-bold">
            🚀 NUEVA TEMPORADA GAMING 2026
          </Badge>
          <h1 className="display-3 fw-bold hero-title mb-3">
            PixelCraft Gaming
          </h1>
          <p className="lead text-light opacity-75 mx-auto mb-4" style={{ maxWidth: '620px' }}>
            Equípate con el mejor hardware, consolas y periféricos de alto rendimiento para llevar tu setup al siguiente nivel.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/productos" size="lg" className="btn-neon px-4 py-2">
              Ver Catálogo Completo
            </Button>
            <Button as={Link} to="/registro" variant="outline-light" size="lg" className="px-4 py-2">
              Crear Cuenta Gratis
            </Button>
          </div>
        </Container>
      </section>

      {/* Categorías Populares */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-info">Categorías Populares</h2>
          <p className="text-secondary">Selecciona tu equipamiento ideal</p>
        </div>

        <Row className="g-4">
          {categorias.map((cat, idx) => (
            <Col md={4} key={idx}>
              <div className="card-gaming p-4 h-100 text-center d-flex flex-column justify-content-between">
                <div>
                  <div className="fs-1 mb-3">{cat.icono}</div>
                  <h4 className="fw-bold text-white mb-2">{cat.titulo}</h4>
                  <p className="text-secondary small mb-4">{cat.descripcion}</p>
                </div>
                <div>
                  <Button
                    as={Link}
                    to="/productos"
                    variant="outline-info"
                    size="sm"
                    className="px-4 fw-semibold"
                  >
                    Explorar →
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;