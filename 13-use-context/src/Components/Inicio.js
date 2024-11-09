import React, { useContext } from 'react'
import { PruebaContext } from '../Context/PruebaContext'

export const Inicio = () => {
  const {usuario, setUsuario} = useContext(PruebaContext)  

  return (
    <div>
      <h1>Inicio</h1>
      <p>Pagina de Inicio</p>
      <p>Nombre: {usuario.nombre}</p>
      <p>Web: {usuario.web}</p>
    </div>
  )
}
