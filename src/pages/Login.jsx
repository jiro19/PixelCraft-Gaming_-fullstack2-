import React, { useState } from 'react';
import { Container, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';
import ButtonPrimary from '../components/atoms/ButtonPrimary';

const Login = ({ totalItemsCarrito }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    const { email, password } = formData;

    // Validación simple de campos obligatorios y formato
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    // Simulación de autenticación exitosa
    setError('');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5 d-flex align-items-center">
        <Container>
          <Card className="bg-secondary text-white p-4 border-0 shadow-lg mx-auto" style={{ maxWidth: '450px' }}>
            <Card.Body>
              <h2 className="fw-bold text-info text-center mb-4">Iniciar Sesión</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
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

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    required
                  />
                </Form.Group>

                <ButtonPrimary type="submit" variant="info" className="w-100 mb-3">
                  Ingresar
                </ButtonPrimary>

                <div className="text-center small text-muted">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/registro" className="text-info text-decoration-none fw-bold">
                    Regístrate aquí
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

export default Login;