import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const Home = ({ totalItemsCarrito }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1">
        {/* Banner Hero */}
        <section className="bg-secondary py-5 text-center mb-5 border-bottom border-secondary">
          <Container className="py-4">
            <h1 className="display-4 fw-bold text-info mb-3">PixelCraft Gaming</h1>
            <p className="lead text-light mb-4">
              Equípate con el mejor hardware y periféricos para llevar tu juego al siguiente nivel.
            </p>
            <Link to="/productos">
              <ButtonPrimary variant="info">Ver Catálogo Completo</ButtonPrimary>
            </Link>
          </Container>
        </section>

        {/* Categorías Destacadas */}
        <Container className="mb-5">
          <h2 className="text-info fw-bold mb-4 text-center">Categorías Populares</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="bg-secondary text-white h-100 border-0 shadow">
                <Card.Body className="text-center p-4">
                  <h3 className="fs-4 fw-bold">Periféricos</h3>
                  <p className="text-muted small">Mouses, teclados mecánicos y padmats de precisión.</p>
                  <Link to="/productos" className="btn btn-outline-info btn-sm">Explorar</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-secondary text-white h-100 border-0 shadow">
                <Card.Body className="text-center p-4">
                  <h3 className="fs-4 fw-bold">Audio Gamer</h3>
                  <p className="text-muted small">Audífonos con sonido envolvente 7.1 y micrófonos.</p>
                  <Link to="/productos" className="btn btn-outline-info btn-sm">Explorar</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-secondary text-white h-100 border-0 shadow">
                <Card.Body className="text-center p-4">
                  <h3 className="fs-4 fw-bold">Monitores</h3>
                  <p className="text-muted small">Tasa de refresco de alta velocidad y respuesta 1ms.</p>
                  <Link to="/productos" className="btn btn-outline-info btn-sm">Explorar</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Home;