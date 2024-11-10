import React, { useId } from 'react'

export const MiComponente = () => {

    const id = useId();
    const id2 = useId();

    console.log("id:", id2);
    
  return (
    <div>
        <h1>Hook useId</h1>
        <input id={id} name="nombre" placeholder="Nombre" />
    </div>
  )
}
