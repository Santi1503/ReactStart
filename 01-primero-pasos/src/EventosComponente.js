import React from 'react'

export const EventosComponente = () => {
  
    const hasDadoClick = (e, nombre) => {
        alert("Nombre: " + nombre)
    }

    function hasDadoDobleClick (e){
        alert("Dado doble click")
    }
    
    return (
    <div>
        <h2>Eventos Componente</h2>

        <p><button onClick={e => hasDadoClick(e, "Santiago")}>dame click</button></p>

        <button onDoubleClick={hasDadoDobleClick}>dame  doble click</button>

    
    
    </div>
  )
}
