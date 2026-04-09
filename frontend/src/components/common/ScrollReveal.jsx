import React, { useEffect } from 'react';

const ScrollReveal = ({ children }) => {
  useEffect(() => {
    // Poți adăuga aici logica pentru efecte de scroll (ex: cu Intersection Observer)
    console.log('ScrollReveal activat');
  }, []);

  return <div className="scroll-reveal">{children}</div>;
};

export default ScrollReveal;