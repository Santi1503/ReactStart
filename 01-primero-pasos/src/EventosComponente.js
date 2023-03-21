import React from 'react'

export const EventosComponente = () => {
  
    const hasDadoClick = (e, nombre) => {
        alert("Nombre: " + nombre)
    }

    function hasDadoDobleClick (e){
        alert("Dado doble click")
    }
    
    const hasEntrado = (e, accion) => {
        console.log("Se ha "+accion+" a la caja")
    }

    const hasSalido = (e, accion) => {
        console.log("Se ha "+accion+" a la caja")
    }

    /*const IntroducirNombre = e => {
        console.log("Introduce tu nombre");
    }

    const DejasteTuNombre = e => {
        console.log("Introduce tu nombre");
    }*/

    return (
    <div>
        <h2>Eventos Componente</h2>

        <p><button onClick={e => hasDadoClick(e, "Santiago")}>dame click</button></p>

        <p><button onDoubleClick={hasDadoDobleClick}>dame  doble click</button></p>

        <div id="caja" onMouseEnter={e => hasEntrado (e, "entrado")}
                        onMouseLeave={e => hasSalido (e, "salido")}>
            Pasa por aqui
        </div>

        <p>
            <input type="text" placeholder="introduce tu nombre" />
        </p>

    </div>
  )
}
