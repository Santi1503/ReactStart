import React, { useEffect, useState } from 'react'

export const Empleados = React.memo(({output, mensaje}) => {

    const [empleados, setEmpleados] = useState([])

    useEffect(() => {
        conseguirEmpleados(output)
    }, [output])

    const conseguirEmpleados = async(output) => {
        const url = "https://jsonplaceholder.typicode.com/" + output
        const peticion = await fetch(url)
        const empleados = await peticion.json()

        setEmpleados(empleados)        
    }

    useEffect(() => {
        console.log("Se ha actualizado la lista de empleados")
    }, [empleados])

    mensaje()
  return (
    <div>
        <p>Mostrando la vista: {output}</p>
        <ul className="empleados">
            {empleados.length >= 1 && empleados.map(empleado => {
                return <li key={empleado.id}>{empleado.name + " " + empleado.username}</li>
            })}
        </ul>
    </div>
  )
}
)