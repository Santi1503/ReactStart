import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {
    // const [listadoState, setListadoState] = useState([])

    const [editar, setEditar] = useState(0);

    useEffect(() => {
        console.log("listado de películas")
        conseguirPeliculas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem("pelis"));
        
        setListadoState(peliculas);

        return peliculas;
    }

    const eliminarPeli = (id) =>{
      
      let pelis_almacenadas = conseguirPeliculas();

      let nuevoListadoPelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));

      setListadoState(nuevoListadoPelis);

      localStorage.setItem('pelis', JSON.stringify(nuevoListadoPelis));

    }

  return (
    <>
        {listadoState!=null ? 
                    listadoState.map(peli => {
                      return (
                        <article key={peli.id} className="peli-item">
                            <h3 className="title">{peli.title}</h3>
                            <p className="description">{peli.description}</p>

                            <button className="edit" onClick={ () => {
                              setEditar(peli.id)
                            }}>Editar</button>
                            <button className="delete" onClick={()=> eliminarPeli(peli.id)}>Eliminar</button>

                            {editar === peli.id && ( <Editar peli={peli} />)}
                        </article>
            );
        })
        // eslint-disable-next-line no-undef
        : <h2 className='no-items'>No hay películas registradas</h2>

    }
    </>
  )
}
