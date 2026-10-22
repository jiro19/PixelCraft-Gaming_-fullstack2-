import React from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import CartItemRow from '../components/molecules/CartItemRow';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const Carrito = ({ carrito, setCarrito, totalItemsCarrito }) => {
  const navigate = useNavigate();

  const totalPagar = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const procesarPago = () => {
    if (carrito.length === 0) return;
    setCarrito([]); // Limpiar carrito tras compra exitosa
    navigate('/pago-exitoso'); // Redirigir a vista exigida en la pauta
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-info mb-4">Tu Carrito de Compras</h1>

          {carrito.length === 0 ? (
            <Card className="bg-secondary text-center p-5 border-0">
              <Card.Body>
                <h3 className="text-light mb-3">El carrito está vacío</h3>
                <p className="text-muted mb-4">Añade productos desde nuestro catálogo para comenzar tu compra.</p>
                <Link to="/productos">
                  <ButtonPrimary variant="info">Ir al Catálogo</ButtonPrimary>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <>
              <div className="table-responsive mb-4">
                <Table variant="dark" hover className="align-middle border-secondary">
                  <thead>
                    <tr className="text-info border-bottom border-secondary">
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map(item => (
                      <CartItemRow 
                        key={item.id} 
                        item={item} 
                        onEliminar={eliminarDelCarrito} 
                      />
                    ))}
                  </tbody>
                </Table>
              </div>

              <Card className="bg-secondary text-white p-4 border-0 shadow-sm">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div>
                    <span className="fs-5 text-muted me-2">Total a pagar:</span>
                    <span className="fs-2 fw-bold text-info">${totalPagar.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <ButtonPrimary variant="danger" onClick={vaciarCarrito}>
                      Vaciar Carrito
                    </ButtonPrimary>
                    <ButtonPrimary variant="success" onClick={procesarPago}>
                      Proceder al Pago
                    </ButtonPrimary>
                  </div>
                </div>
              </Card>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Carrito;