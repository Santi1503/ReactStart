// importar modulos de react
import React from 'react';

//Funcion del componente
const MiComponente = () => {

    let usuario = {
        nombre: "Santiago",
        apellido: "Gomez de la Torre",
        edad: 20
    }

    return (
        <div className='MiComponente'>
            <h2>Bienvenido a esta pequeña presentación</h2>
            <h3>Datos del usuario</h3>
            <span>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>Edad:</strong> {usuario.edad} años</p>
            </span>
            <p></p>      
        </div>

    );
};

export default MiComponente;