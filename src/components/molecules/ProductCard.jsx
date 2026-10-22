import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../atoms/ButtonPrimary';
import BadgeStock from '../atoms/BadgeStock';

const ProductCard = ({ producto, onAgregarAlCarrito }) => {
  return (
    <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
      <Card.Img 
        variant="top" 
        src={producto.imagen} 
        alt={producto.nombre} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fs-5 fw-bold mb-0">{producto.nombre}</Card.Title>
          <BadgeStock stock={producto.stock} />
        </div>
        <Card.Text className="text-muted small flex-grow-1">
          {producto.descripcion}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold text-info">
            ${producto.precio.toLocaleString('es-CL')}
          </span>
          <div className="d-flex gap-2">
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-light btn-sm">
              Detalle
            </Link>
            <ButtonPrimary 
              variant="info" 
              onClick={() => onAgregarAlCarrito(producto)}
              disabled={producto.stock === 0}
            >
              Añadir
            </ButtonPrimary>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;