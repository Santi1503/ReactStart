import React from 'react'

export const Editar = ({peli}) => {
  const tituloComponente = "Editar película"

  const guardarEdicion = (e, id) => {
    e.preventDefault();

    let target = e.target;
  }


  return (
    <div className='edit_form'>
        <h3 className='title'>{tituloComponente}</h3>

        <form onSubmit={e => guardarEdicion(e, peli.id)}>
            <input type="text" name="titulo" className="tituloEditar" defaultValue={peli.title} />
            <textarea name="Descripcion" defaultValue="Descripción original" className={peli.description} />
            <input type="submit" value="Guardar" />
        </form>
    </div>
  )
}
