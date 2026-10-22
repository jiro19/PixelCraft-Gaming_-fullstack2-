import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const HeaderNavbar = ({ totalItemsCarrito = 0 }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-info fs-4">
          PixelCraft Gaming
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/admin" className="text-warning fw-bold">Admin Panel</Nav.Link>
          </Nav>
          <Nav className="gap-2 align-items-center">
            <Nav.Link as={Link} to="/login" className="btn btn-outline-light btn-sm px-3">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/registro" className="btn btn-info btn-sm px-3 text-dark fw-bold">
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="btn btn-secondary btn-sm px-3 ms-2 position-relative">
              Carrito 🛒
              {totalItemsCarrito > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {totalItemsCarrito}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;