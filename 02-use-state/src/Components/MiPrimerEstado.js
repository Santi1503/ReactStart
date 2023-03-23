import React, {useState} from 'react'

export const MiPrimerEstado = () => {

    /*
    -------------------------Problema --------------------------------
    let nombre = "Santiago Gómez de la Torre"
    const cambiarNombre = e => {
        nombre = "Lorena Marin"
    }
    */

    const [nombre,setNombre] = useState("Santiago Gómez de la Torre");
    const cambiarNombre = (e, nombreVisto) => {
        setNombre(nombreVisto);
    }

  return (
    <div>
        <h2>Componente - Primer Estado</h2>
        <strong className='label'> {nombre} </strong>
        <p><button onClick={e => cambiarNombre(e, "Lorena Marin")}>Cambiar Nombre Oculto</button></p>


        <input type="text" onChange={e => cambiarNombre(e, e.target.value)} placeholder='Cambiar Nombre'></input>
    </div>
  )
}
