import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonPrimary = ({ children, onClick, variant = "primary", disabled = false, type = "button" }) => {
  return (
    <Button 
      type={type}
      variant={variant} 
      onClick={onClick} 
      disabled={disabled}
      className="fw-bold px-3 py-2 shadow-sm"
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;