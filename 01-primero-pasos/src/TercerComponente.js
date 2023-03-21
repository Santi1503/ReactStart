import React from 'react';
import PropTypes from 'react';

export const TercerComponente = ({nombre, apellidos, ficha}) => {
  
    console.log(ficha);
  
    return (
    <div>
        <h2>Comunicación de componentes</h2>
        <ul>
            <li>{nombre}</li>
            <li>{apellidos}</li>
            <li>{ficha.tipoDeSangre}</li>
            <li>{ficha.edad}</li>

        </ul>
    </div>
  )
}

TercerComponente.propTypes = {
    ficha: PropTypes.object
}

TercerComponente.defaultProps = {
    nombre: 'Nombre',
    apellidos: 'Apellidos'
}