import React from 'react'

export const Crear = () => {

  const title = "Añadir Película";

  const conseguirDatosForm = e =>{
    e.preventDefault();

    let target = e.target;
    let title = target.title.value;
    let description = target.description.value;


    let peli={
      id: new Date().getTime(),
      title,
      description
    }
    console.log(peli);
  }

  return (
    <div className="add">
        <h3 className="title">{title}</h3>

        <form onSubmit={conseguirDatosForm}>
            <input name='title' type="text" placeholder="Titulo" />
            <textarea name="description" id='description' placeholder="Descripcion"></textarea>
            <input className="guardar" type="submit" value="Guardar" />
        </form>
    </div>
  )
}
