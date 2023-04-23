import React, { useState } from 'react'
import { GuardarEnStorage } from '../helpers/GuardarEnStorage';

export const Crear = ({setListadoState}) => {

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

    setListadoState(elemento =>{
      return [...elemento, peli];
    });
    
    GuardarEnStorage("pelis", peli);
  }

  return (
    <div className="add">
        <h3 className="title">{titleComponent}</h3>
        <strong>{(title && description) && "Has creado la película: " + title}</strong>
        <form onSubmit={conseguirDatosForm}>
            <input name='title' type="text" placeholder="Título" />
            <textarea name="description" id='description' placeholder="Descripción o etiquetas"></textarea>
            <input className="guardar" type="submit" value="Guardar" />
        </form>
    </div>
  )
}
