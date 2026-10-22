import React from 'react';
import { Badge } from 'react-bootstrap';

const BadgeStock = ({ stock }) => {
  if (stock > 5) {
    return <Badge bg="success">En Stock ({stock})</Badge>;
  } else if (stock > 0) {
    return <Badge bg="warning" text="dark">¡Pocas unidades! ({stock})</Badge>;
  }
  return <Badge bg="danger">Agotado</Badge>;
};

export default BadgeStock;