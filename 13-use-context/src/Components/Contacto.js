import React, { useContext, useState } from 'react'
import { PruebaContext } from '../Context/PruebaContext'

export const Contacto = () => {
  const datoDesdeElContexto = useContext(PruebaContext)
  return (
    <div>
      <h1>Contacto</h1>
      <p>Pagina de Contacto</p>
      <p>Valor compartido: <strong>{datoDesdeElContexto.titulo}</strong></p>

    </div>
  )
}
