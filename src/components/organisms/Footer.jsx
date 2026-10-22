import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary">
      <Container>
        <Row className="gy-3">
          {/* Columna 1: Nombre de la tienda y descripción */}
          <Col md={4}>
            <h5 className="text-info fw-bold">PixelCraft Gaming</h5>
            <p className="text-white mb-0" style={{ opacity: 0.9 }}>
              Tu tienda de hardware y periféricos gaming de alta precisión.
            </p>
          </Col>

          {/* Columna 2: Enlaces de Navegación */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-2">Navegación</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/productos" className="text-white text-decoration-none">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white text-decoration-none">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/admin/productos" className="text-warning text-decoration-none fw-semibold">
                  Administración
                </Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Información de la asignatura */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-2">Evaluación Fullstack II</h5>
            <p className="text-white mb-0" style={{ opacity: 0.9 }}>
              Desarrollado en React con Bootstrap & Atomic Design.
            </p>
          </Col>
        </Row>

        <hr className="my-3 border-secondary" />

        <div className="text-center text-white small" style={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} PixelCraft Gaming. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;