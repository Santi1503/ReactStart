import React, { useState } from 'react'

export const FormularioComponent = () => {

  const [usuario, setUsuario] = useState({});


  const conseguirDatosForm = e => {
    e.preventDefault();

    let datos = e.target;
    let usuario = {
      nombre: datos.nombre.value,
      apellidos: datos.apellidos.value,
      genero: datos.genero.value
    };

    /*console.log(usuario);*/

    setUsuario(usuario);
  }

  return (
    <div>
      <h2 className='title'>Let The Journey Begin</h2>
      
      <span>
        <form className='form' onSubmit={conseguirDatosForm}>
          <p>
            <input className='name' type='text' placeholder='Nombre' name='nombre'/>
          </p>
          <p>
            <input className='name' type='text' placeholder='Apellidos' name='apellidos'/>
          </p>
          <p>
            <select className='gender' name='genero'>
              <option value="null">Sexo</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </p>
          <button className='submit' type='submit' value="Enviar">Enviar</button>
        </form>
      </span>
            
      {usuario.apellidos && usuario.apellidos.length > 1 && 
        (
          <div className='info-user'>
            <p>Bienvenido al viaje {usuario.nombre} {usuario.apellidos}</p> 
          </div>
        )
      }

    </div>
  )
}
