/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react'

export const AJAXComponent = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    /*const getUsuariosEstaticos = () => {
        setUsuarios([
            {"id":1,"email":"santiago.gomez@reqres.in","first_name":"Santiago","last_name":"Gómez de la Torre","avatar":"https://reqres.in/img/faces/7-image.jpg"},
            {"id":2,"email":"lorena.gutierrez@reqres.in","first_name":"Lorena","last_name":"Gutierrez","avatar":"https://reqres.in/img/faces/8-image.jpg"},
            {"id":3,"email":"ethan.gomez.gutierrez@reqres.in","first_name":"Ethan","last_name":"Gómez de la Torre Gutierrez","avatar":"https://reqres.in/img/faces/9-image.jpg"}
        ])
    }*/

    /*const getUsuariosAjaxPms = () => {
        fetch("https://reqres.in/api/users?page=1")
            .then(res => res.json())
            .then(
                respuestaFinal => {
                    setUsuarios(respuestaFinal.data);
                },
                error =>{
                    console.log(error);
                }
            )
    }*/

    const getUsuariosAjaxAsyncAwait = () => {

        setTimeout(async() => {
            try{
                const peticion = await fetch("https://reqres.in/api/users?page=1");
                const {data} = await peticion.json();
    
                setUsuarios(data);
                setLoading(false);
            } catch(error){
                console.log("No se han encontrado los datos", error);
            }
           
        }, 3000)
        
    }

    useEffect(() => {
        // getUsuariosAjaxPms();

        getUsuariosAjaxAsyncAwait();
    }, [])

    if(loading === true) {
        return (
            <div className='cargando'>
                Cargando data...
            </div>
        )
    }else{
        return (
            <div>
                <h2 className='title'>Lista de usuarios creados - AJAX</h2>
                <ol className='usuarios'>
                    {
                        usuarios.map(usuario => {
                            return <li key={usuario.id}>
                                        <img src={usuario.avatar} className='avatar' />
                                        &nbsp; {usuario.first_name} {usuario.last_name}</li>
                        })
                    }   
        
                </ol>
            </div>
        )
    }
  
}
