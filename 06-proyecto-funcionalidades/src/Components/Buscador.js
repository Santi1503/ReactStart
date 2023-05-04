import React, { useState } from 'react'

export const Buscador = ({listadoState, setListadoState}) => {

  const [busqueda, setBusqueda] = useState('');
  const [noEncontrado, setNoEncontrado] = useState(false);

  const buscarPeli = (e) => {

    setBusqueda(e.target.value);

    let pelisEncontradas = listadoState.filter(peli => {
      return peli.title.toLowerCase().includes(busqueda.toLowerCase());
    });

    if(busqueda.length <= 1 || pelisEncontradas <= 0){
      pelisEncontradas = JSON.parse(localStorage.getItem("pelis"));
      setNoEncontrado(true);
    }else{
      setNoEncontrado(false);
    }

    setListadoState(pelisEncontradas);

  }

  return (
    <div className="search">
        <h3 className="title">Buscador: {busqueda}</h3>
        {(noEncontrado === true && busqueda.length > 1) && (<span className='no-encontrado'>No se ha encontrado ninguna película</span>)}
        
        <form action="#">
            <input type="text" name="search"  id="search_field" autoComplete='off' onChange={buscarPeli} />
            <button className="buscar">Buscar Película</button>
        </form>
    </div>
  )
}
