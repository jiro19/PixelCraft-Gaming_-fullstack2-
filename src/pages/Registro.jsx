import React, { useState } from 'react';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const Registro = ({ totalItemsCarrito }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, password, confirmPassword } = formData;

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Simulación de registro exitoso
    setError('');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5 d-flex align-items-center">
        <Container>
          <Card className="bg-secondary text-white p-4 border-0 shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
            <Card.Body>
              <h2 className="fw-bold text-info text-center mb-4">Crear Cuenta</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="registroNombre">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre y apellido"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registroEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registroPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="registroConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <ButtonPrimary type="submit" variant="info" className="w-100 mb-3">
                  Registrarse
                </ButtonPrimary>

                <div className="text-center small text-muted">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-info text-decoration-none fw-bold">
                    Inicia sesión
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Registro;