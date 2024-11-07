import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export const EjemploComponent = () => {
  const [mostrar, setMostrar] = useState(false);
  const caja = useRef()
  const boton = useRef()

  useEffect(() => {
    console.log("useEffect: Componente cargado!");
    if (caja.current == null) return

    const { button } = boton.current.getBoundingClientRect()
    caja.current.style.top = `${button + 45}px`
    caja.current.style.left = `${button + 45}px`
  }, [mostrar]);

  return (
    <div>
      <h1>Ejemplo useEffect y useLayoutEffect</h1>

      <button ref={boton} onClick={() => setMostrar((prev) => !prev)}>
        Mostrar mensaje
      </button>
      {mostrar && <div id="caja" ref={caja}>Hola, soy un mensaje {mostrar}</div>}
    </div>
  );
};
