import React, { useContext, useState } from 'react'
import { PruebaContext } from '../Context/PruebaContext'

export const Login = () => {

  const [usuario, setUsuario] = useContext(PruebaContext)

  const guardarDatos = e => {
    e.preventDefault()

    let datos = {
      username: e.target.username.value,
      nombre: e.target.name.value,
      web: e.target.web.value,
    }

    setUsuario(datos)
  }

  return (
    <div>
      <h1>Identificate</h1>
      <p>Pagina de Login</p>

      <form className='login' onSubmit={guardarDatos}>
        <input type="text" name="username" placeholder="Username:" />
        <input type="text" name="name" placeholder="Nombre:" />
        <input type="text" name="web" placeholder="Web:" />

        <input type="submit" value="Enviar" />

      </form>
    </div>
  )
}
