import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Card, Row, Col, Spinner, Badge } from 'react-bootstrap';
import HeaderNavbar from '../../components/organisms/HeaderNavbar';
import Footer from '../../components/organisms/Footer';
import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../../services/api';

const AdminProductos = ({ totalItemsCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [edicion, setEdicion] = useState({});
  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    stock: '',
    categoriaId: '',
    descripcion: '',
    imagen: ''
  });

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [prods, cats] = await Promise.all([
        obtenerProductos(),
        obtenerCategorias()
      ]);
      setProductos(prods);
      setCategorias(cats);
      if (cats.length > 0 && !nuevoProducto.categoriaId) {
        setNuevoProducto((prev) => ({ ...prev, categoriaId: cats[0].id }));
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.codigo) return;

    try {
      await crearProducto({
        codigo: nuevoProducto.codigo,
        nombre: nuevoProducto.nombre,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        descripcion: nuevoProducto.descripcion || 'Producto PixelCraft Gaming',
        imagen: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
        categoria: { id: Number(nuevoProducto.categoriaId) }
      });
      await cargarDatos();
      setNuevoProducto({
        codigo: '',
        nombre: '',
        precio: '',
        stock: '',
        categoriaId: categorias[0]?.id || '',
        descripcion: '',
        imagen: ''
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditChange = (id, campo, valor) => {
    setEdicion({
      ...edicion,
      [id]: {
        ...edicion[id],
        [campo]: valor
      }
    });
  };

  const handleGuardarModificacion = async (producto) => {
    const datosEditados = edicion[producto.id] || {};
    const nuevoStock = datosEditados.stock !== undefined ? Number(datosEditados.stock) : producto.stock;
    const nuevoPrecio = datosEditados.precio !== undefined ? Number(datosEditados.precio) : producto.precio;

    try {
      await actualizarProducto(producto.id, {
        ...producto,
        precio: nuevoPrecio,
        stock: nuevoStock
      });
      await cargarDatos();
      const copia = { ...edicion };
      delete copia[producto.id];
      setEdicion(copia);
      alert('Producto actualizado en Neon.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto de la base de datos?')) return;

    try {
      await eliminarProducto(id);
      await cargarDatos();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <HeaderNavbar totalItemsCarrito={totalItemsCarrito} />

      <main className="flex-grow-1 py-5">
        <Container>
          <h1 className="fw-bold text-warning mb-4">Mantenedor de Productos (PostgreSQL Neon)</h1>

          {/* Formulario Agregar */}
          <Card className="bg-secondary text-white p-4 mb-4 border-0 shadow">
            <h4 className="text-info mb-3">Agregar Nuevo Producto</h4>
            <Form onSubmit={handleAgregar}>
              <Row className="g-3">
                <Col md={2}>
                  <Form.Control
                    type="text"
                    placeholder="Código (ej. PER-02)"
                    name="codigo"
                    value={nuevoProducto.codigo}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={3}>
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
                  <Form.Select
                    name="categoriaId"
                    value={nuevoProducto.categoriaId}
                    onChange={handleInputChange}
                    required
                  >
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </Form.Select>
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
                <Col md={1}>
                  <Form.Control
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    value={nuevoProducto.stock}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={2}>
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
                  <th>Categoría</th>
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
                      <td>{p.categoria?.nombre || 'Sin categoría'}</td>
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