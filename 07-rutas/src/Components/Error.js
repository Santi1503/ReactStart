import React from 'react'
import { Link } from 'react-router-dom'

export const MensajeError = () => {
  return (
    <div>
        <h1>Error 404</h1>
        <p>Esta página no existe</p>
        <Link to="/home">Volver al Inicio</Link>
    </div>
  )
}
