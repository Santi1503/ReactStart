import React, { useState } from 'react'

export const Crear = () => {

  const titleComponent = "Añadir Película";

  const [peliState, setPeliState] = useState({
    title: '',
    description: ''
  });

  const {title, description} = peliState;

  const conseguirDatosForm = e =>{
    e.preventDefault();

    let target = e.target;
    let title = target.title.value;
    let description = target.description.value;


    let peli = {
      id: new Date().getTime(),
      title,
      description
    }
    setPeliState(peli);
    
    guardarEnStorage(peli)


  }

  const guardarEnStorage = peli => {

    let elementos = JSON.parse(localStorage.getItem("pelis"));

    console.log(elementos);

    if(Array.isArray(elementos)){
      elementos.push(peli);
    }else{
      elementos = [peli];
    }

    localStorage.setItem("pelis", JSON.stringify(elementos))

    return peli;    
  }

  return (
    <div className="add">
        <h3 className="title">{titleComponent}</h3>
        <strong>{(title && description) && "Has creado la película: " + title}</strong>
        <form onSubmit={conseguirDatosForm}>
            <input name='title' type="text" placeholder="Titulo" />
            <textarea name="description" id='description' placeholder="Descripcion"></textarea>
            <input className="guardar" type="submit" value="Guardar" />
        </form>
    </div>
  )
}
