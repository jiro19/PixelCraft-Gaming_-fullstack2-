import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';

const AdminDashboard = ({ totalItemsCarrito }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4">Panel de Administración</h1>
          <Row className="g-4">
            <Col md={6}>
              <Card className="bg-secondary text-white border-0 shadow">
                <Card.Body className="p-4 text-center">
                  <h3>Mantenedor de Productos </h3>
                  <p className="text-muted">Agregar, editar o eliminar productos del catálogo.</p>
                  <Link to="/admin/productos" className="btn btn-warning fw-bold">
                    Gestionar Productos
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-secondary text-white border-0 shadow">
                <Card.Body className="p-4 text-center">
                  <h3>Gestión de Usuarios</h3>
                  <p className="text-muted">Revisar usuarios registrados y asignación de roles.</p>
                  <button className="btn btn-outline-light" disabled>
                    Próximamente
                  </button>
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

export default AdminDashboard;