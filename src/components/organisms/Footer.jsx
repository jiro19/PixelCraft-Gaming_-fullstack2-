import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light border-top border-secondary py-4 mt-auto">
      <Container>
        <Row className="gy-3">
          <Col md={4}>
            <h5 className="text-info fw-bold">PixelCraft Gaming</h5>
            <p className="text-muted small">
              Tu tienda de hardware y periféricos gaming de alta precisión.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">Navegación</h6>
            <ul className="list-unstyled small">
              <li><Link to="/productos" className="text-decoration-none text-muted">Catálogo</Link></li>
              <li><Link to="/contacto" className="text-decoration-none text-muted">Contacto</Link></li>
              <li><Link to="/admin" className="text-decoration-none text-warning">Administración</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">Evaluación Fullstack II</h6>
            <p className="text-muted small">
              Desarrollado en React con Bootstrap & Atomic Design.
            </p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center text-muted small mb-0">
          &copy; 2026 PixelCraft Gaming - Duoc UC
        </p>
      </Container>
    </footer>
  );
};

export default Footer;