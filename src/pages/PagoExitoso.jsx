import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const PagoExitoso = ({ totalItemsCarrito }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5 d-flex align-items-center">
        <Container>
          <Card className="bg-secondary text-white text-center p-5 border-0 shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
            <Card.Body>
              <div className="display-1 text-success mb-3">✓</div>
              <h1 className="fw-bold text-info mb-3">¡Compra Realizada con Éxito!</h1>
              <p className="text-light mb-4">
                Hemos recibido tu pedido. Se ha enviado un correo con el comprobante de pago y el detalle de tu envío.
              </p>
              <Link to="/productos">
                <ButtonPrimary variant="info">Volver a la Tienda</ButtonPrimary>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default PagoExitoso;