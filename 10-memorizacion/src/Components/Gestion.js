import React, { useEffect, useRef, useState } from 'react'
import { Empleados } from './Empleados'

export const Gestion = () => {

  const [ nombre, setNombre ] = useState("")
  const [ vista, setVista ] = useState("users")

  const asignarGestor = e => {
    setNombre(e.target.value)
  }

  useEffect(() => {
    console.log("Vista gestion actualizada")
  }, [nombre, vista])

  const mostrarMensaje = () => {
    console.log("Hola que tal soy un mensaje desde el componente  gestion")
  }

  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <input type="text" onChange={asignarGestor} placeholder="Introduce tu nombre de gestor" />

        <h2>Listado de empleados:</h2>
        <p>Los usuarios son gestionados por {nombre} vienen de jsonplaceholder...</p>
        <button onClick={() => { setVista("users")}}>Usuarios</button> <button onClick={() => { setVista("comments")}}>Comments</button> 
        
        <Empleados output={vista} mensaje={mostrarMensaje}/>
    </div>
  )
}
