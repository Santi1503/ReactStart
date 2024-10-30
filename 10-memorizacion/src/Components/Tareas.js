import React, { useMemo, useState } from 'react'

export const Tareas = () => {
    const [tareas, setTareas] = useState([])
    const [contador, setContador] = useState(0)

    const guardarTareas = e => {
        e.preventDefault()

        let nuevasTareas = [...tareas, e.target.titulo.value]

        setTareas(nuevasTareas)        
    }

    const borrarTarea = id => {
        // filtrar las tareas para borrar
        let nuevasTareas = tareas.filter((tarea, index) => index !== id)

        // Set State, guardar el nuevo listado de tareas
        setTareas(nuevasTareas)
    }

    const sumarAlContador = e => {
        setContador(contador + 1)
    }

    const contadoresPasados = (acumulacion) => {

        for(let i = 0; i <= acumulacion; i++){
            console.log("Ejecutando acumulación de contadores pasados...")

            return `Numero de tareas: ${acumulacion}`
        }
    }

    const memoContadores = useMemo(() => {
        contadoresPasados(contador)}, [contador])

  return (
    <div className='tareas-container'>
        <h1>Mis Tareas</h1>

        <form onSubmit={guardarTareas}>
            <input type="text" name="titulo" placeholder="Describe la tarea" />
            <input type="submit" value="Guardar" />
        </form>

        <h3>{memoContadores}</h3>
        <button onClick={sumarAlContador}>Sumar</button>

        <h3>Lista de tareas</h3>
        <ul>
            {
                tareas.map((tarea, index) => {
                    return (
                        <li key={index}>
                            {tarea}
                            &nbsp;
                            <button onClick={() => borrarTarea(index)}>X</button>
                        </li>
                    )
                })
            }
        </ul>
        
    </div>
  )
}
