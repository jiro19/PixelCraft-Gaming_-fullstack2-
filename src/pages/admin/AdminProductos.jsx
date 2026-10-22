import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Card, Row, Col, Spinner, Badge } from 'react-bootstrap';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';

const AdminProductos = ({ totalItemsCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [edicion, setEdicion] = useState({}); // Controla qué fila se está editando
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
      .catch((err) => console.error('Error al cargar productos:', err));
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

    fetch('http://localhost/pixelcraft-api/agregar_productos.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          cargarProductos();
          setNuevoProducto({ nombre: '', precio: '', stock: '', categoria: 'Periféricos', imagen: '' });
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch((err) => console.error('Error al guardar:', err));
  };

  // Manejar cambios en la edición inline de stock y precio
  const handleEditChange = (id, campo, valor) => {
    setEdicion({
      ...edicion,
      [id]: {
        ...edicion[id],
        [campo]: valor
      }
    });
  };

  // Guardar modificaciones en MySQL
  const handleGuardarModificacion = (producto) => {
    const datosEditados = edicion[producto.id] || {};
    const nuevoStock = datosEditados.stock !== undefined ? datosEditados.stock : producto.stock;
    const nuevoPrecio = datosEditados.precio !== undefined ? datosEditados.precio : producto.precio;

    fetch('http://localhost/pixelcraft-api/actualizar_producto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accion: 'actualizar',
        id: producto.id,
        stock: nuevoStock,
        precio: nuevoPrecio
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          cargarProductos();
          const copia = { ...edicion };
          delete copia[producto.id];
          setEdicion(copia);
        } else {
          alert('Error al actualizar: ' + data.message);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  // Eliminar producto de MySQL
  const handleEliminar = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto de la base de datos?')) return;

    fetch('http://localhost/pixelcraft-api/actualizar_producto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accion: 'eliminar',
        id: id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          cargarProductos();
        } else {
          alert('Error al eliminar: ' + data.message);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4">Mantenedor de Productos (MySQL)</h1>

          {/* Formulario Agregar */}
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

          {/* Tabla con Edición y Eliminación */}
          {cargando ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <Table variant="dark" hover responsive className="align-middle border-secondary">
              <thead>
                <tr className="text-warning">
                  <th>ID</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th style={{ width: '140px' }}>Precio ($)</th>
                  <th style={{ width: '120px' }}>Stock</th>
                  <th className="text-center" style={{ width: '180px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  const editandoFila = edicion[p.id] !== undefined;
                  const precioVal = editandoFila && edicion[p.id].precio !== undefined ? edicion[p.id].precio : p.precio;
                  const stockVal = editandoFila && edicion[p.id].stock !== undefined ? edicion[p.id].stock : p.stock;

                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td><Badge bg="secondary">{p.codigo}</Badge></td>
                      <td>{p.nombre}</td>
                      <td>
                        <Form.Control
                          type="number"
                          size="sm"
                          value={precioVal}
                          onChange={(e) => handleEditChange(p.id, 'precio', e.target.value)}
                          className="bg-dark text-white border-secondary"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          size="sm"
                          value={stockVal}
                          onChange={(e) => handleEditChange(p.id, 'stock', e.target.value)}
                          className="bg-dark text-white border-secondary"
                        />
                      </td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleGuardarModificacion(p)}
                          >
                            Guardar
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => handleEliminar(p.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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