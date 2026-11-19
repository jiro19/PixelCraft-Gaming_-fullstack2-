import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { cerrarSesion } from '../../services/api';

const HeaderNavbar = ({ totalItemsCarrito = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('usuario');
    setUsuario(guardado ? JSON.parse(guardado) : null);
  }, [location]);

  const esAdminOVendedor = usuario && (usuario.rol === 'ADMIN' || usuario.rol === 'VENDEDOR');

  const handleLogout = () => {
    cerrarSesion();
    setUsuario(null);
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      style={{ backgroundColor: 'rgba(11, 14, 20, 0.92)', backdropFilter: 'blur(10px)' }}
      className="border-bottom border-secondary border-opacity-25 py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
          <span style={{ color: '#0dcaf0' }}>⚡ PixelCraft</span>
          <span className="text-white">Gaming</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-4 gap-2">
            <Nav.Link as={NavLink} to="/" className="fw-semibold">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className="fw-semibold">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" className="fw-semibold">Contacto</Nav.Link>
            {esAdminOVendedor && (
              <Nav.Link as={NavLink} to="/admin" className="text-warning fw-bold">
                ⚙️ Admin Panel
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 mt-lg-0">
            {usuario ? (
              <>
                <span className="text-light small me-2 px-2 py-1 rounded bg-dark border border-secondary border-opacity-50">
                  Hola, <strong className="text-info">{usuario.nombre}</strong>{' '}
                  <Badge bg={esAdminOVendedor ? 'warning' : 'info'} text="dark" className="ms-1">
                    {usuario.rol}
                  </Badge>
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="fw-semibold">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-info"
                  size="sm"
                  className="px-3 fw-semibold"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  as={Link}
                  to="/registro"
                  size="sm"
                  className="btn-neon px-3"
                >
                  Registrarse
                </Button>
              </>
            )}

            <Button
              as={Link}
              to="/carrito"
              variant="dark"
              size="sm"
              className="px-3 ms-lg-2 border border-secondary d-flex align-items-center gap-2 fw-semibold"
            >
              <span>🛒 Carrito</span>
              {totalItemsCarrito > 0 && (
                <Badge bg="danger" pill>
                  {totalItemsCarrito}
                </Badge>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;