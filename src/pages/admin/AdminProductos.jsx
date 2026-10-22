import React, { useState } from 'react';
import { Container, Table, Button, Form, Card, Row, Col } from 'react-bootstrap';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';
import { productosIniciales } from '../../data/productosData';

const AdminProductos = ({ totalItemsCarrito }) => {
  const [productos, setProductos] = useState(productosIniciales);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Periféricos',
    imagen: ''
  });

  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    const productoCreado = {
      ...nuevoProducto,
      id: Date.now(),
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock)
    };

    setProductos([...productos, productoCreado]);
    setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Periféricos', imagen: '' });
  };

  const handleEliminar = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4">Mantenedor de Productos</h1>

          <Card className="bg-secondary text-white p-4 mb-4 border-0 shadow">
            <h4 className="text-info mb-3">Agregar Nuevo Producto</h4>
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
                    Guardar Producto
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <Table variant="dark" hover responsive className="align-middle border-secondary">
            <thead>
              <tr className="text-warning">
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleEliminar(p.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductos;