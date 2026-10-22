import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Card, Row, Col, Spinner } from 'react-bootstrap';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';

const AdminProductos = ({ totalItemsCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Periféricos',
    imagen: ''
  });

  const cargarProductos = () => {
    fetch('http://localhost/pixelcraft-api/obtener_productos.php')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const handleAgregar = (e) => {
  e.preventDefault();
  if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

  fetch('http://localhost/pixelcraft-api/agregar_producto.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoProducto)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        cargarProductos(); // Recarga la tabla con los datos actualizados
        setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Periféricos', imagen: '' });
      } else {
        alert('Error al guardar: ' + data.message);
      }
    })
    .catch((err) => {
      console.error('Error al guardar en BD:', err);
      alert('Ocurrió un error al conectar con la API de PHP.');
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4">Mantenedor de Productos (MySQL)</h1>

          <Card className="bg-secondary text-white p-4 mb-4 border-0 shadow">
            <h4 className="text-info mb-3">Agregar Nuevo Producto a MySQL</h4>
            <Form onSubmit={handleAgregar}>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={nuevoProducto.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Precio ($)"
                    name="precio"
                    value={nuevoProducto.precio}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    value={nuevoProducto.stock}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="URL Imagen"
                    name="imagen"
                    value={nuevoProducto.imagen}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} className="text-end">
                  <Button type="submit" variant="warning" className="fw-bold">
                    Guardar en BD
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>

          {cargando ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <Table variant="dark" hover responsive className="align-middle border-secondary">
              <thead>
                <tr className="text-warning">
                  <th>ID</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductos;