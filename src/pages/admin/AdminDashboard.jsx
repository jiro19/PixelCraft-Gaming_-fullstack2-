import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../../services/api';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const esAdmin = usuario?.rol === 'ADMIN';

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al cargar métricas:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const totalProductos = productos.length;
  const stockTotal = productos.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const valorInventario = productos.reduce(
    (acc, p) => acc + (Number(p.precio) || 0) * (Number(p.stock) || 0),
    0
  );
  const productosBajoStock = productos.filter((p) => (Number(p.stock) || 0) <= 5);

  return (
    <Container className="py-5">
      {/* Encabezado del Dashboard */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <Badge bg={esAdmin ? 'warning' : 'info'} text="dark" className="mb-2 px-3 py-1 fw-bold">
            PANEL DE CONTROL • {usuario?.rol || 'ADMIN'}
          </Badge>
          <h1 className="fw-bold hero-title mb-1">Dashboard PixelCraft</h1>
          <p className="text-secondary mb-0">
            Bienvenido de vuelta, <strong className="text-light">{usuario?.nombre}</strong>. Resumen en tiempo real de PostgreSQL Neon.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button as={Link} to="/admin/productos" className="btn-neon px-4">
            📦 Gestionar Productos
          </Button>
          <Button as={Link} to="/productos" variant="outline-info">
            Ver Tienda Pública
          </Button>
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="info" />
          <p className="text-secondary mt-2">Cargando estadísticas desde Neon...</p>
        </div>
      ) : (
        <>
          {/* Tarjetas KPI */}
          <Row className="g-4 mb-5">
            <Col md={6} lg={3}>
              <div className="card-gaming p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-bold text-uppercase">Catálogo Activo</span>
                  <span className="fs-4">🎮</span>
                </div>
                <h2 className="fw-bold text-info mb-1">{totalProductos}</h2>
                <span className="text-secondary small">Productos registrados en BD</span>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card-gaming p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-bold text-uppercase">Unidades en Stock</span>
                  <span className="fs-4">📦</span>
                </div>
                <h2 className="fw-bold text-white mb-1">{stockTotal}</h2>
                <span className="text-secondary small">Disponibles para venta</span>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card-gaming p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-bold text-uppercase">Valor Inventario</span>
                  <span className="fs-4">💰</span>
                </div>
                <h2 className="fw-bold text-success mb-1">
                  ${valorInventario.toLocaleString('es-CL')}
                </h2>
                <span className="text-secondary small">Capital total en bodega</span>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card-gaming p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-bold text-uppercase">Stock Crítico (≤ 5)</span>
                  <span className="fs-4">⚠️</span>
                </div>
                <h2 className={`fw-bold mb-1 ${productosBajoStock.length > 0 ? 'text-danger' : 'text-info'}`}>
                  {productosBajoStock.length}
                </h2>
                <span className="text-secondary small">Requieren reposición</span>
              </div>
            </Col>
          </Row>

          {}
          <Row className="g-4">
            <Col lg={5}>
              <div className="card-gaming p-4 h-100">
                <h5 className="fw-bold text-info mb-3">⚡ Acciones Rápidas</h5>
                <div className="d-grid gap-3">
                  <Button
                    as={Link}
                    to="/admin/productos"
                    variant="outline-info"
                    className="text-start p-3 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold">Mantenedor de Productos</div>
                      <small className="text-secondary">
                        {esAdmin
                          ? 'Crear, editar precios/stock y eliminar productos'
                          : 'Crear nuevos productos y actualizar precios/stock'}
                      </small>
                    </div>
                    <span>→</span>
                  </Button>

                  <Button
                    as="a"
                    href="http://10.222.1.62:8080/swagger-ui.html"
                    target="_blank"
                    rel="noreferrer"
                    variant="outline-secondary"
                    className="text-start p-3 d-flex justify-content-between align-items-center text-light"
                  >
                    <div>
                      <div className="fw-bold">Documentación API (Swagger UI)</div>
                      <small className="text-secondary">Probar endpoints REST de Spring Boot</small>
                    </div>
                    <span>↗</span>
                  </Button>
                </div>

                <div className="mt-4 p-3 rounded border border-secondary border-opacity-25 bg-dark">
                  <small className="text-secondary d-block mb-1">Permisos de tu sesión actual:</small>
                  {esAdmin ? (
                    <span className="text-warning small fw-semibold">
                      ✔ Control total habilitado (Crear, Editar y Eliminar registros).
                    </span>
                  ) : (
                    <span className="text-info small fw-semibold">
                      ✔ Modo Vendedor (Crear y Editar habilitado; Eliminación restringida).
                    </span>
                  )}
                </div>
              </div>
            </Col>

            <Col lg={7}>
              <div className="card-gaming p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-white mb-0">📊 Estado Actual del Inventario</h5>
                  <Link to="/admin/productos" className="text-info small text-decoration-none">
                    Ver todos →
                  </Link>
                </div>

                <div className="table-responsive">
                  <Table variant="dark" hover className="align-middle mb-0">
                    <thead>
                      <tr className="text-secondary small">
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.slice(0, 5).map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <Badge bg="secondary">{prod.codigo}</Badge>
                          </td>
                          <td className="fw-semibold">{prod.nombre}</td>
                          <td className="text-info">${Number(prod.precio).toLocaleString('es-CL')}</td>
                          <td>
                            <Badge bg={prod.stock <= 5 ? 'danger' : 'success'}>
                              {prod.stock} un.
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {productos.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-secondary py-3">
                            No hay productos registrados todavía.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;