import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../Reducers/JuegoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem("juegos")) || [];
}

export const MisJuegos = () => {

  const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("juegos", JSON.stringify(juegos))
  }, [juegos])

  const conseguirDatosForm = e => {
    e.preventDefault();

    let juego = {
      id: new Date().getTime(),
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value
    }

    console.log(juego.titulo)

    const accion = {
      type: "crear",
      payload: juego
    }

    dispatch(accion)

    console.log(juegos)
  }

  const borrar = id => {
    const accion = {
      type: "borrar",
      payload: id
    }

    dispatch(accion)
  }

  const editar = (e, id) => {
    let juego = {
      id,
      titulo: e.target.value,
      descripcion: e.target.value
    }

    const accion = {
      type: "editar",
      payload: juego
    }

    dispatch(accion)
  }

  return (
    <div>
        <h1>Mis Juegos</h1>

        <p>Numero de videojuegos: {juegos.length}</p>
        <ul>
            {
              juegos.map(juego => (
                <li key={juego.id}>{juego.titulo}
                    &nbsp; <button onClick={e => borrar(juego.id)}>Borrar</button>
                    <input type="text" onBlur={e=> editar(e,juego.id)} />
                </li>
              ))
            }
        </ul>

        <h3>Agregar juego</h3>
        <form onSubmit={conseguirDatosForm}>
            <input type="text" name="titulo" placeholder='Titulo' />
            <textarea name="descripcion" placeholder='Descripcion'></textarea>
            <input type="submit" value="Agregar" />
        </form>
    </div>
  )
}
