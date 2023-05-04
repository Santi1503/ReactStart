import React from 'react'

export const Editar = ({peli, conseguirPeliculas, setEditar, setListadoState}) => {
  const tituloComponente = "Editar película"

  const guardarEdicion = (e, id) => {
    e.preventDefault();

    let target = e.target;

    const pelis_almacenadas = conseguirPeliculas();
    const indice = pelis_almacenadas.findIndex(peli => peli.id === id);

    let peli_actualizada = {
      id,
      title: target.title.value,
      description: target.description.value
    };

    pelis_almacenadas[indice] = peli_actualizada;

    localStorage.setItem("pelis", JSON.stringify(pelis_almacenadas));

    setListadoState(pelis_almacenadas);
    setEditar(0);
    
  }


  return (
    <div className='edit_form'>
        <h3 className='title'>{tituloComponente}</h3>

        <form onSubmit={e => guardarEdicion(e, peli.id)}>
            <input type="text" name="title" className="tituloEditar" defaultValue={peli.title} />
            <textarea name="description" className="descripcionOriginal" defaultValue={peli.description} />
            <input type="submit" value="Guardar" className="save"/>
        </form>
    </div>
  )
}