import React from 'react'

export const Listado = () => {
  return (
    <>
        <article className="peli-item">
            <h3 className="title">Meteoro - Speedracer</h3>
            <p className="description">Mejor peli de la historia</p>

            <button className="edit">Editar</button>
            <button className="delete">Eliminar</button>
        </article>

        <article className="peli-item">
            <h3 className="title">Shrek 2</h3>
            <p className="description">Puedes callarte por solo 5 minutos</p>

            <button className="edit">Editar</button>
            <button className="delete">Eliminar</button>
        </article>

            <article className="peli-item">
            <h3 className="title">Dragon Ball Broly</h3>
            <p className="description">Peli-culon</p>

            <button className="edit">Editar</button>
            <button className="delete">Eliminar</button>
        </article>

        <article className="peli-item">
            <h3 className="title">Sword Art Online</h3>
            <p className="description">Perdio mis espectativas</p>

            <button className="edit">Editar</button>
            <button className="delete">Eliminar</button>
        </article>
    </>
  )
}
