import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';

const AdminDashboard = ({ totalItemsCarrito }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4 text-center">Panel de Administración</h1>

          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="bg-secondary text-white border-0 shadow text-center p-4">
                <Card.Body>
                  <Card.Title as="h3" className="fw-bold mb-3">
                    Mantenedor de Productos
                  </Card.Title>
                  <Card.Text className="text-white-50 mb-4">
                    Agregar, editar stock/precio o eliminar productos del catálogo directamente en la base de datos.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/admin/productos"
                    variant="warning"
                    size="lg"
                    className="fw-bold px-4"
                  >
                    Gestionar Productos
                  </Button>
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