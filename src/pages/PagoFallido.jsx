import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const PagoFallido = ({ totalItemsCarrito }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5 d-flex align-items-center">
        <Container>
          <Card className="bg-secondary text-white text-center p-5 border-0 shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
            <Card.Body>
              <div className="display-1 text-danger mb-3">✕</div>
              <h1 className="fw-bold text-danger mb-3">No se pudo realizar el pago</h1>
              <p className="text-light mb-4">
                Ocurrió un problema al procesar tu transacción. Por favor, verifica los datos de tu tarjeta, intenta con otro medio de pago o ponte en contacto con tu entidad bancaria.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/carrito">
                  <ButtonPrimary variant="warning">Volver al Carrito</ButtonPrimary>
                </Link>
                <Link to="/productos">
                  <ButtonPrimary variant="outline-light">Seguir Comprando</ButtonPrimary>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default PagoFallido;