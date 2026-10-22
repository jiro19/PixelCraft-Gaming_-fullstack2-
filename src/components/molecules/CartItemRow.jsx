import React from 'react';
import { Button } from 'react-bootstrap';

const CartItemRow = ({ item, onEliminar }) => {
  const subtotal = item.precio * item.cantidad;

  return (
    <tr className="align-middle">
      <td>
        <div className="d-flex align-items-center gap-3">
          <img 
            src={item.imagen} 
            alt={item.nombre} 
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
          />
          <span className="fw-bold">{item.nombre}</span>
        </div>
      </td>
      <td>${item.precio.toLocaleString('es-CL')}</td>
      <td>{item.cantidad}</td>
      <td className="fw-bold text-info">${subtotal.toLocaleString('es-CL')}</td>
      <td>
        <Button variant="danger" size="sm" onClick={() => onEliminar(item.id)}>
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default CartItemRow;