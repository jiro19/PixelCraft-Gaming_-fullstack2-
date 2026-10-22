import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import HeaderNavbar from '../components/organisms/HeaderNavbar';
import Footer from '../components/organisms/Footer';

const Contacto = ({ totalItemsCarrito }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío de formulario de contacto
    if (formData.nombre && formData.email && formData.mensaje) {
      setEnviado(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      setTimeout(() => setEnviado(false), 5000); // Ocultar mensaje tras 5s
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h1 className="fw-bold text-info mb-2">Contáctanos</h1>
              <p className="text-white" style={{ opacity: 0.9 }}>
                ¿Tienes dudas sobre algún componente o tu pedido? Escríbenos y te responderemos a la brevedad.
              </p>
            </Col>
          </Row>

          <Row className="g-4 justify-content-center">
            {/* Formulario de contacto */}
            <Col lg={7}>
              <Card className="bg-secondary text-white p-4 border-0 shadow">
                <h4 className="text-info mb-3">Déjanos un mensaje</h4>

                {enviado && (
                  <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
                    ¡Gracias por contactarnos! Tu mensaje ha sido enviado con éxito.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="contactNombre">
                        <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          placeholder="Ej: Juan Pérez"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="bg-dark text-white border-dark"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="contactEmail">
                        <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="nombre@correo.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-dark text-white border-dark"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="contactAsunto">
                        <Form.Label className="fw-semibold">Asunto</Form.Label>
                        <Form.Control
                          type="text"
                          name="asunto"
                          placeholder="Consulta sobre productos, envíos, etc."
                          value={formData.asunto}
                          onChange={handleChange}
                          className="bg-dark text-white border-dark"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="contactMensaje">
                        <Form.Label className="fw-semibold">Mensaje</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="mensaje"
                          placeholder="Escribe tu mensaje aquí..."
                          value={formData.mensaje}
                          onChange={handleChange}
                          required
                          className="bg-dark text-white border-dark"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} className="text-end">
                      <Button type="submit" variant="info" size="lg" className="fw-bold px-4">
                        Enviar Mensaje
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>

            {/* Información de contacto de la tienda */}
            <Col lg={5}>
              <Card className="bg-secondary text-white p-4 border-0 shadow h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="text-info mb-3">Información de la Tienda</h4>
                  <p className="text-white mb-4" style={{ opacity: 0.9 }}>
                    Visita nuestra sucursal principal o comunícate directamente a través de nuestros canales de atención.
                  </p>

                  <div className="mb-3">
                    <h6 className="text-warning fw-bold mb-1">📍 Dirección:</h6>
                    <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                      Av. Providencia 1234, Oficina 402, Santiago, Chile
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-warning fw-bold mb-1">📞 Teléfono:</h6>
                    <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                      +56 9 1234 5678
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-warning fw-bold mb-1">✉️ Email Soporte:</h6>
                    <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                      contacto@pixelcraft.cl
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-warning fw-bold mb-1">⏰ Horario de Atención:</h6>
                    <p className="text-white mb-0" style={{ opacity: 0.9 }}>
                      Lunes a Viernes: 09:00 hrs - 18:30 hrs
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-dark rounded border border-dark text-center">
                  <span className="text-info fw-bold">🎮 PixelCraft Gaming - DSY1104</span>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;