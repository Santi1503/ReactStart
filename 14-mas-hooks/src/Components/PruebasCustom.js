import React from 'react'
import { useMayus } from '../Hooks/useMayus'

export const PruebasCustom = () => {

  const {estado, mayusculas, minusculas, concatenar} = useMayus("Santiago Gómez")

  return (
    <div>
        <h1>Componente Pruebas Custom</h1>
        <p>Este es un componente customizado</p>
        <h2>{estado}</h2>

        <button onClick={ mayusculas }>Poner en Mayusculas</button>
        <button onClick={ minusculas }>Poner en Minuscilas</button>
        <button onClick={ e => concatenar(" de la Torre") }>Concatenar</button>

    </div>
  )
}
