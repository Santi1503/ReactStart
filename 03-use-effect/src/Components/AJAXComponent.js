import React, {useEffect, useState} from 'react'

export const AJAXComponent = () => {

    const [usuarios, setUsuarios] = useState([]);

    const getUsuariosEstaticos = () => {
        setUsuarios([
            {"id":1,"email":"santiago.gomez@reqres.in","first_name":"Santiago","last_name":"Gómez de la Torre","avatar":"https://reqres.in/img/faces/7-image.jpg"},
            {"id":2,"email":"lorena.gutierrez@reqres.in","first_name":"Lorena","last_name":"Gutierrez","avatar":"https://reqres.in/img/faces/8-image.jpg"},
            {"id":3,"email":"ethan.gomez.gutierrez@reqres.in","first_name":"Ethan","last_name":"Gómez de la Torre Gutierrez","avatar":"https://reqres.in/img/faces/9-image.jpg"}
        ])
    }

    useEffect(() => {
        getUsuariosEstaticos();
    }, [])

  return (
    <div>
        <h2 className='title'>Lista de usuarios creados - AJAX</h2>
        <ol className='usuarios'>
            {
                usuarios.map(usuario => {
                    return <li key={usuario.id}>{usuario.first_name} {usuario.last_name}</li>
                })
            }   

        </ol>
    </div>
  )
}
